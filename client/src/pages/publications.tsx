import SearchBar from "@/components/SearchBar";
import PublicationCard from "@/components/PublicationCard";
import { useState } from "react";

export default function Publications() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const mockPublications = [
    {
      id: '1',
      title: 'Novel CAR-T Cell Therapy Shows Promise in Glioblastoma Treatment: A Phase II Clinical Trial',
      authors: ['Smith J', 'Johnson M', 'Williams R', 'Brown K', 'Davis L'],
      journal: 'Nature Medicine',
      date: 'January 2025',
      abstract: 'Background: Glioblastoma remains one of the most challenging cancers to treat. This phase II trial evaluated the efficacy of novel CAR-T cell therapy.',
      summary: 'This study shows that a new CAR-T cell therapy resulted in tumor reduction in 58% of glioblastoma patients, with fewer side effects than traditional treatments.',
      url: 'https://example.com',
      topics: ['CAR-T Therapy', 'Glioblastoma', 'Immunotherapy', 'Phase II Trial'],
    },
    {
      id: '2',
      title: 'Advances in Precision Medicine for Brain Cancer Treatment',
      authors: ['Chen L', 'Rodriguez E', 'Thompson K'],
      journal: 'Science',
      date: 'December 2024',
      abstract: 'Recent developments in genomic profiling have enabled more targeted approaches to brain cancer treatment.',
      summary: 'Researchers identified specific genetic markers that predict treatment response, allowing for more personalized therapy selection.',
      url: 'https://example.com',
      topics: ['Precision Medicine', 'Genomics', 'Brain Cancer'],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Research Publications</h1>
        <p className="text-muted-foreground">
          Stay up-to-date with the latest medical research and publications
        </p>
      </div>

      <SearchBar
        placeholder="Search publications by topic, author, or journal..."
        onSearch={(query) => console.log('Search:', query)}
        onFilterClick={() => console.log('Filters clicked')}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        {mockPublications.map((publication) => (
          <PublicationCard
            key={publication.id}
            publication={publication}
            onFavorite={(id) => setFavorites(prev =>
              prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
            )}
            isFavorited={favorites.includes(publication.id)}
          />
        ))}
      </div>
    </div>
  );
}
