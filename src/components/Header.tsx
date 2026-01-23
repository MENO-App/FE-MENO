import {
  UtensilsCrossed,
  Bell,
  LayoutDashboard,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeaderProps {
  userName?: string;
  userClass?: string;
  userRole?: "STUDENT" | "STAFF" | "KITCHEN" | "ADMIN";
}

export const Header = ({
  userName,
  userClass = "5B",
  userRole = "STUDENT",
}: HeaderProps) => {
  const location = useLocation();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate('/login', { replace: true });
  };

  const displayName = userName || "Unknown";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("");

  // ADMIN + KITCHEN + STAFF can see dashboard
  const canSeeDashboard =
    userRole === "ADMIN" ||
    userRole === "KITCHEN" ||
    userRole === "STAFF";

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <UtensilsCrossed className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">
              School Canteen
            </h1>
            <p className="text-xs text-muted-foreground">
              Oakwood Elementary
            </p>
          </div>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 rounded-xl bg-muted p-1 sm:flex">
          <Link to="/student">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "gap-2 rounded-lg",
                location.pathname === "/student" &&
                  "bg-background shadow-sm"
              )}
            >
              <CalendarDays className="h-4 w-4" />
              Meal Plan
            </Button>
          </Link>

          {canSeeDashboard && (
            <Link to="/admin">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-2 rounded-lg",
                  location.pathname === "/admin" &&
                    "bg-background shadow-sm"
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-secondary" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 rounded-full bg-muted px-2 py-1.5 cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden pr-2 sm:block">
                  <p className="text-sm font-semibold leading-tight">
                    {displayName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(() => {
                      const roleLabels: Record<string, string> = {
                        ADMIN: "Admin",
                        KITCHEN: "Kitchen",
                        STAFF: "Staff",
                        STUDENT: "Student",
                      };
                      if (userRole === "STUDENT") {
                        return `Student${userClass ? ` • Class ${userClass}` : ""}`;
                      }
                      return roleLabels[userRole || ""] || "";
                    })()}
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">Logga ut</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile navigation */}
      <nav className="flex items-center justify-center gap-1 border-t bg-muted/50 p-2 sm:hidden">
        <Link to="/student" className="flex-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full gap-2 rounded-lg",
              location.pathname === "/student" &&
                "bg-background shadow-sm"
            )}
          >
            <CalendarDays className="h-4 w-4" />
            Meal Plan
          </Button>
        </Link>

        {canSeeDashboard && (
          <Link to="/admin" className="flex-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full gap-2 rounded-lg",
                location.pathname === "/admin" &&
                  "bg-background shadow-sm"
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
};
