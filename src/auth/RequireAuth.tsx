import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

interface RequireAuthProps {
  children: ReactNode;
}

/**
 * RequireAuth - skyddar routes för inloggade användare
 * Om användaren INTE är inloggad -> redirect till /login
 */
export function RequireAuth({ children }: RequireAuthProps) {
  const auth = useAuth();

  // Visa loading state medan vi återställer auth från localStorage
  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Laddar...</p>
        </div>
      </div>
    );
  }

  // Om ingen token -> redirect till login
  if (!auth.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
