import { apiClient } from "@/lib/api-client";

export async function LogoutRequest(refreshToken : string) : Promise<{message : string}> {
    const response = await apiClient.post("/api/auth/logout", {refreshToken});
    return response.data
}