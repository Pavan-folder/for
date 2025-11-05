import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { X, Loader2 } from "lucide-react";

interface PatientOnboardingProps {
  onComplete: (data: { conditions: string[]; location: string }) => void;
}

export default function PatientOnboarding({ onComplete }: PatientOnboardingProps) {
  const [step, setStep] = useState(1);
  const [conditionInput, setConditionInput] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConditionSubmit = () => {
    if (conditionInput.trim()) {
      setIsProcessing(true);
      setTimeout(() => {
        const newConditions = conditionInput.split(',').map(c => c.trim()).filter(c => c);
        setConditions([...conditions, ...newConditions]);
        setConditionInput("");
        setIsProcessing(false);
      }, 800);
    }
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (conditions.length > 0 && location) {
      onComplete({ conditions, location });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <Card className="max-w-2xl w-full p-8">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-semibold">Patient Profile Setup</h2>
              <span className="text-sm text-muted-foreground">Step {step} of 2</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(step / 2) * 100}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="conditions">Tell us about your medical conditions</Label>
                <Textarea
                  id="conditions"
                  placeholder="e.g., I have Brain Cancer, or type multiple conditions separated by commas"
                  value={conditionInput}
                  onChange={(e) => setConditionInput(e.target.value)}
                  className="min-h-32"
                  data-testid="input-conditions"
                />
                <p className="text-sm text-muted-foreground">
                  You can use natural language. Our AI will help identify the conditions.
                </p>
              </div>

              <Button
                onClick={handleConditionSubmit}
                disabled={!conditionInput.trim() || isProcessing}
                data-testid="button-add-condition"
              >
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Conditions
              </Button>

              {conditions.length > 0 && (
                <div className="space-y-2">
                  <Label>Your Conditions</Label>
                  <div className="flex flex-wrap gap-2">
                    {conditions.map((condition, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm px-3 py-1"
                        data-testid={`badge-condition-${index}`}
                      >
                        {condition}
                        <button
                          onClick={() => removeCondition(index)}
                          className="ml-2 hover:text-destructive"
                          data-testid={`button-remove-condition-${index}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={() => setStep(2)}
                disabled={conditions.length === 0}
                className="w-full"
                data-testid="button-next-step"
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="location">Your Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., New York, NY"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  data-testid="input-location"
                />
                <p className="text-sm text-muted-foreground">
                  This helps us find nearby clinical trials and health experts.
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-full"
                  data-testid="button-back"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!location}
                  className="w-full"
                  data-testid="button-complete-onboarding"
                >
                  Complete Profile
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
