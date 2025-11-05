import { connectDB } from "../../../server/db";
import ForumPost from "../../../server/models/ForumPost";

export default async function handler(req: any, res: any) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { userId } = req.body;
      const post = await ForumPost.findById(req.query.postId);

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
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
