import { menuItems, menuAllergens } from '@/data/mockData';
import { mockMealCounts } from '@/data/dashboardData';
import { WEEKDAYS, ALLERGEN_CODES } from '@/types/canteen';
import { Printer, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AllergenBadge } from '@/components/AllergenBadge';

export const WeeklyMenuTable = () => {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Weekly Menu Overview</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b">
              <th className="pb-3 text-left font-semibold text-muted-foreground">Day</th>
              <th className="pb-3 text-left font-semibold text-muted-foreground">Main Dish</th>
              <th className="pb-3 text-left font-semibold text-muted-foreground">Vegetarian</th>
              <th className="pb-3 text-center font-semibold text-muted-foreground">Total</th>
              <th className="pb-3 text-center font-semibold text-muted-foreground">Veg %</th>
            </tr>
          </thead>
          <tbody>
            {WEEKDAYS.map((day, index) => {
              const dayNum = index + 1;
              const mainItem = menuItems.find((m) => m.dayOfWeek === dayNum && m.type === 'MAIN');
              const vegItem = menuItems.find((m) => m.dayOfWeek === dayNum && m.type === 'VEG');
              const counts = mockMealCounts[dayNum];
              const vegPercent = ((counts.vegetarian / counts.eating) * 100).toFixed(0);

              return (
                <tr key={day} className="border-b last:border-0">
                  <td className="py-3 font-semibold">{day}</td>
                  <td className="py-3">
                    <div>
                      <p className="font-medium">{mainItem?.title}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {mainItem && menuAllergens[mainItem.menuItemId]?.map((code) => (
                          <AllergenBadge key={code} code={code} />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div>
                      <p className="font-medium">{vegItem?.title}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {vegItem && menuAllergens[vegItem.menuItemId]?.map((code) => (
                          <AllergenBadge key={code} code={code} />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">
                      {counts.eating}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <span className="rounded-full bg-vegetarian/10 px-2.5 py-1 font-semibold text-vegetarian">
                      {vegPercent}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
