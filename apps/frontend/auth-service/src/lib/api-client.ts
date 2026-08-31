import axios from "axios";
import { env } from "@/config/env";
import { authStorage } from "./auth";

export const apiClient = axios.create({
    baseURL : env.API_URL,
    headers : {
        'Content-Type' : "application/json"
    },
    withCredentials: true
});

// Intercepteur pour injecter automatiquement le token Bearer dans les requêtes
apiClient.interceptors.request.use((config) => {
    const token = authStorage.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});






