'use client'
import { useMutation} from "@tanstack/react-query"
import { LoginRequest } from "../api/api-login";
import { useRouter } from "next/navigation";
import { authStorage } from "@/lib/auth";


export function useLogin (){
    const router = useRouter();

    return useMutation({
        mutationFn : LoginRequest,
        onSuccess: (data) => {
            authStorage.setSession(data.accessToken, data.refreshToken)
            router.push("/")
        },
        onError : (error : any) => {
            console.error(error)
        }
    })
}