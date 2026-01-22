import { useAuth } from '@/auth/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={() => {
              auth.logout();
              navigate('/login', { replace: true });
            }}
          >
            Logga ut
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Statistik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Systemöversikt</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Användare
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Hantera användare</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Inställningar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Systemkonfiguration</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Din adminprofil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Hej {auth.email}! Du är inloggad som admin.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>E-post:</strong> {auth.email}
              </p>
              <p>
                <strong>ID:</strong> {auth.userId}
              </p>
              <p>
                <strong>Roller:</strong> {auth.roles.join(', ')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
