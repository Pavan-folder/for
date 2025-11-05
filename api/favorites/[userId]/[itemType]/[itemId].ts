import { connectDB } from "../../../../server/db";
import Favorite from "../../../../server/models/Favorite";

export default async function handler(req: any, res: any) {
  await connectDB();

  if (req.method === "DELETE") {
    try {
      const { userId, itemType, itemId } = req.query;
      await Favorite.deleteOne({ userId, itemType, itemId });
      res.json({ message: 'Favorite removed' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
