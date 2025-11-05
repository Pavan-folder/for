import { connectDB } from "../server/db";
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

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
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
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
