import { useAuth } from '@/auth/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function MealPlan() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Matlista</h1>
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

        <Card>
          <CardHeader>
            <CardTitle>Veckoplan</CardTitle>
            <CardDescription>Din personliga matplan för veckan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Hej {auth.email}! Detta är din matlista-sida.
            </p>
            <p className="text-sm text-muted-foreground">
              Dina roller: <strong>{auth.roles.join(', ')}</strong>
            </p>
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p>Här skulle din matlista visas...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
