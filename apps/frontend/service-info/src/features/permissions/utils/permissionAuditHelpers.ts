import {
    Permission,
    Role,
    PermissionAuditItem,
    DomainAuditGroup,
    PermissionSensitivity,
    PermissionMatrixRow,
    PermissionStats,
} from '../schema';

export const DOMAIN_METADATA: Record<string, { label: string; description: string; iconName: string }> = {
    patient: {
        label: 'Dossier Patient & Identité',
        description: 'Création, consultation et exports des identités nationales de santé (INS).',
        iconName: 'Users',
    },
    admission: {
        label: 'Admissions & Parcours de Soins',
        description: 'Gestion des entrées hospitalières, mutations et clôtures administratives.',
        iconName: 'BedDouble',
    },
    urgency: {
        label: 'Service des Urgences & Triage',
        description: 'Orientation médicale rapide, régulation SAMU et scores de gravité.',
        iconName: 'Activity',
    },
    user: {
        label: 'Gestion des Agents & Personnel',
        description: 'Comptes professionnels, statuts d’activité et fiches agents.',
        iconName: 'UserCheck',
    },
    role: {
        label: 'Sécurité & Contrôle d’Accès (RBAC)',
        description: 'Définition des rôles métiers et attribution des privilèges système.',
        iconName: 'Shield',
    },
    audit: {
        label: 'Traçabilité & Journaux d’Audit (HDS)',
        description: 'Suivi des connexions, altérations de dossiers et conformité réglementaire.',
        iconName: 'FileText',
    },
};

/**
 * Détermine le niveau de criticité opérationnelle et réglementaire d'une permission.
 */
export function determineSensitivity(code: string, action: string): PermissionSensitivity {
    const act = (action || '').toUpperCase();
    const cd = (code || '').toUpperCase();

    // Actions irréversibles ou impactant la sécurité globale
    if (act === 'DELETE' || cd.endsWith(':DELETE') || cd.includes('STATUS')) {
        return 'critical';
    }
    if (cd.startsWith('ROLE:') || cd.startsWith('AUDIT:EXPORT')) {
        return 'critical';
    }

    // Actions d'export de données sensibles ou modifications d'état
    if (act === 'EXPORT' || act === 'CREATE' || act === 'UPDATE') {
        return 'high';
    }

    if (act === 'MANAGE' || act === 'APPROVE' || cd.includes('TRIAGE')) {
        return 'medium';
    }

    return 'low';
}

/**
 * Associe les permissions aux rôles qui les détiennent pour construire la liste d'audit.
 */
export function buildPermissionAuditItems(
    permissions: Permission[],
    roles: Role[]
): PermissionAuditItem[] {
    return permissions.map((perm) => {
        // Un rôle détient la permission s'il a le rolePermission explicite ou si SUPER_ADMIN / *
        const assignedRoles = roles.filter((role) => {
            if (role.code === 'SUPER_ADMIN') return true;
            return role.rolePermissions?.some(
                (rp) => rp.permissionId === perm.id || rp.permission?.code === perm.code
            );
        });

        const assignedUsersCount = assignedRoles.reduce((sum, r) => {
            return sum + (r.userRoles?.length || 0);
        }, 0);

        return {
            ...perm,
            roles: assignedRoles,
            assignedRolesCount: assignedRoles.length,
            assignedUsersCount,
            sensitivity: determineSensitivity(perm.code, String(perm.action)),
        };
    });
}

/**
 * Regroupe les éléments d'audit par domaine métier.
 */
export function groupAuditItemsByDomain(items: PermissionAuditItem[]): DomainAuditGroup[] {
    const groupsMap = new Map<string, PermissionAuditItem[]>();

    for (const item of items) {
        const key = item.ressource?.toLowerCase() || 'general';
        if (!groupsMap.has(key)) {
            groupsMap.set(key, []);
        }
        groupsMap.get(key)!.push(item);
    }

    const domainOrder = ['patient', 'admission', 'urgency', 'user', 'role', 'audit'];
    const result: DomainAuditGroup[] = [];

    // Ajouter d'abord les domaines standards ordonnés
    for (const key of domainOrder) {
        const perms = groupsMap.get(key);
        if (perms && perms.length > 0) {
            const meta = DOMAIN_METADATA[key] || {
                label: `Pôle ${key.toUpperCase()}`,
                description: `Permissions rattachées au module ${key}.`,
                iconName: 'KeyRound',
            };
            result.push({
                domainKey: key,
                label: meta.label,
                description: meta.description,
                iconName: meta.iconName,
                permissions: perms.sort((a, b) => a.code.localeCompare(b.code)),
            });
            groupsMap.delete(key);
        }
    }

    // Ajouter les domaines résiduels éventuels
    for (const [key, perms] of groupsMap.entries()) {
        result.push({
            domainKey: key,
            label: `Module ${key}`,
            description: `Permissions spécifiques au module ${key}.`,
            iconName: 'KeyRound',
            permissions: perms.sort((a, b) => a.code.localeCompare(b.code)),
        });
    }

    return result;
}

/**
 * Construit la matrice tabulaire (Permissions en lignes, Rôles en colonnes).
 */
export function buildPermissionMatrix(
    auditItems: PermissionAuditItem[],
    roles: Role[]
): PermissionMatrixRow[] {
    return auditItems.map((item) => {
        const rolesMap: Record<string, boolean> = {};

        for (const role of roles) {
            if (role.code === 'SUPER_ADMIN') {
                rolesMap[role.id] = true;
            } else {
                const has = role.rolePermissions?.some(
                    (rp) => rp.permissionId === item.id || rp.permission?.code === item.code
                );
                rolesMap[role.id] = Boolean(has);
            }
        }

        return {
            permission: item,
            rolesMap,
        };
    });
}

/**
 * Calcule les indicateurs statistiques d'audit RBAC.
 */
export function calculatePermissionStats(
    items: PermissionAuditItem[],
    roles: Role[]
): PermissionStats {
    const domainsSet = new Set(items.map((i) => i.ressource?.toLowerCase()).filter(Boolean));
    const criticalCount = items.filter((i) => i.sensitivity === 'critical').length;
    const highCount = items.filter((i) => i.sensitivity === 'high').length;
    const orphanCount = items.filter((i) => i.assignedRolesCount === 0).length;

    return {
        totalPermissions: items.length,
        totalDomains: domainsSet.size,
        criticalCount,
        highCount,
        orphanCount,
        totalRoles: roles.length,
    };
}

/**
 * Libellé et styles graphiques des actions de permissions.
 */
export function getActionVisual(action: string): { label: string; bg: string; text: string; border: string } {
    const act = (action || '').toUpperCase();
    switch (act) {
        case 'CREATE':
            return { label: 'Création', bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20' };
        case 'READ':
            return { label: 'Lecture', bg: 'bg-sky-500/10', text: 'text-sky-500', border: 'border-sky-500/20' };
        case 'UPDATE':
            return { label: 'Modification', bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' };
        case 'DELETE':
            return { label: 'Suppression', bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/20' };
        case 'EXPORT':
            return { label: 'Export Données', bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20' };
        case 'MANAGE':
        case 'STATUS':
            return { label: 'Gestion & Statut', bg: 'bg-indigo-500/10', text: 'text-indigo-500', border: 'border-indigo-500/20' };
        default:
            return { label: act, bg: 'bg-hover/8', text: 'text-surface-text', border: 'border-border/12' };
    }
}
