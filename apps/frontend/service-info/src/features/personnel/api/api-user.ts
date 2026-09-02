import { apiClient } from "@/lib/api-client";
import { AgentInput, AgentStatusUpdateInput, AgentUpdateInput, AssingRolesInput, QueryUsersParams, ResponseAssignRoles, ResponseCreateAgent, ResponseDeleteAgent, ResponseGetAgentById, ResponseGetAgents, ResponseRemoveRole, ResponseUpdateAgent, ResponseUpdateStatus } from "../schema";


// create agent
export  async function CreateAgent(payload: AgentInput) : Promise<ResponseCreateAgent>{
    const response = await apiClient.post("auth/users/", payload)
    return response.data
}

// update agent
export async function UpdateAgent(payload: AgentUpdateInput): Promise<ResponseUpdateAgent>{
    const response = await apiClient.post(`auth/users/${payload.id}`, payload)
    return response.data
}

// update status agent
export async function UpdateStatus(payload : AgentStatusUpdateInput): Promise<ResponseUpdateStatus>{
    const response = await apiClient.put(`auth/users/${payload.id}/status`, payload)
    return response.data
}

// attribution de role 
export async function AssignRole(payload: AssingRolesInput): Promise<ResponseAssignRoles>{
    const response = await apiClient.post(`auth/users/${payload.id}/roles`, payload)
    return response.data
}

// revocation d'un role 
export async function RemoveRole(id : string, roleId: string): Promise<ResponseRemoveRole>{
    const response = await apiClient.delete(`auth/users/${id}/roles/${roleId}`)
    return response.data
}

// delete user 
export async function DeleteAgent(id : string): Promise<ResponseDeleteAgent>{
    const response = await apiClient.delete(`auth/users/${id}`)
    return response.data
}

//  get user by id 
export async function GetUserById(id : string): Promise<ResponseGetAgentById>{
    const response = await apiClient.get(`auth/users/${id}`)
    return response.data
}

// list agents 
export async function ListAgent(query?: QueryUsersParams): Promise<ResponseGetAgents>{
    if(!query){
        const response = await apiClient.get("auth/users")
        return response.data
    }
    const response = await apiClient.get("auth/users", {params : query})
    return response.data
}
