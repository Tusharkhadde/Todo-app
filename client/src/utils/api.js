import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://todo-app-17h6.onrender.com/api';

if (!import.meta.env.VITE_API_URL) {
  console.warn('[API] VITE_API_URL is not set. Falling back to:', API_BASE_URL);
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
