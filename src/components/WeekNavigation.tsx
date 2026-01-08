import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { currentMenuWeek } from '@/data/mockData';

interface WeekNavigationProps {
  weekNumber: number;
  year: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const WeekNavigation = ({ weekNumber, year, onPrevious, onNext }: WeekNavigationProps) => {
  const isCurrentWeek = weekNumber === currentMenuWeek.weekNumber && year === currentMenuWeek.year;

  return (
    <div className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        className="h-10 w-10 rounded-xl"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Calendar className="h-6 w-6 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">Week {weekNumber}</p>
          <p className="text-sm text-muted-foreground">
            {year}
            {isCurrentWeek && (
              <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                Current
              </span>
            )}
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        className="h-10 w-10 rounded-xl"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};
