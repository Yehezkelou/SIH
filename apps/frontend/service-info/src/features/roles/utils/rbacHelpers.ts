import { Permission, DomainPermissionGroup } from '../schema';

export const DOMAIN_CONFIG: Record<string, { label: string; description: string; iconName: string }> = {
    patient: {
        label: 'Dossiers Patients',
        description: 'Création, consultation et mise à jour des données médicales',
        iconName: 'HeartPulse',
    },
    admission: {
        label: 'Admissions & Lits',
        description: 'Gestion des entrées, des séjours et validation administrative',
        iconName: 'BedDouble',
    },
    urgency: {
        label: 'Service des Urgences',
        description: 'Triage de gravité, admissions d’urgence et transferts',
        iconName: 'Flame',
    },
    user: {
        label: 'Personnel & Soignants',
        description: 'Comptes utilisateurs, affectations de service et accès',
        iconName: 'Users',
    },
    role: {
        label: 'Rôles & Habilitations',
        description: 'Gouvernance RBAC et attribution des droits système',
        iconName: 'ShieldCheck',
    },
    audit: {
        label: 'Sécurité & Audit',
        description: 'Journaux d’événements, traçabilité et exports légaux',
        iconName: 'Activity',
    },
};

/**
 * Regroupe une liste plate de permissions par pôle hospitalier
 */
export function groupPermissionsByDomain(permissions: Permission[]): DomainPermissionGroup[] {
    const map = new Map<string, Permission[]>();

    for (const perm of permissions) {
        const key = perm.ressource.toLowerCase();
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.push(perm);
    }

    const groups: DomainPermissionGroup[] = [];

    // Ajouter les domaines configurés dans l'ordre
    for (const [domainKey, config] of Object.entries(DOMAIN_CONFIG)) {
        if (map.has(domainKey)) {
            groups.push({
                domainKey,
                label: config.label,
                description: config.description,
                iconName: config.iconName,
                permissions: map.get(domainKey)!,
            });
            map.delete(domainKey);
        }
    }

    // Ajouter d'éventuels autres domaines personnalisés non listés
    for (const [extraKey, perms] of map.entries()) {
        groups.push({
            domainKey: extraKey,
            label: extraKey.charAt(0).toUpperCase() + extraKey.slice(1),
            description: `Droits relatifs à la ressource ${extraKey}`,
            iconName: 'Key',
            permissions: perms,
        });
    }

    return groups;
}

/**
 * Formate le nom de l'action en libellé français compréhensible
 */
export function formatActionLabel(action: string): string {
    switch (action.toUpperCase()) {
        case 'CREATE':
            return 'Créer';
        case 'READ':
            return 'Consulter';
        case 'UPDATE':
            return 'Modifier';
        case 'DELETE':
            return 'Supprimer';
        case 'MANAGE':
            return 'Gérer / Trier';
        case 'EXPORT':
            return 'Exporter';
        case 'APPROVE':
            return 'Valider';
        default:
            return action;
    }
}
