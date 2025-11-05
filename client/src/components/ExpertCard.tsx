import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, FileText, UserPlus, Video, Heart } from "lucide-react";
import { useState } from "react";

interface ExpertCardProps {
  expert: {
    id: string;
    name: string;
    credentials: string;
    specialty: string[];
    location: string;
    bio: string;
    interests: string[];
    publications: number;
    avatar?: string;
    availableForMeetings: boolean;
    isRegistered: boolean;
  };
  onFavorite?: (id: string) => void;
  onRequestMeeting?: (id: string) => void;
  onFollow?: (id: string) => void;
  isFavorited?: boolean;
  isFollowing?: boolean;
}

export default function ExpertCard({
  expert,
  onFavorite,
  onRequestMeeting,
  onFollow,
  isFavorited = false,
  isFollowing = false,
}: ExpertCardProps) {
  const initials = expert.name.split(' ').map(n => n[0]).join('');

  return (
    <Card className="p-6 hover-elevate" data-testid={`card-expert-${expert.id}`}>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={expert.avatar} alt={expert.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold">{expert.name}</h3>
            <p className="text-sm text-muted-foreground">{expert.credentials}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onFavorite?.(expert.id)}
            className={isFavorited ? 'text-red-500' : ''}
            data-testid={`button-favorite-${expert.id}`}
          >
            <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {expert.specialty.map((spec, index) => (
            <Badge key={index} variant="secondary" data-testid={`badge-specialty-${expert.id}-${index}`}>
              {spec}
            </Badge>
          ))}
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{expert.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>{expert.publications} publications</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{expert.bio}</p>

        <div>
          <p className="text-sm font-medium mb-2">Research Interests</p>
          <div className="flex flex-wrap gap-2">
            {expert.interests.map((interest, index) => (
              <Badge key={index} variant="outline" className="text-xs" data-testid={`badge-interest-${expert.id}-${index}`}>
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={isFollowing ? "secondary" : "default"}
            onClick={() => onFollow?.(expert.id)}
            className="flex-1"
            data-testid={`button-follow-${expert.id}`}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
          {expert.isRegistered && expert.availableForMeetings && (
            <Button
              variant="outline"
              onClick={() => onRequestMeeting?.(expert.id)}
              className="flex-1"
              data-testid={`button-meeting-${expert.id}`}
            >
              <Video className="mr-2 h-4 w-4" />
              Request Meeting
            </Button>
          )}
        </div>

        {!expert.isRegistered && (
          <p className="text-xs text-muted-foreground text-center p-2 bg-muted/50 rounded">
            This expert is not yet registered on CuraLink. Meeting requests will be forwarded to admin.
          </p>
        )}
      </div>
    </Card>
  );
}
