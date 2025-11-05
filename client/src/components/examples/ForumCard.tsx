import ForumCard from '../ForumCard';

export default function ForumCardExample() {
  const mockForums = [
    {
      id: '1',
      title: 'Cancer Research Discussions',
      description: 'Share experiences and ask questions about cancer treatments and clinical trials',
      category: 'Oncology',
      postCount: 342,
      lastActivity: '2 hours ago',
      icon: '🔬',
    },
    {
      id: '2',
      title: 'Clinical Trials Insights',
      description: 'Learn about ongoing clinical trials and share your participation experiences',
      category: 'Clinical Trials',
      postCount: 198,
      lastActivity: '1 day ago',
      icon: '📋',
    },
  ];

  return (
    <div className="p-6 max-w-2xl space-y-4">
      {mockForums.map(forum => (
        <ForumCard
          key={forum.id}
          forum={forum}
          onClick={(id) => console.log('Forum clicked:', id)}
        />
      ))}
    </div>
  );
}
