import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { useState } from "react";

interface ForumPostProps {
  post: {
    id: string;
    author: string;
    authorRole: 'patient' | 'researcher';
    avatar?: string;
    title: string;
    content: string;
    timestamp: string;
    replies: number;
    likes: number;
  };
  onReply?: (id: string) => void;
  onLike?: (id: string) => void;
}

export default function ForumPost({ post, onReply, onLike }: ForumPostProps) {
  const [liked, setLiked] = useState(false);
  const initials = post.author.split(' ').map(n => n[0]).join('');

  const handleLike = () => {
    setLiked(!liked);
    onLike?.(post.id);
  };

  return (
    <Card className="p-6" data-testid={`post-${post.id}`}>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={post.avatar} alt={post.author} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">{post.author}</span>
              {post.authorRole === 'researcher' && (
                <Badge variant="secondary" className="text-xs">Researcher</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-muted-foreground">{post.content}</p>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={liked ? 'text-primary' : ''}
            data-testid={`button-like-${post.id}`}
          >
            <ThumbsUp className={`h-4 w-4 mr-2 ${liked ? 'fill-current' : ''}`} />
            {post.likes + (liked ? 1 : 0)}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReply?.(post.id)}
            data-testid={`button-reply-${post.id}`}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            {post.replies} Replies
          </Button>
        </div>
      </div>
    </Card>
  );
}
