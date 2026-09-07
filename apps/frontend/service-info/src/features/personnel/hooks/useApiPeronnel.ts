import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    AssignRole,
    CreateAgent,
    DeleteAgent,
    DeleteUserDocument,
    GetUserById,
    GetUserDocuments,
    ListAgent,
    ListRoles,
    RemoveRole,
    UpdateAgent,
    UpdateStatus,
    UploadUserDocument,
} from "../api/api-user";
import { QueryUsersParams, UserDocumentType } from "../schema";

// liste des agents
export const useListAgents = (query?: QueryUsersParams) => {
    return useQuery({
        queryKey: ["ListAgent", query],
        queryFn: () => ListAgent(query),
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
};

// liste de tous les rôles disponibles
export const useGetRoles = () => {
    return useQuery({
        queryKey: ["Roles"],
        queryFn: ListRoles,
        staleTime: 10 * 60 * 1000,
    });
};

// recuperer un utilisateur
export const useGetAgent = (id: string) => {
    return useQuery({
        queryKey: ["Agent", id],
        queryFn: () => GetUserById(id),
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
};

// creer un agent 
export const useCreateAgent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["create-agent"],
        mutationFn: CreateAgent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ListAgent"] });
        },
    });
};

// update un agent 
export const useUpdateAgent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["update-agent"],
        mutationFn: UpdateAgent,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["ListAgent"] });
            queryClient.invalidateQueries({ queryKey: ["Agent", variables.id] });
        },
    });
};

// update status 
export const useStatusAgent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["update-status-agent"],
        mutationFn: UpdateStatus,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["ListAgent"] });
            queryClient.invalidateQueries({ queryKey: ["Agent", variables.id] });
        },
    });
};

// asssigne role 
export const userAssignRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["assign-role"],
        mutationFn: AssignRole,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["Agent", variables.id] });
        },
    });
};

// remove role 
export const useRemoveRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["remove-role"],
        mutationFn: ({ id, roleId }: { id: string; roleId: string }) => RemoveRole(id, roleId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["Agent", variables.id] });
        },
    });
};

// delete user 
export const useDeleteAgent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["delete-user"],
        mutationFn: (id: string) => DeleteAgent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ListAgent"] });
        },
    });
};

// get documents of an agent
export const useGetUserDocuments = (userId: string) => {
    return useQuery({
        queryKey: ["AgentDocuments", userId],
        queryFn: () => GetUserDocuments(userId),
        enabled: Boolean(userId),
        staleTime: 5 * 60 * 1000,
    });
};

// upload document for an agent
export const useUploadUserDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["upload-document"],
        mutationFn: ({
            userId,
            file,
            documentType,
            numeroDocument,
            dateDelivrance,
            dateExpiration,
        }: {
            userId: string;
            file: File;
            documentType: UserDocumentType;
            numeroDocument?: string;
            dateDelivrance?: string;
            dateExpiration?: string;
        }) =>
            UploadUserDocument(
                userId,
                file,
                documentType,
                numeroDocument,
                dateDelivrance,
                dateExpiration
            ),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["AgentDocuments", variables.userId] });
            queryClient.invalidateQueries({ queryKey: ["Agent", variables.userId] });
        },
    });
};

// delete document of an agent
export const useDeleteUserDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["delete-document"],
        mutationFn: ({ userId, documentId }: { userId: string; documentId: string }) =>
            DeleteUserDocument(userId, documentId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["AgentDocuments", variables.userId] });
        },
    });
};
