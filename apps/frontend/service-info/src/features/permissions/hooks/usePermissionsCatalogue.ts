import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ListPermissions, ListRolesWithPermissions } from '../api/api-permissions';
import {
    buildPermissionAuditItems,
    groupAuditItemsByDomain,
    buildPermissionMatrix,
    calculatePermissionStats,
} from '../utils/permissionAuditHelpers';
import { PermissionAuditItem, DomainAuditGroup, PermissionMatrixRow, PermissionStats } from '../schema';

export function usePermissionsCatalogue() {
    // 1. Requête des permissions système
    const {
        data: permissionsResponse,
        isLoading: isLoadingPermissions,
        isError: isErrorPermissions,
        error: errorPermissions,
        refetch: refetchPermissions,
        isFetching: isFetchingPermissions,
    } = useQuery({
        queryKey: ['PermissionsList'],
        queryFn: ListPermissions,
        staleTime: 10 * 60 * 1000,
    });

    // 2. Requête des rôles pour le croisement RBAC
    const {
        data: rolesResponse,
        isLoading: isLoadingRoles,
        isError: isErrorRoles,
        error: errorRoles,
        refetch: refetchRoles,
        isFetching: isFetchingRoles,
    } = useQuery({
        queryKey: ['RolesList'],
        queryFn: ListRolesWithPermissions,
        staleTime: 5 * 60 * 1000,
    });

    const rawPermissions = useMemo(() => {
        return (permissionsResponse as any)?.data ?? [];
    }, [permissionsResponse]);

    const rawRoles = useMemo(() => {
        return (rolesResponse as any)?.data ?? [];
    }, [rolesResponse]);

    // 3. Éléments enrichis avec rôles détenteurs et criticité
    const auditItems: PermissionAuditItem[] = useMemo(() => {
        return buildPermissionAuditItems(rawPermissions, rawRoles);
    }, [rawPermissions, rawRoles]);

    // 4. Groupement par pôle hospitalier
    const domainGroups: DomainAuditGroup[] = useMemo(() => {
        return groupAuditItemsByDomain(auditItems);
    }, [auditItems]);

    // 5. Lignes de la matrice tabulaire Rôles x Permissions
    const matrixRows: PermissionMatrixRow[] = useMemo(() => {
        return buildPermissionMatrix(auditItems, rawRoles);
    }, [auditItems, rawRoles]);

    // 6. Statistiques d'audit globales
    const stats: PermissionStats = useMemo(() => {
        return calculatePermissionStats(auditItems, rawRoles);
    }, [auditItems, rawRoles]);

    const isLoading = isLoadingPermissions || isLoadingRoles;
    const isError = isErrorPermissions || isErrorRoles;
    const error = errorPermissions || errorRoles;
    const isFetching = isFetchingPermissions || isFetchingRoles;

    const refetchAll = async () => {
        await Promise.all([refetchPermissions(), refetchRoles()]);
    };

    return {
        permissions: rawPermissions,
        roles: rawRoles,
        auditItems,
        domainGroups,
        matrixRows,
        stats,
        isLoading,
        isError,
        error,
        isFetching,
        refetchAll,
    };
}
