import { apiClient } from "@/lib/api-client";
import { MeType } from "../schema";

export async function GetMeRequest(): Promise<MeType> {
    const response = await apiClient.get<MeType>("/api/auth/me")
    return response.data;
}