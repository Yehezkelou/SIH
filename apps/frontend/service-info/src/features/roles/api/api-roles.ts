import { apiClient } from '@/lib/api-client';
import { Role, Permission, CreateRoleInput, UpdateRoleInput } from '../schema';

export interface ResponseListRoles {
    data: Role[];
    status: number;
    timeStamp: string;
}

export interface ResponseListPermissions {
    data: Permission[];
    status: number;
    timeStamp: string;
}

export interface ResponseRoleMutation {
    message: string;
    role?: Role;
    status: number;
    timeStamp: string;
}

// 1. Liste de tous les rôles
export async function ListRoles(): Promise<ResponseListRoles> {
    const response = await apiClient.get('/api/users/roles');
    return response.data;
}

// 2. Liste de toutes les permissions système
export async function ListPermissions(): Promise<ResponseListPermissions> {
    const response = await apiClient.get('/api/users/permissions');
    return response.data;
}

// 3. Création d'un rôle personnalisé
export async function CreateRole(payload: CreateRoleInput): Promise<ResponseRoleMutation> {
    const response = await apiClient.post('/api/users/roles', payload);
    return response.data;
}

// 4. Modification d'un rôle
export async function UpdateRole(payload: UpdateRoleInput): Promise<ResponseRoleMutation> {
    const { id, ...body } = payload;
    const response = await apiClient.put(`/api/users/roles/${id}`, body);
    return response.data;
}

// 5. Suppression d'un rôle (impossible si isSystem)
export async function DeleteRole(id: string): Promise<{ message: string; status: number }> {
    const response = await apiClient.delete(`/api/users/roles/${id}`);
    return response.data;
}
