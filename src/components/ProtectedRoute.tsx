import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRoles } from '@/lib/authHelpers';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

/**
 * ProtectedRoute component - redirects to login if not authenticated
 * Optionally checks if user has required roles
 */
export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && requiredRoles.length > 0) {
    const userRoles = getUserRoles();
    const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));
    if (!hasRequiredRole) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
