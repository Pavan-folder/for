import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock } from "lucide-react";

interface ForumCardProps {
  forum: {
    id: string;
    title: string;
    description: string;
    category: string;
    postCount: number;
    lastActivity: string;
    icon?: string;
  };
  onClick: (id: string) => void;
}

export default function ForumCard({ forum, onClick }: ForumCardProps) {
  return (
    <Card
      className="p-6 cursor-pointer hover-elevate"
      onClick={() => onClick(forum.id)}
      data-testid={`card-forum-${forum.id}`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{forum.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{forum.description}</p>
          </div>
          {forum.icon && <span className="text-3xl">{forum.icon}</span>}
        </div>

        <Badge variant="outline">{forum.category}</Badge>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{forum.postCount} posts</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Active {forum.lastActivity}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
