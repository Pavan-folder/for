import PublicationCard from '../PublicationCard';
import { useState } from 'react';

export default function PublicationCardExample() {
  const [favorited, setFavorited] = useState(false);

  const mockPublication = {
    id: '1',
    title: 'Novel CAR-T Cell Therapy Shows Promise in Glioblastoma Treatment: A Phase II Clinical Trial',
    authors: ['Smith J', 'Johnson M', 'Williams R', 'Brown K', 'Davis L'],
    journal: 'Nature Medicine',
    date: 'January 2025',
    abstract: 'Background: Glioblastoma remains one of the most challenging cancers to treat. This phase II trial evaluated the efficacy of novel CAR-T cell therapy. Methods: 120 patients with recurrent glioblastoma were enrolled. Results: 58% showed tumor reduction, with median progression-free survival of 9.2 months. Conclusion: CAR-T therapy demonstrates significant promise for glioblastoma treatment.',
    summary: 'This study shows that a new CAR-T cell therapy resulted in tumor reduction in 58% of glioblastoma patients, with fewer side effects than traditional treatments. The therapy works by training immune cells to target cancer cells more effectively.',
    url: 'https://example.com/publication',
    topics: ['CAR-T Therapy', 'Glioblastoma', 'Immunotherapy', 'Phase II Trial'],
  };

  return (
    <div className="p-6 max-w-3xl">
      <PublicationCard
        publication={mockPublication}
        onFavorite={() => setFavorited(!favorited)}
        isFavorited={favorited}
      />
    </div>
  );
}
