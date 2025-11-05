import ExpertCard from '../ExpertCard';
import { useState } from 'react';

export default function ExpertCardExample() {
  const [favorited, setFavorited] = useState(false);
  const [following, setFollowing] = useState(false);

  const mockExpert = {
    id: '1',
    name: 'Dr. Sarah Johnson',
    credentials: 'MD, PhD - Johns Hopkins Medicine',
    specialty: ['Oncology', 'Immunotherapy'],
    location: 'Baltimore, MD',
    bio: 'Leading researcher in cancer immunotherapy with over 15 years of experience. Focused on developing novel treatments for glioblastoma and other brain cancers.',
    interests: ['CAR-T Cell Therapy', 'Checkpoint Inhibitors', 'Tumor Microenvironment'],
    publications: 87,
    availableForMeetings: true,
    isRegistered: true,
  };

  return (
    <div className="p-6 max-w-md">
      <ExpertCard
        expert={mockExpert}
        onFavorite={() => setFavorited(!favorited)}
        onFollow={() => setFollowing(!following)}
        onRequestMeeting={(id) => console.log('Request meeting:', id)}
        isFavorited={favorited}
        isFollowing={following}
      />
    </div>
  );
}
