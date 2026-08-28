import { apiClient } from "@/lib/api-client";
import { LoginTypeInput, LoginTypeReponss } from "../schema";

export async function LoginRequest(credentials : LoginTypeInput) : Promise<LoginTypeReponss> {
    const response = await apiClient.post<LoginTypeReponss>("/api/auth/login", credentials);
    return response.data;
}
