import ForumCard from "@/components/ForumCard";
import ForumPost from "@/components/ForumPost";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

export default function Forums() {
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
    {
      id: '3',
      title: 'Immunotherapy Advances',
      description: 'Discuss the latest developments in immunotherapy treatments',
      category: 'Treatment',
      postCount: 156,
      lastActivity: '3 hours ago',
      icon: '💉',
    },
  ];

  const mockPosts = [
    {
      id: '1',
      author: 'Dr. Emily Chen',
      authorRole: 'researcher' as const,
      title: 'Latest Advances in CAR-T Cell Therapy for Glioblastoma',
      content: 'Wanted to share some exciting findings from our recent study on CAR-T cell therapy. Happy to answer questions!',
      timestamp: '2 hours ago',
      replies: 12,
      likes: 24,
    },
    {
      id: '2',
      author: 'John Davis',
      authorRole: 'patient' as const,
      title: 'Questions about Clinical Trial Eligibility',
      content: 'I\'m interested in participating in immunotherapy trials. What should I know about eligibility criteria?',
      timestamp: '5 hours ago',
      replies: 8,
      likes: 15,
    },
  ];

  const [view, setView] = useState<'categories' | 'posts'>('categories');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Community Forums</h1>
        <p className="text-muted-foreground">
          Engage with researchers and fellow patients in discussions
        </p>
      </div>

      <SearchBar
        placeholder="Search forums and discussions..."
        onSearch={(query) => console.log('Search:', query)}
        showFilters={false}
      />

      {view === 'categories' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockForums.map((forum) => (
            <ForumCard
              key={forum.id}
              forum={forum}
              onClick={(id) => {
                console.log('Forum clicked:', id);
                setView('posts');
              }}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => setView('categories')}
            className="text-sm text-primary hover:underline"
            data-testid="button-back-to-categories"
          >
            ← Back to Categories
          </button>
          {mockPosts.map((post) => (
            <ForumPost
              key={post.id}
              post={post}
              onReply={(id) => console.log('Reply to:', id)}
              onLike={(id) => console.log('Like:', id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
