import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add authentication token to requests
api.interceptors.request.use(
  (config) => {
    // Get tokens from localStorage
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('userToken');
    
    // Add appropriate token based on route
    if (adminToken && config.url?.includes('/admin/')) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    } else if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('userToken');
      window.location.href = '/role-selection';
    }
    
    // Handle 403 Forbidden - Insufficient permissions
    if (error.response?.status === 403) {
      console.error('Access forbidden');
      // You can show a toast notification here
    }
    
    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found');
    }
    
    // Handle 500 Internal Server Error
    if (error.response?.status >= 500) {
      console.error('Server error occurred');
      // You can show a toast notification here
    }
    
    return Promise.reject(error);
  }
);

export default api;