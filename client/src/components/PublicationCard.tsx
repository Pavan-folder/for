import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Heart, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface PublicationCardProps {
  publication: {
    id: string;
    title: string;
    authors: string[];
    journal: string;
    date: string;
    abstract: string;
    summary: string;
    url: string;
    topics: string[];
  };
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

export default function PublicationCard({ publication, onFavorite, isFavorited = false }: PublicationCardProps) {
  const [showAbstract, setShowAbstract] = useState(false);

  return (
    <Card className="p-6 hover-elevate" data-testid={`card-publication-${publication.id}`}>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{publication.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {publication.authors.slice(0, 3).join(', ')}
              {publication.authors.length > 3 && ` et al.`}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">{publication.journal}</span>
              <span>•</span>
              <span>{publication.date}</span>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onFavorite?.(publication.id)}
            className={isFavorited ? 'text-red-500' : ''}
            data-testid={`button-favorite-${publication.id}`}
          >
            <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {publication.topics.map((topic, index) => (
            <Badge key={index} variant="outline" className="text-xs" data-testid={`badge-topic-${publication.id}-${index}`}>
              {topic}
            </Badge>
          ))}
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm font-medium mb-2">AI Summary</p>
          <p className="text-sm text-muted-foreground">{publication.summary}</p>
        </div>

        <Button
          variant="ghost"
          onClick={() => setShowAbstract(!showAbstract)}
          className="w-full"
          data-testid={`button-toggle-abstract-${publication.id}`}
        >
          {showAbstract ? (
            <>
              Hide Abstract <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              View Abstract <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        {showAbstract && (
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">{publication.abstract}</p>
          </div>
        )}

        <Button
          className="w-full"
          onClick={() => window.open(publication.url, '_blank')}
          data-testid={`button-read-full-${publication.id}`}
        >
          Read Full Paper
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
