import React, { createContext, useContext, useMemo, useState } from "react";
import { login as loginApi, logout as logoutApi } from "./AuthService";

type AuthContextValue = {
  accessToken: string | null;
  roles: string[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const [roles, setRoles] = useState<string[]>(() => {
    const raw = localStorage.getItem("roles");
    return raw ? JSON.parse(raw) : [];
  });

  const [isLoading, setIsLoading] = useState(false);

  async function login(email: string, password: string) {
    setIsLoading(true);
    try {
      const result = await loginApi(email, password);
      setAccessToken(result.accessToken);
      setRoles(result.roles ?? []);
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    // Remove from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("roles");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    // Clear state
    setAccessToken(null);
    setRoles([]);
    // If you store email/userId in state, clear them here as well
  }

  const value = useMemo(
    () => ({
      accessToken,
      roles,
      isLoading,
      login,
      logout,
    }),
    [accessToken, roles, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
