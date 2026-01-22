import axios from 'axios';

/**
 * API Client med axios
 * - baseURL från environment
 * - Request interceptor: lägg till Authorization-header med Bearer token
 * - Response interceptor: hantera 401 (logout + /login) och 403 (/unauthorized)
 */

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

/**
 * Request interceptor - lägg till Authorization-header om vi har en token
 */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Response interceptor - hantera auth-relaterade fel
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 Unauthorized - token är ogiltig/utgången
    if (error.response?.status === 401) {
      // Rensa auth från localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
      localStorage.removeItem('roles');

      // Redirect till login
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // 403 Forbidden - användaren har inte behörighet
    if (error.response?.status === 403) {
      window.location.href = '/unauthorized';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
