import { connectDB } from "../../server/db";
import User from "../../server/models/User";

export default async function handler(req: any, res: any) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const user = await User.findById(req.query.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
