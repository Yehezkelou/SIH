import { useMutation, useQuery } from "@tanstack/react-query"
import { AssignRole, CreateAgent, DeleteAgent, GetUserById, ListAgent, RemoveRole, UpdateAgent, UpdateStatus } from "../api/api-user"


// liste des agents
export const useListAgents = () => {
    return useQuery({
        queryKey : ["ListAgent"],
        queryFn : () => ListAgent(),
        staleTime :5 * 60 * 1000,
        retry : 1
    })
}

// recuperer un utilisateur
export const useGetAgent = (id : string) => {
    return useQuery({
        queryKey : ["Agent", id],
        queryFn : () => GetUserById(id),
        staleTime : 5 * 60 * 1000,
        retry : 1
    })
}

// creer un agent 
export const useCreateAgent = () => {
    return useMutation({
        mutationKey : ["create-agent"],
        mutationFn : CreateAgent,
    })
}

//update un agent 
export const useUpdateAgent = () => {
    return useMutation({
        mutationKey : ["update-agent"],
        mutationFn : UpdateAgent,
    })
}

// update status 
export const useStatusAgent = () => {
    return useMutation({
        mutationKey : [""],
        mutationFn : UpdateStatus
    })
}

// asssigne role 
export const userAssignRole = () => {
    return useMutation({
        mutationKey : [""],
        mutationFn : AssignRole
    })
}

// remove role 
export const useRomoveRole = (id : string , roleId : string) => {
    return useMutation({
        mutationKey : ["remove-role"],
        mutationFn : () => RemoveRole(id, roleId)
    })
}

// delete user 
export const deleteAgent = (id : string) => {
    return useMutation({
        mutationKey : ["delete-user"],
        mutationFn : () => DeleteAgent(id)
    })
}


