import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';
import { Header } from '@/components/Header';
import { WeekNavigation } from '@/components/WeekNavigation';
import { WeekSummary } from '@/components/WeekSummary';
import { DayMealSelection } from '@/components/DayMealSelection';
import { MealChoiceStatus, WEEKDAYS } from '@/types/canteen';
import { menuItems, menuAllergens } from '@/data/mockData';
import { toast } from 'sonner';

function getCurrentWeekNumber(): { week: number; year: number } {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);
  const week = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return { week, year: now.getFullYear() };
}

const Index = () => {
  const current = getCurrentWeekNumber();
  const [weekNumber, setWeekNumber] = useState(current.week);
  const [year, setYear] = useState(current.year);
  const [choices, setChoices] = useState<Record<string, { status: MealChoiceStatus | null; vegetarian: boolean }>>({});

  const auth = useAuth() as any;
  const navigate = useNavigate();

  const handlePreviousWeek = () => {
    if (weekNumber === 1) {
      setWeekNumber(52);
      setYear(year - 1);
    } else {
      setWeekNumber(weekNumber - 1);
    }
  };

  const handleNextWeek = () => {
    if (weekNumber === 52) {
      setWeekNumber(1);
      setYear(year + 1);
    } else {
      setWeekNumber(weekNumber + 1);
    }
  };

  const handleUpdateChoice = (day: number, status: MealChoiceStatus, vegetarian: boolean) => {
    setChoices((prev) => ({
      ...prev,
      [day.toString()]: { status, vegetarian },
    }));

    const dayName = WEEKDAYS[day - 1];
    if (status === 'EATING') {
      toast.success(`${dayName}: ${vegetarian ? 'Vegetarian' : 'Main dish'} selected!`);
    } else {
      toast.info(`${dayName}: Skipping lunch`);
    }
  };

  // Group menu items by day
  const menuByDay = WEEKDAYS.map((_, index) => {
    const dayNum = index + 1;
    const mainItem = menuItems.find((m) => m.dayOfWeek === dayNum && m.type === 'MAIN');
    const vegItem = menuItems.find((m) => m.dayOfWeek === dayNum && m.type === 'VEG');
    return { dayNum, mainItem, vegItem };
  });

  const handleLogout = () => {
    auth.logout();
    navigate('/login', { replace: true });
  };

  const userEmail = auth?.email || auth?.user?.email || undefined;
  const userRole = Array.isArray(auth?.roles) && auth.roles.length > 0 ? auth.roles[0] : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header userName={userEmail} userRole={userRole} />

      <main className="container max-w-4xl px-4 py-6">
        {/* Week navigation */}
        <div className="mb-6">
          <WeekNavigation
            weekNumber={weekNumber}
            year={year}
            onPrevious={handlePreviousWeek}
            onNext={handleNextWeek}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          {/* Main content - Daily selections */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Plan Your Meals</h2>

            {menuByDay.map(({ dayNum, mainItem, vegItem }) => {
              if (!mainItem || !vegItem) return null;

              const choice = choices[dayNum.toString()];

              return (
                <DayMealSelection
                  key={`${weekNumber}-${dayNum}`}
                  dayIndex={dayNum - 1}
                  mainItem={mainItem}
                  vegItem={vegItem}
                  allergens={menuAllergens}
                  initialStatus={choice?.status || null}
                  initialVegetarian={choice?.vegetarian || false}
                  onUpdate={(status, vegetarian) => handleUpdateChoice(dayNum, status, vegetarian)}
                />
              );
            })}
          </div>

          {/* Sidebar - Summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <WeekSummary choices={choices} />

            {/* Quick tips */}
            <div className="mt-4 rounded-2xl bg-primary/5 p-4">
              <h4 className="mb-2 text-sm font-semibold text-primary">Tips</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>Select your meals before Friday</li>
                <li>Check allergen info on each dish</li>
                <li>Vegetarian options are marked with VEG</li>
              </ul>
              <button type="button" onClick={handleLogout} style={{ display: 'none' }}>Logga ut</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
