import { useMutation } from "@tanstack/react-query"
import { SetupMfa } from "../api/api-mfa"


export const useSetupMfa = () => {
    return useMutation({
        mutationFn : SetupMfa,
        onSuccess : () => {

        }, 
        onError : () => {

        }
    })
}