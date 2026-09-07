// ===== Types RBAC & Gestion des Rôles =====

export type PermissionAction =
    | 'CREATE'
    | 'READ'
    | 'UPDATE'
    | 'DELETE'
    | 'MANAGE'
    | 'EXPORT'
    | 'APPROVE';

export interface Permission {
    id: string;
    code: string;
    ressource: string;
    action: PermissionAction | string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface RolePermission {
    id: string;
    roleId: string;
    permissionId: string;
    permission?: Permission;
    grantedAt?: string;
    grantedBy?: string;
}

export interface Role {
    id: string;
    code: string;
    libelle: string;
    description?: string;
    isSystem: boolean;
    rolePermissions?: RolePermission[];
    userRoles?: { id: string; userId: string }[];
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateRoleInput {
    code: string;
    libelle: string;
    description?: string;
    permissionIds?: string[];
}

export interface UpdateRoleInput {
    id: string;
    libelle?: string;
    description?: string;
    permissionIds?: string[];
}

// Groupement des permissions par pôle hospitalier pour la matrice d'affichage
export interface DomainPermissionGroup {
    domainKey: string;
    label: string;
    description: string;
    iconName: string;
    permissions: Permission[];
}
