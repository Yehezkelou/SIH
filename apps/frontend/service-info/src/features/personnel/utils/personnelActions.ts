import { AgentUser, UserStatus } from '../schema';

/**
 * Catalogue des actions possibles sur un agent.
 *
 * Chaque action porte la permission exigée par l'Auth-Service, relevée
 * directement sur les décorateurs `@RequirePermissions` du contrôleur. Les
 * garder ici évite qu'un bouton promette une action que l'API refusera.
 *
 *   GET    /users/:id                    user:READ
 *   PUT    /users/:id                    user:UPDATE
 *   PATCH  /users/:id/status             user:STATUS
 *   POST   /users/:id/roles              role:UPDATE
 *   DELETE /users/:id/roles/:roleId      role:UPDATE
 *   DELETE /users/:id                    user:DELETE
 *   GET    /users/:id/documents          user:READ
 *   POST   /users/:id/documents          user:UPDATE
 *   DELETE /users/:id/documents/:docId   user:UPDATE
 */
export const PERSONNEL_PERMISSIONS = {
    READ: 'user:READ',
    UPDATE: 'user:UPDATE',
    STATUS: 'user:STATUS',
    DELETE: 'user:DELETE',
    MANAGE_ROLES: 'role:UPDATE',
} as const;

export interface StatusTransition {
    target: UserStatus;
    label: string;
    /** Formulation à la première personne, affichée dans la confirmation. */
    description: string;
    tone: 'default' | 'danger';
    /** Un motif est-il attendu par l'établissement pour cette transition ? */
    requiresMotif: boolean;
}

const REACTIVATE: StatusTransition = {
    target: 'ACTIF',
    label: 'Réactiver le compte',
    description: "L'agent retrouve l'accès complet au système.",
    tone: 'default',
    requiresMotif: false,
};

const SUSPEND: StatusTransition = {
    target: 'SUSPENDU',
    label: 'Suspendre le compte',
    description: "L'agent ne pourra plus se connecter jusqu'à réactivation.",
    tone: 'danger',
    requiresMotif: true,
};

const DEACTIVATE: StatusTransition = {
    target: 'INACTIF',
    label: 'Désactiver le compte',
    description: 'Compte mis hors service, typiquement après un départ.',
    tone: 'danger',
    requiresMotif: true,
};

/**
 * Transitions de statut proposées depuis l'état courant.
 *
 * On ne propose jamais la transition vers l'état déjà en cours, ni
 * `VERROUILLE` : ce statut est posé par le système après des échecs
 * d'authentification répétés, pas à la main.
 */
export function getStatusTransitions(status: UserStatus): StatusTransition[] {
    switch (status) {
        case 'ACTIF':
            return [SUSPEND, DEACTIVATE];

        case 'SUSPENDU':
            return [REACTIVATE, DEACTIVATE];

        case 'INACTIF':
            return [REACTIVATE];

        case 'VERROUILLE':
            return [
                {
                    ...REACTIVATE,
                    label: 'Déverrouiller le compte',
                    description:
                        'Lève le verrouillage consécutif aux échecs de connexion et réactive l’accès.',
                },
                DEACTIVATE,
            ];

        case 'EN_ATTENTE_ACTIVATION':
            return [
                {
                    ...REACTIVATE,
                    label: 'Activer le compte',
                    description: "Valide le compte et autorise la première connexion de l'agent.",
                },
                DEACTIVATE,
            ];

        default:
            return [];
    }
}

/** `true` si le compte est verrouillé et que le déverrouillage est encore à venir. */
export function isLockActive(agent: AgentUser): boolean {
    if (!agent.lockedUntil) return false;
    return new Date(agent.lockedUntil).getTime() > Date.now();
}

const PERSONNEL_TYPE_LABELS: Record<string, string> = {
    MEDECIN: 'Médecin',
    INFIRMIER: 'Infirmier(ère)',
    AIDE_SOIGNANT: 'Aide-soignant(e)',
    SAGE_FEMME: 'Sage-femme',
    AGENT_ADMISSION: "Agent d'admission",
    SECRETAIRE_MEDICALE: 'Secrétaire médicale',
    PHARMACIEN: 'Pharmacien(ne)',
    TECHNICIEN_LABO: 'Technicien labo',
    BRANCARDIER: 'Brancardier',
    CAISSIER: 'Caissier(ère)',
    ADMIN: 'Administrateur',
    SUPER_ADMIN: 'Super Admin',
    AUTRE: 'Autre',
};

export function formatPersonnelType(type: string): string {
    return PERSONNEL_TYPE_LABELS[type] || type;
}

export function formatStatusLabel(status: UserStatus): string {
    switch (status) {
        case 'ACTIF':
            return 'Actif';
        case 'EN_ATTENTE_ACTIVATION':
            return 'En attente';
        case 'SUSPENDU':
            return 'Suspendu';
        case 'VERROUILLE':
            return 'Verrouillé';
        case 'INACTIF':
            return 'Inactif';
        default:
            return status;
    }
}

/** Date lisible, ou un repli explicite plutôt qu'une case vide. */
export function formatDateTime(value?: string | null, fallback = 'Jamais'): string {
    if (!value) return fallback;
    try {
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(value));
    } catch {
        return 'Date invalide';
    }
}

export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`;
}
