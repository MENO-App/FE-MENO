import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";

type Role = "ADMIN" | "KITCHEN" | "STAFF" | "STUDENT";

type Props = {
  children: JSX.Element;
  requireRole?: Role;
};

export function ProtectedRoute({ children, requireRole }: Props) {
  const auth = useAuth();
  const location = useLocation();

  const token = auth.accessToken;
  const roles = auth.roles;

  // Not logged in -> redirect to login and remember where we came from
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ADMIN can access all protected routes
  if (roles.includes("ADMIN")) {
    return children;
  }

  // If requireRole is set and user does not have it, redirect to forbidden
  if (requireRole && !roles.includes(requireRole)) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}
