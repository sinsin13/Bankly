import axios from 'axios';

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7244/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request interceptor – attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor – handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Token expired / invalid
      localStorage.clear();
      window.location.href = '/role-selection';
    }

    if (status === 403) {
      console.error('Forbidden: insufficient permissions');
    }

    if (status >= 500) {
      console.error('Server error');
    }

    return Promise.reject(error);
  }
);

export default api;
