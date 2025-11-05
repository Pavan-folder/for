import { connectDB } from "../../server/db";
import Favorite from "../../server/models/Favorite";

export default async function handler(req: any, res: any) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const favorites = await Favorite.find({ userId: req.query.userId });
      res.json(favorites);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
