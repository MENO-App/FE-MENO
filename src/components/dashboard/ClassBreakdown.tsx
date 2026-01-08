import { mockClassBreakdown } from '@/data/dashboardData';
import { cn } from '@/lib/utils';

export const ClassBreakdown = () => {
  const maxEating = Math.max(...mockClassBreakdown.map((c) => c.eating));

  return (
    <div className="rounded-2xl border bg-card p-5">
      <h3 className="mb-4 text-lg font-bold">By Class</h3>

      <div className="space-y-2">
        {mockClassBreakdown.map((cls) => {
          const percentage = (cls.eating / maxEating) * 100;
          const vegPercentage = (cls.vegetarian / cls.eating) * 100;
          
          return (
            <div key={cls.classGroup} className="group flex items-center gap-3">
              <span className="w-8 text-sm font-semibold text-muted-foreground">
                {cls.classGroup}
              </span>
              
              <div className="relative flex-1 h-7 overflow-hidden rounded-lg bg-muted">
                <div
                  className="absolute left-0 top-0 h-full rounded-lg bg-primary/20 transition-all"
                  style={{ width: `${percentage}%` }}
                />
                <div
                  className="absolute left-0 top-0 h-full rounded-lg bg-primary transition-all group-hover:bg-primary/90"
                  style={{ width: `${((cls.eating - cls.vegetarian) / maxEating) * 100}%` }}
                />
                
                <div className="absolute inset-0 flex items-center px-2 text-xs">
                  <span className="font-medium text-white drop-shadow-sm">
                    {cls.eating}
                  </span>
                </div>
              </div>
              
              <div className="flex w-16 items-center gap-1 text-xs text-vegetarian">
                <span className="h-2 w-2 rounded-full bg-vegetarian" />
                {cls.vegetarian} veg
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
