import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

interface RequireRoleProps {
  requiredRole: string;
  children: ReactNode;
}

/**
 * RequireRole - skyddar routes för specifika roller
 * Om användaren INTE har den krävda rollen -> redirect till /unauthorized
 */
export function RequireRole({ requiredRole, children }: RequireRoleProps) {
  const auth = useAuth();

  // Om användaren inte har den krävda rollen -> /unauthorized
  if (!auth.roles.includes(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
