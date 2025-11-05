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
      const { query, status, phase, condition } = req.query;

      let searchQuery = '';
      if (condition) searchQuery += `SEARCH[Condition]${condition}`;
      if (query) searchQuery += ` ${query}`;

      const url = `https://clinicaltrials.gov/api/v2/studies`;
      const params: any = {
        format: 'json',
        'query.cond': condition || query || '',
        pageSize: 20,
      };

      if (status) params['filter.overallStatus'] = status;
      if (phase) params['query.term'] = phase;

      const response = await axios.get(url, { params });

      const trials = await Promise.all(response.data.studies?.slice(0, 10).map(async (study: any) => {
        const protocol = study.protocolSection;
        const identification = protocol?.identificationModule;
        const status = protocol?.statusModule;
        const design = protocol?.designModule;
        const description = protocol?.descriptionModule;
        const conditions = protocol?.conditionsModule;
        const contacts = protocol?.contactsModule;

        const fullDescription = `${identification?.briefTitle || ''}\n${description?.briefSummary || ''}`;
        const summary = await summarizeWithAI(fullDescription, 'trial');

        return {
          id: identification?.nctId || Math.random().toString(),
          title: identification?.briefTitle || 'Untitled Study',
          status: status?.overallStatus?.toLowerCase() || 'unknown',
          phase: design?.phases?.[0] || 'N/A',
          location: contacts?.locations?.[0]?.city + ', ' + contacts?.locations?.[0]?.state || 'Various Locations',
          startDate: status?.startDateStruct?.date || 'N/A',
          participants: design?.enrollmentInfo?.count || 0,
          condition: conditions?.conditions?.[0] || 'N/A',
          summary,
          description: description?.briefSummary || 'No description available',
          eligibility: protocol?.eligibilityModule?.eligibilityCriteria || '',
          contactEmail: contacts?.centralContacts?.[0]?.email || '',
        };
      }) || []);

      res.json(trials);
    } catch (error: any) {
      console.error('ClinicalTrials API error:', error);
      res.status(500).json({ message: 'Failed to fetch clinical trials', error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
