interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  userId: string;
  email: string;
  roles: string[];
}

interface RegisterRequest {
  email: string;
  password: string;
}

interface RegisterResponse {
  userId: string;
  email: string;
}

const API_BASE_URL = 'https://localhost:7292';

/**
 * Authenticate user with email and password
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      } as LoginRequest),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle specific status codes
      if (response.status === 401 || response.status === 400) {
        throw new Error('Invalid email or password');
      }
      
      throw new Error(errorData.message || 'Login failed');
    }

    const data: LoginResponse = await response.json();

    // Store auth data in localStorage
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('email', data.email);
    localStorage.setItem('roles', JSON.stringify(data.roles));

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred during login');
  }
}

/**
 * Register a new user
 */
export async function register(email: string, password: string): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      } as RegisterRequest),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle specific status codes
      if (response.status === 409) {
        throw new Error('Email already registered. Please log in or use a different email.');
      }
      if (response.status === 400) {
        throw new Error(errorData.message || 'Password does not meet requirements');
      }
      
      throw new Error(errorData.message || 'Registration failed');
    }

    const data: RegisterResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred during registration');
  }
}

/**
 * Logout user - clear auth data
 */
export function logout(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('email');
  localStorage.removeItem('roles');
}

/**
 * Get redirect path based on user roles
 */
export function getRedirectPath(roles: string[]): string {
  if (roles.includes('ADMIN')) {
    return '/admin';
  }
  if (roles.includes('KITCHEN')) {
    return '/kitchen';
  }
  return '/dashboard';
}
