import { WEEKDAYS } from '@/types/canteen';
import { mockMealCounts } from '@/data/dashboardData';
import { cn } from '@/lib/utils';

export const DailyBreakdown = () => {
  const maxEating = Math.max(...Object.values(mockMealCounts).map((d) => d.eating));

  return (
    <div className="rounded-2xl border bg-card p-5">
      <h3 className="mb-4 text-lg font-bold">Daily Meal Counts</h3>
      
      <div className="space-y-3">
        {WEEKDAYS.map((day, index) => {
          const dayNum = index + 1;
          const data = mockMealCounts[dayNum];
          const eatingPercent = (data.eating / maxEating) * 100;
          const vegPercent = (data.vegetarian / data.eating) * 100;
          
          return (
            <div key={day} className="group">
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium">{day}</span>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {data.eating} eating
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-vegetarian" />
                    {data.vegetarian} veg
                  </span>
                  {data.pending > 0 && (
                    <span className="flex items-center gap-1 text-secondary">
                      <span className="h-2 w-2 rounded-full bg-secondary" />
                      {data.pending} pending
                    </span>
                  )}
                </div>
              </div>
              
              <div className="relative h-8 overflow-hidden rounded-lg bg-muted">
                {/* Main dish bar */}
                <div
                  className="absolute left-0 top-0 h-full rounded-lg bg-primary/80 transition-all group-hover:bg-primary"
                  style={{ width: `${eatingPercent}%` }}
                />
                {/* Vegetarian portion overlay */}
                <div
                  className="absolute left-0 top-0 h-full rounded-lg bg-vegetarian transition-all"
                  style={{ width: `${(data.vegetarian / maxEating) * 100}%` }}
                />
                
                {/* Labels inside bar */}
                <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-semibold">
                  <span className="text-white drop-shadow-sm">
                    {data.main} main
                  </span>
                  <span className="text-white drop-shadow-sm">
                    {data.vegetarian} veg ({vegPercent.toFixed(0)}%)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-vegetarian" />
          Vegetarian
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-primary/80" />
          Main Dish
        </span>
      </div>
    </div>
  );
};
