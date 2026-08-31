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
            authStorage.setSession(data.accessToken, data.refreshToken)
            router.push("/")
        },
        onError : (error : any) => {
            console.error(error)
        }
    })
}

// Pin 
export function useLoginPin(){
    const router = useRouter()

    return useMutation({
        mutationFn : LoginRequestPin,
        onSuccess: (data) => {
            authStorage.setSession(data.accessToken, data.refreshToken)
            router.push("/")
        },
        onError : (error : any) => {
            console.error(error)
        }
    })
}