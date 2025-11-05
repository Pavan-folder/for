import { useLocation } from "wouter";
import ResearcherOnboarding from "@/components/ResearcherOnboarding";

export default function ResearcherOnboardingPage() {
  const [, setLocation] = useLocation();

  const handleComplete = (data: any) => {
    console.log('Researcher profile created:', data);
    localStorage.setItem('userRole', 'researcher');
    localStorage.setItem('researcherProfile', JSON.stringify(data));
    setLocation('/dashboard');
  };

  return <ResearcherOnboarding onComplete={handleComplete} />;
}
