import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validera input
      if (!email.trim()) {
        setError('E-post är obligatorisk');
        setIsLoading(false);
        return;
      }
      if (!password) {
        setError('Lösenord är obligatoriskt');
        setIsLoading(false);
        return;
      }

      // Anropa login från AuthContext
      await auth.login(email, password);

      // Vi behöver inte manuellt navigate här - se kommentar nedan
      // Login sparar roles i auth-state, och vi använder den för att
      // bestämma redirect i en useEffect eller direkt efter login
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ett oväntat fel uppstod. Försök igen.');
      }
    }
  };

  // Om redan inloggad -> redirect baserat på roll
  if (auth.accessToken && !auth.isLoading) {
    if (auth.isAdmin) {
      navigate('/admin', { replace: true });
    } else {
      navigate('/mealplan', { replace: true });
    }
    return null;
  }

  const from = location.state?.from?.pathname;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">Logga in</CardTitle>
          <CardDescription>
            Ange dina autentiseringsuppgifter för att komma åt programmet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-post</Label>
              <Input
                id="email"
                type="email"
                placeholder="din.email@exempel.se"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Lösenord</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loggar in...
                </>
              ) : (
                'Logga in'
              )}
            </Button>
          </form>

          {from && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Du behöver logga in för att komma åt denna sida
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
