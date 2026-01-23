import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";

import { Header } from "@/components/Header";
import { WeekNavigation } from "@/components/WeekNavigation";
import { StatCard } from "@/components/dashboard/StatCard";
import { DailyBreakdown } from "@/components/dashboard/DailyBreakdown";
import { AllergenReport } from "@/components/dashboard/AllergenReport";
import { ClassBreakdown } from "@/components/dashboard/ClassBreakdown";
import { WeeklyMenuTable } from "@/components/dashboard/WeeklyMenuTable";

import { currentMenuWeek } from "@/data/mockData";
import { mockMealCounts, totalStudents } from "@/data/dashboardData";
import { Users, UtensilsCrossed, Leaf, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type AppRole = "STUDENT" | "STAFF" | "KITCHEN" | "ADMIN";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = useAuth() as any;

  const [weekNumber, setWeekNumber] = useState(currentMenuWeek.weekNumber);
  const [year, setYear] = useState(currentMenuWeek.year);

  // Get user info from auth (fallback to localStorage)
  const roles: string[] = auth.roles ?? [];
 const primaryRole: AppRole =
  roles.includes("ADMIN")
    ? "ADMIN"
    : roles.includes("KITCHEN")
      ? "KITCHEN"
      : roles.includes("STAFF")
        ? "STAFF"
        : "STUDENT";

  const userEmail =
    auth.email ?? localStorage.getItem("email") ?? "Unknown user";

  const handleLogout = () => {
    auth.logout(); // clears token + roles
    navigate("/login", { replace: true });
  };

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

  // Calculate totals
  const weeklyTotals = Object.values(mockMealCounts).reduce(
    (acc, day) => ({
      eating: acc.eating + day.eating,
      notEating: acc.notEating + day.notEating,
      pending: acc.pending + day.pending,
      vegetarian: acc.vegetarian + day.vegetarian,
      main: acc.main + day.main,
    }),
    { eating: 0, notEating: 0, pending: 0, vegetarian: 0, main: 0 }
  );

  const avgDaily = Math.round(weeklyTotals.eating / 5);
  const vegPercentage =
    weeklyTotals.eating > 0
      ? ((weeklyTotals.vegetarian / weeklyTotals.eating) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen bg-background">
      {/* Header: show real user + role from auth */}
      <div className="relative">
        <Header userName={userEmail} userRole={primaryRole} />

        {/* Logout button (top-right) */}
        <div className="absolute right-4 top-4">
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <main className="container max-w-6xl px-4 py-6">
        {/* Week navigation */}
        <div className="mb-6">
          <WeekNavigation
            weekNumber={weekNumber}
            year={year}
            onPrevious={handlePreviousWeek}
            onNext={handleNextWeek}
          />
        </div>

        {/* Page title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Kitchen Dashboard</h2>
          <p className="text-muted-foreground">
            Meal planning overview and allergen reports
          </p>
        </div>

        {/* Stats grid */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Students"
            value={totalStudents}
            subtitle="Enrolled this semester"
            icon={<Users className="h-6 w-6" />}
          />
          <StatCard
            title="Weekly Meals"
            value={weeklyTotals.eating}
            subtitle={`~${avgDaily} per day avg`}
            icon={<UtensilsCrossed className="h-6 w-6" />}
            variant="primary"
            trend={{ value: 5, label: "vs last week" }}
          />
          <StatCard
            title="Vegetarian"
            value={`${vegPercentage}%`}
            subtitle={`${weeklyTotals.vegetarian} meals this week`}
            icon={<Leaf className="h-6 w-6" />}
            variant="vegetarian"
          />
          <StatCard
            title="Pending"
            value={weeklyTotals.pending}
            subtitle="Selections needed"
            icon={<AlertCircle className="h-6 w-6" />}
            variant="warning"
          />
        </div>

        {/* Main content grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <DailyBreakdown />
            <WeeklyMenuTable />
          </div>

          <div className="space-y-6">
            <AllergenReport />
            <ClassBreakdown />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
