import { apiClient } from '@/lib/api-client';
import { Permission, Role } from '../schema';

export interface ResponseListPermissions {
    data: Permission[];
    status: number;
    timeStamp: string;
}

export interface ResponseListRoles {
    data: Role[];
    status: number;
    timeStamp: string;
}

/**
 * 1. Récupère la liste de toutes les permissions déclarées par le système.
 */
export async function ListPermissions(): Promise<ResponseListPermissions> {
    const response = await apiClient.get('/api/users/permissions');
    return response.data;
}

/**
 * 2. Récupère la liste de tous les rôles avec leurs liaisons d'habilitations.
 */
export async function ListRolesWithPermissions(): Promise<ResponseListRoles> {
    const response = await apiClient.get('/api/users/roles');
    return response.data;
}
