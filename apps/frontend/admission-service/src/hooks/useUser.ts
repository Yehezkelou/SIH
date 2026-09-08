import { apiClient } from "@/lib/api-client";
import { CurrentUser, MeResponse } from "@/types/type";
import { useQuery } from "@tanstack/react-query";





export async function fetchMe(): Promise<CurrentUser>{
    const response = await apiClient.get<MeResponse>("/api/auth/me");
    return response.data.user
}

export const useUser = () => {
    return useQuery({
        queryFn : fetchMe,
        queryKey: ["user"],
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1, // Only retry once on failure
        refetchOnWindowFocus: false, // Don't refetch when window regains focus
    })
}