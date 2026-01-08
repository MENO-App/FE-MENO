import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { MenuItem, WEEKDAYS, MealChoiceStatus } from '@/types/canteen';
import { MealCard } from './MealCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DayMealSelectionProps {
  dayIndex: number;
  mainItem: MenuItem;
  vegItem: MenuItem;
  allergens: Record<string, string[]>;
  initialStatus: MealChoiceStatus | null;
  initialVegetarian: boolean;
  onUpdate: (status: MealChoiceStatus, vegetarian: boolean) => void;
}

export const DayMealSelection = ({
  dayIndex,
  mainItem,
  vegItem,
  allergens,
  initialStatus,
  initialVegetarian,
  onUpdate,
}: DayMealSelectionProps) => {
  const [status, setStatus] = useState<MealChoiceStatus | null>(initialStatus);
  const [wantsVegetarian, setWantsVegetarian] = useState(initialVegetarian);

  const dayName = WEEKDAYS[dayIndex];
  const isToday = new Date().getDay() === dayIndex + 1;

  const handleStatusChange = (newStatus: MealChoiceStatus) => {
    setStatus(newStatus);
    onUpdate(newStatus, wantsVegetarian);
  };

  const handleMealSelect = (isVeg: boolean) => {
    setWantsVegetarian(isVeg);
    if (status !== 'EATING') {
      setStatus('EATING');
    }
    onUpdate('EATING', isVeg);
  };

  return (
    <div
      className={cn(
        'rounded-2xl border bg-card p-4 transition-all duration-300 animate-fade-in',
        isToday && 'ring-2 ring-primary'
      )}
      style={{ animationDelay: `${dayIndex * 50}ms` }}
    >
      {/* Day header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold">{dayName}</h3>
          {isToday && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
              Today
            </span>
          )}
        </div>

        {/* Status toggle */}
        <div className="flex gap-1 rounded-xl bg-muted p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStatusChange('EATING')}
            className={cn(
              'h-8 gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all',
              status === 'EATING' && 'status-eating hover:bg-eating/90'
            )}
          >
            <Check className="h-3.5 w-3.5" />
            Eating
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStatusChange('NOT_EATING')}
            className={cn(
              'h-8 gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all',
              status === 'NOT_EATING' && 'status-not-eating hover:bg-not-eating/90'
            )}
          >
            <X className="h-3.5 w-3.5" />
            Skip
          </Button>
        </div>
      </div>

      {/* Meal options */}
      {status !== 'NOT_EATING' && (
        <div className="grid gap-3 sm:grid-cols-2">
          <MealCard
            item={mainItem}
            allergens={allergens[mainItem.menuItemId] || []}
            isSelected={status === 'EATING' && !wantsVegetarian}
            onSelect={() => handleMealSelect(false)}
          />
          <MealCard
            item={vegItem}
            allergens={allergens[vegItem.menuItemId] || []}
            isSelected={status === 'EATING' && wantsVegetarian}
            onSelect={() => handleMealSelect(true)}
          />
        </div>
      )}

      {status === 'NOT_EATING' && (
        <div className="flex h-24 items-center justify-center rounded-xl bg-muted/50">
          <p className="text-sm text-muted-foreground">Not eating at school today</p>
        </div>
      )}
    </div>
  );
};
