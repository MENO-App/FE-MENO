import { UtensilsCrossed, Bell, User, LayoutDashboard, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  userName?: string;
  userClass?: string;
  userRole?: 'STUDENT' | 'KITCHEN' | 'ADMIN';
}

export const Header = ({ 
  userName = 'Emma Johnson', 
  userClass = '5B',
  userRole = 'STUDENT'
}: HeaderProps) => {
  const location = useLocation();
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('');

  const isAdmin = userRole === 'KITCHEN' || userRole === 'ADMIN';

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <UtensilsCrossed className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">School Canteen</h1>
            <p className="text-xs text-muted-foreground">Oakwood Elementary</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 rounded-xl bg-muted p-1 sm:flex">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'gap-2 rounded-lg',
                location.pathname === '/' && 'bg-background shadow-sm'
              )}
            >
              <CalendarDays className="h-4 w-4" />
              Meal Plan
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'gap-2 rounded-lg',
                location.pathname === '/dashboard' && 'bg-background shadow-sm'
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-secondary" />
          </Button>
          
          <div className="flex items-center gap-2 rounded-full bg-muted px-2 py-1.5">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden pr-2 sm:block">
              <p className="text-sm font-semibold leading-tight">{userName}</p>
              <p className="text-xs text-muted-foreground">
                {userRole === 'KITCHEN' ? 'Kitchen Staff' : userRole === 'ADMIN' ? 'Admin' : `Class ${userClass}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <nav className="flex items-center justify-center gap-1 border-t bg-muted/50 p-2 sm:hidden">
        <Link to="/" className="flex-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'w-full gap-2 rounded-lg',
              location.pathname === '/' && 'bg-background shadow-sm'
            )}
          >
            <CalendarDays className="h-4 w-4" />
            Meal Plan
          </Button>
        </Link>
        <Link to="/dashboard" className="flex-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'w-full gap-2 rounded-lg',
              location.pathname === '/dashboard' && 'bg-background shadow-sm'
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
        </Link>
      </nav>
    </header>
  );
};
