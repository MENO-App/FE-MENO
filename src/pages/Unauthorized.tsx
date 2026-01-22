import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function Unauthorized() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    navigate('/login', { replace: true });
  };

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-destructive/10 to-destructive/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-destructive/50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-destructive/10 rounded-full">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Åtkomst nekas</CardTitle>
          <CardDescription>Du har inte behörighet att komma åt denna sida</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Din roll ({auth.roles.join(', ') || 'ingen'}) ger dig inte åtkomst till denna resurs.
            </p>
          </div>

          <div className="space-y-2">
            <Button onClick={handleGoHome} className="w-full" variant="default">
              Tillbaka till startsidan
            </Button>
            <Button onClick={handleLogout} className="w-full" variant="outline">
              Logga ut
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
