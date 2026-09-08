'use client'
import { useMutation} from "@tanstack/react-query"
import { LoginRequestPassword, LoginRequestPin } from "../api/api-login";
import { useRouter } from "next/navigation";
import { authStorage } from "@/lib/auth";


// Identifiant + mot de passe
export function useLoginPassword(){
    const router = useRouter();
    
    return useMutation({
        mutationFn : LoginRequestPassword,
        onSuccess: (data) => {
            if (data.mfaRequired && data.mfaToken) {
                if (typeof window !== "undefined") {
                    sessionStorage.setItem("sih_mfa_token", data.mfaToken);
                }
                router.push(`/mfa?token=${encodeURIComponent(data.mfaToken)}`);
                return;
            }

            if (data.accessToken && data.refreshToken) {
                authStorage.setSession(data.accessToken, data.refreshToken);
                window.location.href = "/";
            }
        },
        onError : (error : any) => {
            console.error(error);
        }
    });
}

// Pin 
export function useLoginPin(){
    return useMutation({
        mutationFn : LoginRequestPin,
        onSuccess: (data) => {
            if (data.accessToken && data.refreshToken) {
                authStorage.setSession(data.accessToken, data.refreshToken);
                window.location.href = "/";
            }
        },
        onError : (error : any) => {
            console.error(error)
        }
    })
}