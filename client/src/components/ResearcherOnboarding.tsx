import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";

interface ResearcherOnboardingProps {
  onComplete: (data: {
    specialties: string[];
    interests: string[];
    orcid?: string;
    availableForMeetings: boolean;
  }) => void;
}

export default function ResearcherOnboarding({ onComplete }: ResearcherOnboardingProps) {
  const [specialtyInput, setSpecialtyInput] = useState("");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [orcid, setOrcid] = useState("");
  const [availableForMeetings, setAvailableForMeetings] = useState(true);

  const addSpecialty = () => {
    if (specialtyInput.trim() && !specialties.includes(specialtyInput.trim())) {
      setSpecialties([...specialties, specialtyInput.trim()]);
      setSpecialtyInput("");
    }
  };

  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const handleSubmit = () => {
    if (specialties.length > 0 && interests.length > 0) {
      onComplete({
        specialties,
        interests,
        orcid: orcid || undefined,
        availableForMeetings,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <Card className="max-w-2xl w-full p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Researcher Profile Setup</h2>
            <p className="text-muted-foreground">
              Share your expertise to connect with relevant opportunities and collaborators.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialty">Specialties</Label>
            <div className="flex gap-2">
              <Input
                id="specialty"
                placeholder="e.g., Oncology, Neurology"
                value={specialtyInput}
                onChange={(e) => setSpecialtyInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                data-testid="input-specialty"
              />
              <Button onClick={addSpecialty} data-testid="button-add-specialty">Add</Button>
            </div>
            {specialties.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" data-testid={`badge-specialty-${index}`}>
                    {specialty}
                    <button
                      onClick={() => setSpecialties(specialties.filter((_, i) => i !== index))}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Research Interests</Label>
            <div className="flex gap-2">
              <Input
                id="interests"
                placeholder="e.g., Immunotherapy, Gene Therapy"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                data-testid="input-interest"
              />
              <Button onClick={addInterest} data-testid="button-add-interest">Add</Button>
            </div>
            {interests.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" data-testid={`badge-interest-${index}`}>
                    {interest}
                    <button
                      onClick={() => setInterests(interests.filter((_, i) => i !== index))}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="orcid">ORCID (Optional)</Label>
            <Input
              id="orcid"
              placeholder="0000-0000-0000-0000"
              value={orcid}
              onChange={(e) => setOrcid(e.target.value)}
              data-testid="input-orcid"
            />
            <p className="text-sm text-muted-foreground">
              Connect your ORCID to automatically import publications.
            </p>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="meetings">Available for Meetings</Label>
              <p className="text-sm text-muted-foreground">
                Allow patients to request meetings with you
              </p>
            </div>
            <Switch
              id="meetings"
              checked={availableForMeetings}
              onCheckedChange={setAvailableForMeetings}
              data-testid="switch-availability"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={specialties.length === 0 || interests.length === 0}
            className="w-full"
            data-testid="button-complete-onboarding"
          >
            Complete Profile
          </Button>
        </div>
      </Card>
    </div>
  );
}
