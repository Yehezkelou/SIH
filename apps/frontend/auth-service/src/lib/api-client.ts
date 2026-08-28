import axios from "axios";
import { env } from "@/config/env";

export const apiClient = axios.create({
    baseURL : env.API_URL,
    headers : {
        'Content-Type' : "application/json"
    },
    withCredentials : true
})


// intercepteur pour ajouter les token 
apiClient.interceptors.request.use((config) => {

    return config
})

// intercepteur pour les erreur 
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {

        return Promise.reject(error)
    }
)




