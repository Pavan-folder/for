import type { Express } from "express";
import { createServer, type Server } from "http";
import User from "./models/User";
import Favorite from "./models/Favorite";
import ForumPost from "./models/ForumPost";
import Reply from "./models/Reply";
import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-local-dev',
});

async function summarizeWithAI(text: string, type: 'trial' | 'publication'): Promise<string> {
  try {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy-key-for-local-dev') {
      return text.substring(0, 200) + '...';
    }

    const prompt = type === 'trial'
      ? `Summarize this clinical trial in simple, patient-friendly language (2-3 sentences). Focus on what the trial does, who it's for, and potential benefits:\n\n${text}`
      : `Summarize this research publication in simple language (2-3 sentences) that a non-expert can understand:\n\n${text}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || text.substring(0, 200);
  } catch (error) {
    console.error('OpenAI summarization error:', error);
    return text.substring(0, 200);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {

  app.post("/api/users", async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/trials", async (req, res) => {
    try {
      const { query, status, phase, condition } = req.query;

      let searchQuery = '';
      if (condition) searchQuery += `SEARCH[Condition]${condition}`;
      if (query) searchQuery += ` ${query}`;

      const url = `https://clinicaltrials.gov/api/v2/studies`;
      const params: any = {
        format: 'json',
        'query.cond': condition || query || '',
        pageSize: 20,
      };

      if (status) params['filter.overallStatus'] = status;
      if (phase) params['query.term'] = phase;

      const response = await axios.get(url, { params });

      const trials = await Promise.all(response.data.studies?.slice(0, 10).map(async (study: any) => {
        const protocol = study.protocolSection;
        const identification = protocol?.identificationModule;
        const status = protocol?.statusModule;
        const design = protocol?.designModule;
        const description = protocol?.descriptionModule;
        const conditions = protocol?.conditionsModule;
        const contacts = protocol?.contactsModule;

        const fullDescription = `${identification?.briefTitle || ''}\n${description?.briefSummary || ''}`;
        const summary = await summarizeWithAI(fullDescription, 'trial');

        return {
          id: identification?.nctId || Math.random().toString(),
          title: identification?.briefTitle || 'Untitled Study',
          status: status?.overallStatus?.toLowerCase() || 'unknown',
          phase: design?.phases?.[0] || 'N/A',
          location: contacts?.locations?.[0]?.city + ', ' + contacts?.locations?.[0]?.state || 'Various Locations',
          startDate: status?.startDateStruct?.date || 'N/A',
          participants: design?.enrollmentInfo?.count || 0,
          condition: conditions?.conditions?.[0] || 'N/A',
          summary,
          description: description?.briefSummary || 'No description available',
          eligibility: protocol?.eligibilityModule?.eligibilityCriteria || '',
          contactEmail: contacts?.centralContacts?.[0]?.email || '',
        };
      }) || []);

      res.json(trials);
    } catch (error: any) {
      console.error('ClinicalTrials API error:', error);
      res.status(500).json({ message: 'Failed to fetch clinical trials', error: error.message });
    }
  });

  app.get("/api/publications", async (req, res) => {
    try {
      const { query, topic } = req.query;
      const searchTerm = query || topic || 'cancer immunotherapy';

      const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi`;
      const searchParams = {
        db: 'pubmed',
        term: searchTerm,
        retmax: 10,
        retmode: 'json',
        sort: 'date',
      };

      const searchResponse = await axios.get(url, { params: searchParams });
      const ids = searchResponse.data.esearchresult?.idlist || [];

      if (ids.length === 0) {
        return res.json([]);
      }

      const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi`;
      const fetchParams = {
        db: 'pubmed',
        id: ids.join(','),
        retmode: 'xml',
      };

      const fetchResponse = await axios.get(fetchUrl, { params: fetchParams });

      const parser = new (require('xml2js').Parser)();
      const result = await parser.parseStringPromise(fetchResponse.data);
      const articles = result.PubmedArticleSet?.PubmedArticle || [];

      const publications = await Promise.all(articles.map(async (article: any) => {
        const medline = article.MedlineCitation?.[0];
        const articleData = medline?.Article?.[0];
        const pubmedData = article.PubmedData?.[0];

        const title = articleData?.ArticleTitle?.[0] || 'Untitled';
        const abstract = articleData?.Abstract?.[0]?.AbstractText?.[0] || 'No abstract available';
        const abstractText = typeof abstract === 'string' ? abstract : abstract._ || 'No abstract available';

        const summary = await summarizeWithAI(abstractText, 'publication');

        const authors = articleData?.AuthorList?.[0]?.Author?.map((author: any) => {
          const lastName = author.LastName?.[0] || '';
          const initials = author.Initials?.[0] || '';
          return `${lastName} ${initials}`;
        }) || [];

        const journal = articleData?.Journal?.[0]?.Title?.[0] || 'Unknown Journal';
        const pubDate = articleData?.Journal?.[0]?.JournalIssue?.[0]?.PubDate?.[0];
        const year = pubDate?.Year?.[0] || '';
        const month = pubDate?.Month?.[0] || '';

        const pmid = medline?.PMID?.[0]?._ || medline?.PMID?.[0] || '';

        return {
          id: pmid,
          title,
          authors,
          journal,
          date: `${month} ${year}`.trim() || 'Date unknown',
          abstract: abstractText,
          summary,
          url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}`,
          topics: [],
        };
      }));

      res.json(publications);
    } catch (error: any) {
      console.error('PubMed API error:', error);
      res.status(500).json({ message: 'Failed to fetch publications', error: error.message });
    }
  });

  app.get("/api/experts", async (req, res) => {
    try {
      const { query, specialty } = req.query;

      const filter: any = { role: 'researcher' };
      if (specialty) {
        filter['researcherProfile.specialties'] = specialty;
      }

      const experts = await User.find(filter).limit(20);

      const formattedExperts = experts.map(expert => ({
        id: (expert._id as any).toString(),
        name: expert.email || 'Anonymous Researcher',
        credentials: expert.researcherProfile?.credentials || 'Researcher',
        specialty: expert.researcherProfile?.specialties || [],
        location: 'Various Locations',
        bio: expert.researcherProfile?.bio || 'Experienced researcher',
        interests: expert.researcherProfile?.interests || [],
        publications: expert.researcherProfile?.publications || 0,
        availableForMeetings: expert.researcherProfile?.availableForMeetings || false,
        isRegistered: true,
      }));

      res.json(formattedExperts);
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to fetch experts', error: error.message });
    }
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const { userId, itemType, itemId, itemData } = req.body;

      const existingFavorite = await Favorite.findOne({ userId, itemType, itemId });
      if (existingFavorite) {
        return res.status(400).json({ message: 'Already favorited' });
      }

      const favorite = new Favorite({ userId, itemType, itemId, itemData });
      await favorite.save();
      res.json(favorite);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/favorites/:userId/:itemType/:itemId", async (req, res) => {
    try {
      const { userId, itemType, itemId } = req.params;
      await Favorite.deleteOne({ userId, itemType, itemId });
      res.json({ message: 'Favorite removed' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/favorites/:userId", async (req, res) => {
    try {
      const favorites = await Favorite.find({ userId: req.params.userId });
      res.json(favorites);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/forums/:forumId/posts", async (req, res) => {
    try {
      const posts = await ForumPost.find({ forumId: req.params.forumId })
        .sort({ createdAt: -1 })
        .limit(50);

      const postsWithReplies = await Promise.all(posts.map(async (post) => {
        const replyCount = await Reply.countDocuments({ postId: (post._id as any).toString() });
        return {
          id: (post._id as any).toString(),
          author: post.authorName,
          authorRole: post.authorRole,
          title: post.title,
          content: post.content,
          timestamp: getRelativeTime(post.createdAt),
          replies: replyCount,
          likes: post.likes,
        };
      }));

      res.json(postsWithReplies);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/forums/:forumId/posts", async (req, res) => {
    try {
      const { authorId, authorName, authorRole, title, content } = req.body;
      const post = new ForumPost({
        forumId: req.params.forumId,
        authorId,
        authorName,
        authorRole,
        title,
        content,
      });
      await post.save();
      res.json(post);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/posts/:postId/like", async (req, res) => {
    try {
      const { userId } = req.body;
      const post = await ForumPost.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      if (post.likedBy.includes(userId)) {
        post.likedBy = post.likedBy.filter(id => id !== userId);
        post.likes = Math.max(0, post.likes - 1);
      } else {
        post.likedBy.push(userId);
        post.likes += 1;
      }

      await post.save();
      res.json({ likes: post.likes });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/posts/:postId/replies", async (req, res) => {
    try {
      const replies = await Reply.find({ postId: req.params.postId })
        .sort({ createdAt: 1 });
      res.json(replies);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/posts/:postId/replies", async (req, res) => {
    try {
      const { authorId, authorName, authorRole, content } = req.body;
      const reply = new Reply({
        postId: req.params.postId,
        authorId,
        authorName,
        authorRole,
        content,
      });
      await reply.save();
      res.json(reply);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function getRelativeTime(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return `${Math.floor(seconds / 604800)} weeks ago`;
}
