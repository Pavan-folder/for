import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Heart, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ClinicalTrialCardProps {
  trial: {
    id: string;
    title: string;
    status: 'recruiting' | 'completed' | 'active';
    phase: string;
    location: string;
    startDate: string;
    participants: number;
    condition: string;
    summary: string;
    description: string;
    eligibility?: string;
    contactEmail?: string;
  };
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

export default function ClinicalTrialCard({ trial, onFavorite, isFavorited = false }: ClinicalTrialCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const statusColors = {
    recruiting: 'bg-green-500/10 text-green-700 dark:text-green-400',
    completed: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
    active: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  };

  return (
    <Card className="p-6 hover-elevate" data-testid={`card-trial-${trial.id}`}>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 line-clamp-2">{trial.title}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className={statusColors[trial.status]} data-testid={`badge-status-${trial.id}`}>
                {trial.status}
              </Badge>
              <Badge variant="outline">{trial.phase}</Badge>
              <Badge variant="outline">{trial.condition}</Badge>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onFavorite?.(trial.id)}
            className={isFavorited ? 'text-red-500' : ''}
            data-testid={`button-favorite-${trial.id}`}
          >
            <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{trial.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Started: {trial.startDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{trial.participants} participants</span>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm font-medium mb-2">AI Summary</p>
          <p className="text-sm text-muted-foreground">{trial.summary}</p>
        </div>

        <Button
          variant="ghost"
          onClick={() => setShowDetails(!showDetails)}
          className="w-full"
          data-testid={`button-toggle-details-${trial.id}`}
        >
          {showDetails ? (
            <>
              Hide Details <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              View Details <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        {showDetails && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <p className="font-medium mb-2">Full Description</p>
              <p className="text-sm text-muted-foreground">{trial.description}</p>
            </div>
            {trial.eligibility && (
              <div>
                <p className="font-medium mb-2">Eligibility Criteria</p>
                <p className="text-sm text-muted-foreground">{trial.eligibility}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button className="flex-1" data-testid={`button-learn-more-${trial.id}`}>
            Learn More
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          {trial.contactEmail && (
            <Button variant="outline" className="flex-1" data-testid={`button-contact-${trial.id}`}>
              Contact Team
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
