import { useLocation } from "wouter";
import LandingHero from "@/components/LandingHero";
import FeatureCards from "@/components/FeatureCards";
import ThemeToggle from "@/components/ThemeToggle";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">CuraLink</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="pt-16">
        <LandingHero
          onPatientClick={() => setLocation('/patient-onboarding')}
          onResearcherClick={() => setLocation('/researcher-onboarding')}
        />
        <FeatureCards />

        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-semibold">
              Powered by AI for Personalized Discovery
            </h2>
            <p className="text-lg text-muted-foreground">
              Our AI analyzes your profile to recommend the most relevant clinical trials,
              experts, and publications tailored to your specific needs and interests.
            </p>
          </div>
        </section>
      </main>

      <footer className="py-12 px-4 border-t bg-background">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 CuraLink. Connecting patients and researchers for better healthcare outcomes.</p>
        </div>
      </footer>
    </div>
  );
}
