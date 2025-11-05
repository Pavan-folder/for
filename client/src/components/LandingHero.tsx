import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/Medical_connection_network_illustration_4d859463.png";

interface LandingHeroProps {
  onPatientClick: () => void;
  onResearcherClick: () => void;
}

export default function LandingHero({ onPatientClick, onResearcherClick }: LandingHeroProps) {
  return (
    <section className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Connecting Patients and Researchers
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover relevant clinical trials, connect with health experts, and access cutting-edge medical research all in one place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={onPatientClick}
                className="text-lg px-8 py-6 group"
                data-testid="button-patient-start"
              >
                I am a Patient or Caregiver
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onResearcherClick}
                className="text-lg px-8 py-6 group"
                data-testid="button-researcher-start"
              >
                I am a Researcher
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <img
              src={heroImage}
              alt="Medical research network illustration"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
