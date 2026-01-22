export type Role = "ADMIN" | "KITCHEN" | "STAFF" | "USER";

export function getRoles(): Role[] {
  const raw = localStorage.getItem("roles");
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Role[];
  } catch {
    return [];
  }
}

export function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

export function hasRole(role: Role) {
  const roles = getRoles();
  return roles.includes("ADMIN") || roles.includes(role); // ADMIN = superuser
}
