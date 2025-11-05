import { Card } from "@/components/ui/card";
import { FileText, Users, Beaker, Heart } from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  change?: string;
}

function StatCard({ icon: Icon, label, value, change }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && (
            <p className="text-sm text-primary mt-1">{change}</p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}

interface DashboardStatsProps {
  stats: {
    trials: number;
    experts: number;
    publications: number;
    favorites: number;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={Beaker}
        label="Clinical Trials"
        value={stats.trials}
        change="+12 new this week"
      />
      <StatCard
        icon={Users}
        label="Health Experts"
        value={stats.experts}
        change="+5 in your area"
      />
      <StatCard
        icon={FileText}
        label="Publications"
        value={stats.publications}
        change="+23 recent"
      />
      <StatCard
        icon={Heart}
        label="Favorites"
        value={stats.favorites}
      />
    </div>
  );
}
