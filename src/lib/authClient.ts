import axios from 'axios';

const API_BASE_URL = 'https://localhost:7292';

// Create axios instance
const authClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add request interceptor to include auth header
authClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors (e.g., 401 -> redirect to login)
authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth and redirect to login
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
      localStorage.removeItem('roles');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default authClient;
