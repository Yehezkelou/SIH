import { apiClient } from "@/lib/api-client";
import { LoginTypeInput, LoginTypeInputPin, LoginTypeReponss } from "../schema";

export async function LoginRequestPassword(credentials : LoginTypeInput) : Promise<LoginTypeReponss> {
    const response = await apiClient.post<LoginTypeReponss>("/api/auth/login", credentials);
    return response.data;
}

export async function LoginRequestPin(credentials : LoginTypeInputPin) : Promise<LoginTypeReponss>{
    const response = await apiClient.post<LoginTypeReponss>("/api/auth/login-pin", credentials)
    return response.data
}
