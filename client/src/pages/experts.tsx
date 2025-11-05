import SearchBar from "@/components/SearchBar";
import ExpertCard from "@/components/ExpertCard";
import { useState } from "react";

export default function Experts() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);

  const mockExperts = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      credentials: 'MD, PhD - Johns Hopkins Medicine',
      specialty: ['Oncology', 'Immunotherapy'],
      location: 'Baltimore, MD',
      bio: 'Leading researcher in cancer immunotherapy with over 15 years of experience.',
      interests: ['CAR-T Cell Therapy', 'Checkpoint Inhibitors', 'Tumor Microenvironment'],
      publications: 87,
      availableForMeetings: true,
      isRegistered: true,
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      credentials: 'MD - Stanford Medical Center',
      specialty: ['Neurology', 'Neurosurgery'],
      location: 'Palo Alto, CA',
      bio: 'Specialist in brain tumor treatment and surgical interventions.',
      interests: ['Glioblastoma', 'Surgical Innovation', 'Neuro-oncology'],
      publications: 62,
      availableForMeetings: true,
      isRegistered: true,
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      credentials: 'PhD - Harvard Medical School',
      specialty: ['Oncology', 'Genetics'],
      location: 'Boston, MA',
      bio: 'Research focused on genetic markers for cancer susceptibility.',
      interests: ['Cancer Genetics', 'Precision Medicine', 'Biomarkers'],
      publications: 94,
      availableForMeetings: false,
      isRegistered: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Health Experts</h1>
        <p className="text-muted-foreground">
          Connect with leading researchers and specialists in your area of interest
        </p>
      </div>

      <SearchBar
        placeholder="Search by name, specialty, or research interest..."
        onSearch={(query) => console.log('Search:', query)}
        onFilterClick={() => console.log('Filters clicked')}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockExperts.map((expert) => (
          <ExpertCard
            key={expert.id}
            expert={expert}
            onFavorite={(id) => setFavorites(prev =>
              prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
            )}
            onFollow={(id) => setFollowing(prev =>
              prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
            )}
            onRequestMeeting={(id) => console.log('Request meeting:', id)}
            isFavorited={favorites.includes(expert.id)}
            isFollowing={following.includes(expert.id)}
          />
        ))}
      </div>
    </div>
  );
}
