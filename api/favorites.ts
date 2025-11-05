import { connectDB } from "../server/db";
import Favorite from "../server/models/Favorite";

export default async function handler(req: any, res: any) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { userId, itemType, itemId, itemData } = req.body;

      const existingFavorite = await Favorite.findOne({ userId, itemType, itemId });
      if (existingFavorite) {
        return res.status(400).json({ message: 'Already favorited' });
      }

      const favorite = new Favorite({ userId, itemType, itemId, itemData });
      await favorite.save();
      res.status(201).json(favorite);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
