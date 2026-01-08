import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { WEEKDAYS, MealChoiceStatus } from '@/types/canteen';
import { cn } from '@/lib/utils';

interface WeekSummaryProps {
  choices: Record<string, { status: MealChoiceStatus | null; vegetarian: boolean }>;
}

export const WeekSummary = ({ choices }: WeekSummaryProps) => {
  const eatingCount = Object.values(choices).filter((c) => c.status === 'EATING').length;
  const skippingCount = Object.values(choices).filter((c) => c.status === 'NOT_EATING').length;
  const pendingCount = Object.values(choices).filter((c) => c.status === null).length;

  return (
    <div className="rounded-2xl bg-card p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        This Week
      </h3>

      {/* Stats row */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center rounded-xl bg-eating/10 p-3">
          <span className="text-2xl font-bold text-eating">{eatingCount}</span>
          <span className="text-xs text-muted-foreground">Eating</span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-not-eating/10 p-3">
          <span className="text-2xl font-bold text-not-eating">{skippingCount}</span>
          <span className="text-xs text-muted-foreground">Skipping</span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-secondary/10 p-3">
          <span className="text-2xl font-bold text-secondary">{pendingCount}</span>
          <span className="text-xs text-muted-foreground">Pending</span>
        </div>
      </div>

      {/* Day indicators */}
      <div className="flex justify-between gap-1">
        {WEEKDAYS.map((day, i) => {
          const choice = choices[(i + 1).toString()];
          const status = choice?.status;
          
          return (
            <div
              key={day}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full transition-all',
                  status === 'EATING' && 'bg-eating text-white',
                  status === 'NOT_EATING' && 'bg-not-eating text-white',
                  status === null && 'bg-muted text-muted-foreground'
                )}
              >
                {status === 'EATING' && <CheckCircle2 className="h-4 w-4" />}
                {status === 'NOT_EATING' && <XCircle className="h-4 w-4" />}
                {status === null && <AlertCircle className="h-4 w-4" />}
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">
                {day.slice(0, 3)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
