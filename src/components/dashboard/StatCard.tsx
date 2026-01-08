import { Users, UtensilsCrossed, Leaf, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  variant?: 'default' | 'primary' | 'vegetarian' | 'warning';
  trend?: { value: number; label: string };
}

export const StatCard = ({ title, value, subtitle, icon, variant = 'default', trend }: StatCardProps) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border p-5 transition-all hover:shadow-md',
        variant === 'default' && 'bg-card',
        variant === 'primary' && 'bg-primary/5 border-primary/20',
        variant === 'vegetarian' && 'bg-vegetarian-light border-vegetarian/20',
        variant === 'warning' && 'bg-secondary/10 border-secondary/20'
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-bold">{value}</p>
          {subtitle && (
            <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <p className={cn(
              'mt-2 text-xs font-medium',
              trend.value >= 0 ? 'text-primary' : 'text-destructive'
            )}>
              {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl',
            variant === 'default' && 'bg-muted text-muted-foreground',
            variant === 'primary' && 'bg-primary/10 text-primary',
            variant === 'vegetarian' && 'bg-vegetarian/10 text-vegetarian',
            variant === 'warning' && 'bg-secondary/20 text-secondary'
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};
