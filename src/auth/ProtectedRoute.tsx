import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";

type Props = {
  children: JSX.Element;
  // If set, user must have this role (ADMIN always allowed)
  requireRole?: "ADMIN" | "KITCHEN" | "STAFF" | "USER";
};

export function ProtectedRoute({ children, requireRole }: Props) {
  const auth = useAuth() as any;
  const location = useLocation();

  const token: string | null = auth?.accessToken ?? null;
  const roles: string[] = auth?.roles ?? [];

  // Not logged in -> redirect to login and remember where we came from
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Logged in but missing required role -> redirect to forbidden
  if (requireRole) {
    const hasRequiredRole = roles.includes("ADMIN") || roles.includes(requireRole);
    if (!hasRequiredRole) {
      return <Navigate to="/forbidden" replace />;
    }
  }

  return children;
}
