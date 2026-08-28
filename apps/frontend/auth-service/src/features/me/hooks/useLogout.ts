import { useRouter } from "next/navigation";
import { LogoutRequest } from "../api/api-logout";
import { authStorage } from "@/lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export function useLogout(){
    const router = useRouter()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : async () =>  {
            const refreshToken = authStorage.getRefreshToken();
            if(refreshToken){
                await LogoutRequest(refreshToken);
            }
        },
        onSuccess : () => {
            authStorage.removeSession()
            queryClient.clear();
            router.push("/login")
        },
        onError: (error) => {
            console.error("Erreur de déconnexion backend, nettoyage local forcé :", error)

            authStorage.removeSession();
            queryClient.clear();
            router.push("/login");
        }
    })
}