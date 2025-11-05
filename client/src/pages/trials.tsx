import SearchBar from "@/components/SearchBar";
import ClinicalTrialCard from "@/components/ClinicalTrialCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Trials() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const mockTrials = [
    {
      id: '1',
      title: 'Phase 3 Study of Novel Immunotherapy for Glioblastoma',
      status: 'recruiting' as const,
      phase: 'Phase 3',
      location: 'New York, NY',
      startDate: 'Jan 2025',
      participants: 150,
      condition: 'Glioblastoma',
      summary: 'This trial evaluates a new immunotherapy approach targeting glioblastoma cells.',
      description: 'A multicenter, randomized, double-blind study evaluating XYZ-123 immunotherapy.',
      eligibility: 'Ages 18-75, newly diagnosed glioblastoma',
      contactEmail: 'trial@example.com',
    },
    {
      id: '2',
      title: 'Early Detection of Brain Tumors Using Advanced MRI Techniques',
      status: 'active' as const,
      phase: 'Phase 2',
      location: 'Boston, MA',
      startDate: 'Dec 2024',
      participants: 80,
      condition: 'Brain Cancer',
      summary: 'Testing new MRI protocols for earlier detection of brain tumors.',
      description: 'This study investigates novel MRI techniques to improve early detection rates.',
    },
  ];

  const filters = ['Recruiting', 'Active', 'Completed', 'Phase 1', 'Phase 2', 'Phase 3'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Clinical Trials</h1>
        <p className="text-muted-foreground">
          Search and discover clinical trials tailored to your condition
        </p>
      </div>

      <SearchBar
        placeholder="Search clinical trials by condition, treatment, or location..."
        onSearch={(query) => console.log('Search:', query)}
        onFilterClick={() => console.log('Filters clicked')}
      />

      <div className="space-y-2">
        <p className="text-sm font-medium">Filters</p>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Badge
              key={filter}
              variant={selectedFilters.includes(filter) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedFilters(prev =>
                prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
              )}
              data-testid={`filter-${filter.toLowerCase().replace(' ', '-')}`}
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {mockTrials.map((trial) => (
          <ClinicalTrialCard
            key={trial.id}
            trial={trial}
            onFavorite={(id) => setFavorites(prev =>
              prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
            )}
            isFavorited={favorites.includes(trial.id)}
          />
        ))}
      </div>
    </div>
  );
}
