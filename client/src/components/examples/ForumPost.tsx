import ForumPost from '../ForumPost';

export default function ForumPostExample() {
  const mockPost = {
    id: '1',
    author: 'Dr. Emily Chen',
    authorRole: 'researcher' as const,
    title: 'Latest Advances in CAR-T Cell Therapy for Glioblastoma',
    content: 'I wanted to share some exciting findings from our recent study on CAR-T cell therapy. We\'ve seen significant improvements in tumor reduction with minimal side effects. Happy to answer any questions about the research or eligibility criteria.',
    timestamp: '2 hours ago',
    replies: 12,
    likes: 24,
  };

  return (
    <div className="p-6 max-w-3xl">
      <ForumPost
        post={mockPost}
        onReply={(id) => console.log('Reply to:', id)}
        onLike={(id) => console.log('Like:', id)}
      />
    </div>
  );
}
