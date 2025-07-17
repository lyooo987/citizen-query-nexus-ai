
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatItem {
  icon?: LucideIcon;
  value: string | number;
  label: string;
  color: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

interface UnifiedStatsGridProps {
  stats: StatItem[];
  columns?: number;
}

export function UnifiedStatsGrid({ stats, columns = 4 }: UnifiedStatsGridProps) {
  const gridCols = columns === 2 ? 'grid-cols-2' : 
                   columns === 3 ? 'grid-cols-3' : 'grid-cols-4';

  return (
    <div className={`grid grid-cols-1 md:${gridCols} gap-4 mb-6`}>
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            {stat.icon && (
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
            )}
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
            {stat.trend && (
              <div className={`text-xs mt-1 ${stat.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend.isPositive ? '+' : ''}{stat.trend.value}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
