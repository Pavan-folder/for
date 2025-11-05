import { connectDB } from "../../../server/db";
import ForumPost from "../../../server/models/ForumPost";
import Reply from "../../../server/models/Reply";

function getRelativeTime(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return `${Math.floor(seconds / 604800)} weeks ago`;
}

export default async function handler(req: any, res: any) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const posts = await ForumPost.find({ forumId: req.query.forumId })
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
  } else if (req.method === "POST") {
    try {
      const { authorId, authorName, authorRole, title, content } = req.body;
      const post = new ForumPost({
        forumId: req.query.forumId,
        authorId,
        authorName,
        authorRole,
        title,
        content,
      });
      await post.save();
      res.status(201).json(post);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
