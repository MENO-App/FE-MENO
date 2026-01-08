import { Leaf, Utensils } from 'lucide-react';
import { MenuItem, MealType } from '@/types/canteen';
import { AllergenBadge } from './AllergenBadge';
import { cn } from '@/lib/utils';

interface MealCardProps {
  item: MenuItem;
  allergens: string[];
  isSelected?: boolean;
  onSelect?: () => void;
}

export const MealCard = ({ item, allergens, isSelected = false, onSelect }: MealCardProps) => {
  const isVegetarian = item.type === 'VEG';

  return (
    <button
      onClick={onSelect}
      className={cn(
        'group relative w-full rounded-2xl border-2 p-4 text-left transition-all duration-200',
        'hover:shadow-md hover:scale-[1.02]',
        isVegetarian ? 'meal-card-vegetarian' : 'meal-card-main',
        isSelected && 'ring-2 ring-primary ring-offset-2'
      )}
    >
      {/* Type indicator */}
      <div
        className={cn(
          'absolute -top-2 right-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-sm',
          isVegetarian ? 'bg-vegetarian' : 'bg-main-dish'
        )}
      >
        {isVegetarian ? (
          <>
            <Leaf className="h-3 w-3" />
            <span>Veggie</span>
          </>
        ) : (
          <>
            <Utensils className="h-3 w-3" />
            <span>Main</span>
          </>
        )}
      </div>

      {/* Content */}
      <div className="pt-2">
        <h4 className="text-base font-bold leading-tight">{item.title}</h4>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>

        {/* Allergens */}
        {allergens.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {allergens.map((code) => (
              <AllergenBadge key={code} code={code} />
            ))}
          </div>
        )}
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute bottom-2 right-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
    </button>
  );
};
