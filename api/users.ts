import { connectDB } from "../server/db";
import User from "../server/models/User";

export default async function handler(req: any, res: any) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
