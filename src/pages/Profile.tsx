import { useAuth } from '@/auth/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Mail, User } from 'lucide-react';

export default function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Min profil</h1>
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

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Användarinformation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">E-post</p>
                <p className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4" />
                  {auth.email}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Användar-ID</p>
                <p className="font-mono text-sm mt-1 break-all">{auth.userId}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Roller</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {auth.roles.map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Admin-status</p>
                <p className="mt-1">
                  {auth.isAdmin ? (
                    <span className="text-green-600 font-medium">✓ Admin</span>
                  ) : (
                    <span className="text-blue-600 font-medium">Vanlig användare</span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
