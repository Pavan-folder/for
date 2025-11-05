import ResearcherOnboarding from '../ResearcherOnboarding';

export default function ResearcherOnboardingExample() {
  return (
    <ResearcherOnboarding
      onComplete={(data) => console.log('Researcher onboarding complete:', data)}
    />
  );
}
