import DashboardStats from '../DashboardStats';

export default function DashboardStatsExample() {
  const mockStats = {
    trials: 47,
    experts: 28,
    publications: 156,
    favorites: 12,
  };

  return (
    <div className="p-6">
      <DashboardStats stats={mockStats} />
    </div>
  );
}
