import { connectDB } from "../server/db";
import User from "../server/models/User";

export default async function handler(req: any, res: any) {
  await connectDB();

  if (req.method === "GET") {
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
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
