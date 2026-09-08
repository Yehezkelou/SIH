import axios from 'axios';
import { env } from '@/config/env';
import Cookies from "js-cookie"

export const apiClient = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("auth-token-cookie");
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
