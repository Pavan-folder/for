import ClinicalTrialCard from '../ClinicalTrialCard';
import { useState } from 'react';

export default function ClinicalTrialCardExample() {
  const [favorited, setFavorited] = useState(false);

  const mockTrial = {
    id: '1',
    title: 'Phase 3 Study of Novel Immunotherapy for Glioblastoma',
    status: 'recruiting' as const,
    phase: 'Phase 3',
    location: 'New York, NY',
    startDate: 'Jan 2025',
    participants: 150,
    condition: 'Glioblastoma',
    summary: 'This trial evaluates a new immunotherapy approach targeting glioblastoma cells while minimizing side effects. Early results show promising tumor reduction in 60% of participants.',
    description: 'A multicenter, randomized, double-blind study evaluating the efficacy and safety of XYZ-123 immunotherapy in patients with newly diagnosed glioblastoma. The study will compare XYZ-123 combined with standard therapy versus standard therapy alone.',
    eligibility: 'Ages 18-75, newly diagnosed glioblastoma, adequate organ function',
    contactEmail: 'trial@example.com',
  };

  return (
    <div className="p-6 max-w-3xl">
      <ClinicalTrialCard
        trial={mockTrial}
        onFavorite={() => setFavorited(!favorited)}
        isFavorited={favorited}
      />
    </div>
  );
}
