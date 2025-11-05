import { useLocation } from "wouter";
import PatientOnboarding from "@/components/PatientOnboarding";

export default function PatientOnboardingPage() {
  const [, setLocation] = useLocation();

  const handleComplete = (data: { conditions: string[]; location: string }) => {
    console.log('Patient profile created:', data);
    localStorage.setItem('userRole', 'patient');
    localStorage.setItem('patientProfile', JSON.stringify(data));
    setLocation('/dashboard');
  };

  return <PatientOnboarding onComplete={handleComplete} />;
}
