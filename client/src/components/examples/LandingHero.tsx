import LandingHero from '../LandingHero';

export default function LandingHeroExample() {
  return (
    <LandingHero
      onPatientClick={() => console.log('Patient clicked')}
      onResearcherClick={() => console.log('Researcher clicked')}
    />
  );
}
