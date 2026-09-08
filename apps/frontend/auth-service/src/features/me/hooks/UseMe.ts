import { useQuery } from "@tanstack/react-query";
import { GetMeRequest } from "../api/api-me";




export function useMe(){
    return useQuery({
        queryKey : ['me'],
        queryFn : GetMeRequest,
        retry : 2,
    })
}