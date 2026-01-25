import React, { createContext, useContext, useMemo, useState } from "react";
import { login as loginApi } from "./AuthService";

type AuthContextValue = {
  accessToken: string | null;
  userId: string | null;
  email: string | null;
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

  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );

  const [email, setEmail] = useState<string | null>(
    localStorage.getItem("email")
  );

  const [roles, setRoles] = useState<string[]>(() => {
    const raw = localStorage.getItem("roles");
    return raw ? JSON.parse(raw) : [];
  });

  const [isLoading, setIsLoading] = useState(false);

  async function login(loginEmail: string, password: string) {
    setIsLoading(true);
    try {
      const result = await loginApi(loginEmail, password);
      setAccessToken(result.accessToken);
      setUserId(result.userId);
      setEmail(result.email);
      setRoles(result.roles ?? []);
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("roles");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setAccessToken(null);
    setUserId(null);
    setEmail(null);
    setRoles([]);
  }

  const value = useMemo(
    () => ({
      accessToken,
      userId,
      email,
      roles,
      isLoading,
      login,
      logout,
    }),
    [accessToken, userId, email, roles, isLoading]
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
