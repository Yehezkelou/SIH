import axios from 'axios';
import { env } from '@/config/env';

export const apiClient = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Intercepteur requête : injection du token (à brancher à la session).
apiClient.interceptors.request.use((config) => {
  return config;
});

// Intercepteur réponse : gestion centralisée des erreurs / refresh sur 401.
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);
