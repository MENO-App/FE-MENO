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
    logoutApi();
    setAccessToken(null);
    setRoles([]);
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
