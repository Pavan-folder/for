import DashboardStats from "@/components/DashboardStats";
import ClinicalTrialCard from "@/components/ClinicalTrialCard";
import ExpertCard from "@/components/ExpertCard";
import PublicationCard from "@/components/PublicationCard";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [userRole, setUserRole] = useState<'patient' | 'researcher'>('patient');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);

  useEffect(() => {
    const role = localStorage.getItem('userRole') as 'patient' | 'researcher' || 'patient';
    setUserRole(role);
  }, []);

  const stats = {
    trials: 47,
    experts: 28,
    publications: 156,
    favorites: 12,
  };

  const mockTrial = {
    id: '1',
    title: 'Phase 3 Study of Novel Immunotherapy for Glioblastoma',
    status: 'recruiting' as const,
    phase: 'Phase 3',
    location: 'New York, NY',
    startDate: 'Jan 2025',
    participants: 150,
    condition: 'Glioblastoma',
    summary: 'This trial evaluates a new immunotherapy approach targeting glioblastoma cells while minimizing side effects.',
    description: 'A multicenter, randomized, double-blind study evaluating the efficacy and safety of XYZ-123 immunotherapy.',
  };

  const mockExpert = {
    id: '1',
    name: 'Dr. Sarah Johnson',
    credentials: 'MD, PhD - Johns Hopkins Medicine',
    specialty: ['Oncology', 'Immunotherapy'],
    location: 'Baltimore, MD',
    bio: 'Leading researcher in cancer immunotherapy with over 15 years of experience.',
    interests: ['CAR-T Cell Therapy', 'Checkpoint Inhibitors'],
    publications: 87,
    availableForMeetings: true,
    isRegistered: true,
  };

  const mockPublication = {
    id: '1',
    title: 'Novel CAR-T Cell Therapy Shows Promise in Glioblastoma Treatment',
    authors: ['Smith J', 'Johnson M', 'Williams R'],
    journal: 'Nature Medicine',
    date: 'January 2025',
    abstract: 'Background: Glioblastoma remains one of the most challenging cancers to treat.',
    summary: 'This study shows that a new CAR-T cell therapy resulted in tumor reduction in 58% of patients.',
    url: 'https://example.com',
    topics: ['CAR-T Therapy', 'Glioblastoma'],
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          {userRole === 'patient' ? 'Welcome to Your Health Dashboard' : 'Welcome to Your Research Dashboard'}
        </h1>
        <p className="text-muted-foreground">
          {userRole === 'patient' 
            ? 'Discover personalized clinical trials, connect with experts, and stay informed with the latest research.'
            : 'Manage your research, connect with collaborators, and engage with the community.'}
        </p>
      </div>

      <DashboardStats stats={stats} />

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <ClinicalTrialCard
              trial={mockTrial}
              onFavorite={(id) => setFavorites(prev => 
                prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
              )}
              isFavorited={favorites.includes(mockTrial.id)}
            />
            <PublicationCard
              publication={mockPublication}
              onFavorite={(id) => setFavorites(prev => 
                prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
              )}
              isFavorited={favorites.includes(mockPublication.id)}
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {userRole === 'patient' ? 'Featured Health Experts' : 'Potential Collaborators'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ExpertCard
              expert={mockExpert}
              onFavorite={(id) => setFavorites(prev => 
                prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
              )}
              onFollow={(id) => setFollowing(prev => 
                prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
              )}
              isFavorited={favorites.includes(mockExpert.id)}
              isFollowing={following.includes(mockExpert.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
