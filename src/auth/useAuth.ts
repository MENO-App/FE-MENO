import { useContext } from 'react';
import { AuthContext } from './AuthContext';

/**
 * useAuth hook - använd överallt för att komma åt auth-state
 * Kastar error om inte inuti AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth måste användas inuti AuthProvider');
  }
  return context;
}
