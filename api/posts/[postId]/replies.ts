import { connectDB } from "../../../server/db";
import Reply from "../../../server/models/Reply";

export default async function handler(req: any, res: any) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const replies = await Reply.find({ postId: req.query.postId })
        .sort({ createdAt: 1 });
      res.json(replies);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const { authorId, authorName, authorRole, content } = req.body;
      const reply = new Reply({
        postId: req.query.postId,
        authorId,
        authorName,
        authorRole,
        content,
      });
      await reply.save();
      res.status(201).json(reply);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
