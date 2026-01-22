/**
 * Get Authorization header with Bearer token
 * @returns Authorization header object or empty object if no token
 */
export function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
}

/**
 * Get stored auth data from localStorage
 */
export function getStoredAuth() {
  return {
    accessToken: localStorage.getItem('accessToken'),
    userId: localStorage.getItem('userId'),
    email: localStorage.getItem('email'),
    roles: localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles') || '[]') : [],
  };
}

/**
 * Clear all auth data from localStorage
 */
export function clearAuth() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('email');
  localStorage.removeItem('roles');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('accessToken');
}

/**
 * Get user roles from localStorage
 */
export function getUserRoles(): string[] {
  const roles = localStorage.getItem('roles');
  if (!roles) return [];
  try {
    return JSON.parse(roles);
  } catch {
    return [];
  }
}
