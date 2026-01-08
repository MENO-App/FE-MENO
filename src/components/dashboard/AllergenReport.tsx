import { ALLERGEN_CODES } from '@/types/canteen';
import { mockAllergenCounts } from '@/data/dashboardData';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AllergenReport = () => {
  const allergens = Object.entries(mockAllergenCounts).map(([code, data]) => ({
    code,
    ...ALLERGEN_CODES[code],
    ...data,
  }));

  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Allergen Alert</h3>
        <span className="flex items-center gap-1.5 rounded-full bg-allergen-light px-2.5 py-1 text-xs font-medium text-allergen">
          <AlertTriangle className="h-3 w-3" />
          Review Required
        </span>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        Students with allergies who selected meals containing their allergens this week.
      </p>

      <div className="space-y-2">
        {allergens.map((allergen) => {
          const percentage = (allergen.affected / allergen.total) * 100;
          const isHighRisk = allergen.affected > 10;
          
          return (
            <div
              key={allergen.code}
              className={cn(
                'flex items-center justify-between rounded-xl p-3 transition-colors',
                isHighRisk ? 'bg-allergen-light' : 'bg-muted/50'
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{allergen.emoji}</span>
                <div>
                  <p className="font-semibold">{allergen.name}</p>
                  <p className="text-xs text-muted-foreground">
                    In {allergen.total} meal portions this week
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={cn(
                  'text-lg font-bold',
                  isHighRisk ? 'text-allergen' : 'text-foreground'
                )}>
                  {allergen.affected}
                </p>
                <p className="text-xs text-muted-foreground">
                  students affected
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl bg-muted/50 p-3">
        <p className="text-xs text-muted-foreground">
          💡 <strong>Tip:</strong> Contact parents of affected students before meal preparation. 
          Consider alternative meal options for high-risk allergen days.
        </p>
      </div>
    </div>
  );
};
