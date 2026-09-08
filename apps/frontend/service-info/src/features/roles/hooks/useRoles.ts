import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    ListRoles,
    ListPermissions,
    CreateRole,
    UpdateRole,
    DeleteRole,
} from '../api/api-roles';
import { CreateRoleInput, UpdateRoleInput } from '../schema';

// 1. Hook pour récupérer tous les rôles
export const useGetRoles = () => {
    return useQuery({
        queryKey: ['RolesList'],
        queryFn: ListRoles,
        staleTime: 5 * 60 * 1000,
    });
};

// 2. Hook pour récupérer toutes les permissions du système
export const useGetPermissions = () => {
    return useQuery({
        queryKey: ['PermissionsList'],
        queryFn: ListPermissions,
        staleTime: 10 * 60 * 1000,
    });
};

// 3. Hook de création d'un rôle
export const useCreateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['create-role'],
        mutationFn: (payload: CreateRoleInput) => CreateRole(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['RolesList'] });
            queryClient.invalidateQueries({ queryKey: ['Roles'] }); // pour la sélection dans PersonnelForm
        },
    });
};

// 4. Hook de modification d'un rôle
export const useUpdateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['update-role'],
        mutationFn: (payload: UpdateRoleInput) => UpdateRole(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['RolesList'] });
            queryClient.invalidateQueries({ queryKey: ['Roles'] });
        },
    });
};

// 5. Hook de suppression d'un rôle
export const useDeleteRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['delete-role'],
        mutationFn: (id: string) => DeleteRole(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['RolesList'] });
            queryClient.invalidateQueries({ queryKey: ['Roles'] });
        },
    });
};
