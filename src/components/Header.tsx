import { UtensilsCrossed, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockUser } from '@/data/mockData';

export const Header = () => {
  const initials = mockUser.displayName
    .split(' ')
    .map((n) => n[0])
    .join('');

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
              <p className="text-sm font-semibold leading-tight">{mockUser.displayName}</p>
              <p className="text-xs text-muted-foreground">Class {mockUser.classGroup}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
