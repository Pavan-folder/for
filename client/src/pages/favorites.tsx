import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClinicalTrialCard from "@/components/ClinicalTrialCard";
import ExpertCard from "@/components/ExpertCard";
import PublicationCard from "@/components/PublicationCard";
import { useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState<string[]>(['1', '2']);
  const [following, setFollowing] = useState<string[]>(['1']);

  const mockTrial = {
    id: '1',
    title: 'Phase 3 Study of Novel Immunotherapy for Glioblastoma',
    status: 'recruiting' as const,
    phase: 'Phase 3',
    location: 'New York, NY',
    startDate: 'Jan 2025',
    participants: 150,
    condition: 'Glioblastoma',
    summary: 'This trial evaluates a new immunotherapy approach.',
    description: 'A multicenter study evaluating XYZ-123 immunotherapy.',
  };

  const mockExpert = {
    id: '1',
    name: 'Dr. Sarah Johnson',
    credentials: 'MD, PhD - Johns Hopkins Medicine',
    specialty: ['Oncology', 'Immunotherapy'],
    location: 'Baltimore, MD',
    bio: 'Leading researcher in cancer immunotherapy.',
    interests: ['CAR-T Cell Therapy'],
    publications: 87,
    availableForMeetings: true,
    isRegistered: true,
  };

  const mockPublication = {
    id: '2',
    title: 'Novel CAR-T Cell Therapy Shows Promise in Glioblastoma Treatment',
    authors: ['Smith J', 'Johnson M'],
    journal: 'Nature Medicine',
    date: 'January 2025',
    abstract: 'Background: Glioblastoma remains challenging.',
    summary: 'New CAR-T therapy showed tumor reduction in 58% of patients.',
    url: 'https://example.com',
    topics: ['CAR-T Therapy', 'Glioblastoma'],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
        <p className="text-muted-foreground">
          Access your saved clinical trials, experts, and publications
        </p>
      </div>

      <Tabs defaultValue="trials" className="w-full">
        <TabsList>
          <TabsTrigger value="trials" data-testid="tab-trials">Clinical Trials</TabsTrigger>
          <TabsTrigger value="experts" data-testid="tab-experts">Experts</TabsTrigger>
          <TabsTrigger value="publications" data-testid="tab-publications">Publications</TabsTrigger>
        </TabsList>

        <TabsContent value="trials" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <ClinicalTrialCard
              trial={mockTrial}
              onFavorite={(id) => setFavorites(prev => prev.filter(f => f !== id))}
              isFavorited={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="experts" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ExpertCard
              expert={mockExpert}
              onFavorite={(id) => setFavorites(prev => prev.filter(f => f !== id))}
              onFollow={(id) => setFollowing(prev =>
                prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
              )}
              isFavorited={true}
              isFollowing={following.includes(mockExpert.id)}
            />
          </div>
        </TabsContent>

        <TabsContent value="publications" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <PublicationCard
              publication={mockPublication}
              onFavorite={(id) => setFavorites(prev => prev.filter(f => f !== id))}
              isFavorited={true}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
