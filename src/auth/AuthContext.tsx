import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';

/**
 * AuthState innehåller användares autentiserings- och auktoriseringsinformation
 * Rollen hämtas från API-responsen (response.roles), INTE från JWT claims
 */
export interface AuthState {
  accessToken: string | null;
  userId: string | null;
  email: string | null;
  roles: string[];
  isAdmin: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  restoreAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    userId: null,
    email: null,
    roles: [],
    isAdmin: false,
    isLoading: true, // Startar i loading-state för att återställa från localStorage
  });

  /**
   * Återställer auth-state från localStorage vid app-start
   * Visa loading state medan vi kontrollerar om användaren har en sparad session
   */
  const restoreAuth = useCallback(async () => {
    try {
      const storedToken = localStorage.getItem('accessToken');
      const storedUserId = localStorage.getItem('userId');
      const storedEmail = localStorage.getItem('email');
      const storedRoles = localStorage.getItem('roles');

      if (storedToken && storedUserId && storedEmail && storedRoles) {
        const parsedRoles = JSON.parse(storedRoles);
        setAuthState({
          accessToken: storedToken,
          userId: storedUserId,
          email: storedEmail,
          roles: parsedRoles,
          isAdmin: parsedRoles.includes('ADMIN'),
          isLoading: false,
        });
      } else {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Fel vid återställning av auth:', error);
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  /**
   * Sätt auth-state och spara i localStorage
   * Kallas efter lyckad login
   */
  const setAuthData = (
    accessToken: string,
    userId: string,
    email: string,
    roles: string[]
  ) => {
    const isAdmin = roles.includes('ADMIN');

    // Spara i localStorage för persistens mellan sessioner
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', userId);
    localStorage.setItem('email', email);
    localStorage.setItem('roles', JSON.stringify(roles));

    setAuthState({
      accessToken,
      userId,
      email,
      roles,
      isAdmin,
      isLoading: false,
    });
  };

  /**
   * Login-funktion
   * Anropar backend, sparar auth-data, uppdaterar state
   */
  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({
        ...prev,
        isLoading: true,
      }));

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 'Login misslyckades. Försök igen.'
        );
      }

      const data = await response.json();
      const { accessToken, userId, email: userEmail, roles } = data;

      setAuthData(accessToken, userId, userEmail, roles);
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
      throw error;
    }
  };

  /**
   * Logout-funktion
   * Rensa state och localStorage
   */
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('roles');

    setAuthState({
      accessToken: null,
      userId: null,
      email: null,
      roles: [],
      isAdmin: false,
      isLoading: false,
    });
  };

  /**
   * Återställ auth från localStorage när appen startas
   */
  useEffect(() => {
    restoreAuth();
  }, [restoreAuth]);

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    restoreAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
