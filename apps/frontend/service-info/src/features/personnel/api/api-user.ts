import { apiClient } from "@/lib/api-client";
import {
    AgentInput,
    AgentStatusUpdateInput,
    AgentUpdateInput,
    AssingRolesInput,
    QueryUsersParams,
    ResponseAddDocument,
    ResponseAssignRoles,
    ResponseCreateAgent,
    ResponseDeleteAgent,
    ResponseGetAgentById,
    ResponseGetAgents,
    ResponseGetDocuments,
    ResponseRemoveDocument,
    ResponseRemoveRole,
    ResponseUpdateAgent,
    ResponseUpdateStatus,
    Role,
    UserDocumentType,
} from "../schema";

// create agent
export async function CreateAgent(payload: AgentInput): Promise<ResponseCreateAgent> {
    const response = await apiClient.post("/api/users", payload);
    return response.data;
}

// update agent
export async function UpdateAgent(payload: AgentUpdateInput): Promise<ResponseUpdateAgent> {
    const response = await apiClient.put(`/api/users/${payload.id}`, payload);
    return response.data;
}

// update status agent
export async function UpdateStatus(payload: AgentStatusUpdateInput): Promise<ResponseUpdateStatus> {
    const response = await apiClient.patch(`/api/users/${payload.id}/status`, payload);
    return response.data;
}

// attribution de role 
export async function AssignRole(payload: AssingRolesInput): Promise<ResponseAssignRoles> {
    const response = await apiClient.post(`/api/users/${payload.id}/roles`, payload);
    return response.data;
}

// revocation d'un role 
export async function RemoveRole(id: string, roleId: string): Promise<ResponseRemoveRole> {
    const response = await apiClient.delete(`/api/users/${id}/roles/${roleId}`);
    return response.data;
}

// delete user 
export async function DeleteAgent(id: string): Promise<ResponseDeleteAgent> {
    const response = await apiClient.delete(`/api/users/${id}`);
    return response.data;
}

// get user by id 
export async function GetUserById(id: string): Promise<ResponseGetAgentById> {
    const response = await apiClient.get(`/api/users/${id}`);
    return response.data;
}

// list agents 
export async function ListAgent(query?: QueryUsersParams): Promise<ResponseGetAgents> {
    if (!query) {
        const response = await apiClient.get("/api/users");
        return response.data;
    }
    const response = await apiClient.get("/api/users", { params: query });
    return response.data;
}

// list roles
export async function ListRoles(): Promise<{ data: Role[]; status: number; timeStamp: string }> {
    const response = await apiClient.get("/api/users/roles");
    return response.data;
}

// upload document justificatif
export async function UploadUserDocument(
    userId: string,
    file: File,
    documentType: UserDocumentType,
    numeroDocument?: string,
    dateDelivrance?: string,
    dateExpiration?: string
): Promise<ResponseAddDocument> {
    const formData = new FormData();
    formData.append("document", file);
    formData.append("documentType", documentType);
    if (numeroDocument) formData.append("numeroDocument", numeroDocument);
    if (dateDelivrance) formData.append("dateDelivrance", dateDelivrance);
    if (dateExpiration) formData.append("dateExpiration", dateExpiration);

    const response = await apiClient.post(`/api/users/${userId}/documents`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

// list documents of an agent
export async function GetUserDocuments(userId: string): Promise<ResponseGetDocuments> {
    const response = await apiClient.get(`/api/users/${userId}/documents`);
    return response.data;
}

// delete document
export async function DeleteUserDocument(userId: string, docId: string): Promise<ResponseRemoveDocument> {
    const response = await apiClient.delete(`/api/users/${userId}/documents/${docId}`);
    return response.data;
}
