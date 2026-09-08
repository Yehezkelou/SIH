import { Permission, Role, PermissionAction } from '@/features/roles/schema';

export type { Permission, Role, PermissionAction };

export type PermissionSensitivity = 'critical' | 'high' | 'medium' | 'low';

export interface PermissionAuditItem extends Permission {
    roles: Role[];
    assignedRolesCount: number;
    assignedUsersCount: number;
    sensitivity: PermissionSensitivity;
}

export interface DomainAuditGroup {
    domainKey: string;
    label: string;
    description: string;
    iconName: string;
    permissions: PermissionAuditItem[];
}

export interface PermissionMatrixRow {
    permission: PermissionAuditItem;
    // Map roleId -> boolean (détient ou non la permission)
    rolesMap: Record<string, boolean>;
}

export interface PermissionStats {
    totalPermissions: number;
    totalDomains: number;
    criticalCount: number;
    highCount: number;
    orphanCount: number; // Permissions attribuées à 0 rôle
    totalRoles: number;
}

export type PermissionViewMode = 'catalogue' | 'matrix';

export interface PermissionFilterState {
    search: string;
    domain: string;
    action: string;
    onlyCritical: boolean;
    onlyOrphan: boolean;
    viewMode: PermissionViewMode;
}
