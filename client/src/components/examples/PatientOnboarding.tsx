import PatientOnboarding from '../PatientOnboarding';

export default function PatientOnboardingExample() {
  return (
    <PatientOnboarding
      onComplete={(data) => console.log('Patient onboarding complete:', data)}
    />
  );
}
