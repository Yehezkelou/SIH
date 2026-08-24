// action atomique sur une ressource
export enum PermissionAction {
    CREATE = "CREATE",
    READ = "READ",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    MANAGE = "MANAGE",
    EXPORT = "EXPORT",
    APPROVE = "APPROVE",
}

export interface ISystemPermission {
    code: string;
    ressource: string;
    action: PermissionAction;
    description: string;
}

export interface ISystemRole {
    code: string;
    libelle: string;
    description: string;
    permissions: string[];
}

// definition de toutes les permissions du SIH
export const SYSTEM_PERMISSIONS: ISystemPermission[] = [
    // patient
    { code: "patient:CREATE", ressource: "patient", action: PermissionAction.CREATE, description: "Créer un dossier patient" },
    { code: "patient:READ", ressource: "patient", action: PermissionAction.READ, description: "Consulter un dossier patient" },
    { code: "patient:UPDATE", ressource: "patient", action: PermissionAction.UPDATE, description: "Modifier un dossier patient" },
    { code: "patient:DELETE", ressource: "patient", action: PermissionAction.DELETE, description: "Archiver un dossier patient" },
    { code: "patient:EXPORT", ressource: "patient", action: PermissionAction.EXPORT, description: "Exporter les données patient" },

    // admission
    { code: "admission:CREATE", ressource: "admission", action: PermissionAction.CREATE, description: "Créer une admission" },
    { code: "admission:READ", ressource: "admission", action: PermissionAction.READ, description: "Consulter les admissions" },
    { code: "admission:UPDATE", ressource: "admission", action: PermissionAction.UPDATE, description: "Modifier une admission" },
    { code: "admission:APPROVE", ressource: "admission", action: PermissionAction.APPROVE, description: "Valider une admission" },
    { code: "admission:DELETE", ressource: "admission", action: PermissionAction.DELETE, description: "Annuler une admission" },

    // urgences
    { code: "urgency:CREATE", ressource: "urgency", action: PermissionAction.CREATE, description: "Enregistrer un passage aux urgences" },
    { code: "urgency:READ", ressource: "urgency", action: PermissionAction.READ, description: "Consulter le registre des urgences" },
    { code: "urgency:UPDATE", ressource: "urgency", action: PermissionAction.UPDATE, description: "Mettre à jour un dossier d'urgence" },
    { code: "urgency:TRIAGE", ressource: "urgency", action: PermissionAction.MANAGE, description: "Trier les patients par score de gravité" },

    // utilisateurs & personnel
    { code: "user:CREATE", ressource: "user", action: PermissionAction.CREATE, description: "Créer un compte agent" },
    { code: "user:READ", ressource: "user", action: PermissionAction.READ, description: "Consulter la liste des agents" },
    { code: "user:UPDATE", ressource: "user", action: PermissionAction.UPDATE, description: "Modifier un compte agent" },
    { code: "user:DELETE", ressource: "user", action: PermissionAction.DELETE, description: "Désactiver un compte agent" },
    { code: "user:STATUS", ressource: "user", action: PermissionAction.MANAGE, description: "Activer / Suspendre un compte agent" },

    // roles & rbac
    { code: "role:CREATE", ressource: "role", action: PermissionAction.CREATE, description: "Créer un nouveau rôle" },
    { code: "role:READ", ressource: "role", action: PermissionAction.READ, description: "Consulter les rôles et permissions" },
    { code: "role:UPDATE", ressource: "role", action: PermissionAction.UPDATE, description: "Modifier un rôle ou ses permissions" },
    { code: "role:DELETE", ressource: "role", action: PermissionAction.DELETE, description: "Supprimer un rôle non-système" },

    // audit & journaux
    { code: "audit:READ", ressource: "audit", action: PermissionAction.READ, description: "Consulter les journaux d'audit et connexions" },
    { code: "audit:EXPORT", ressource: "audit", action: PermissionAction.EXPORT, description: "Exporter les journaux d'audit" },
];

// definition des roles systeme avec leurs codes de permissions associes
export const SYSTEM_ROLES: ISystemRole[] = [
    {
        code: "SUPER_ADMIN",
        libelle: "Super Administrateur Système",
        description: "Accès absolu et total à toutes les ressources du SIH",
        permissions: ["*"], // toutes les permissions
    },
    {
        code: "ADMIN",
        libelle: "Administrateur SI",
        description: "Gestion quotidienne des comptes, de la sécurité et des audits",
        permissions: [
            "user:CREATE", "user:READ", "user:UPDATE", "user:DELETE", "user:STATUS",
            "role:READ", "role:UPDATE", "audit:READ", "audit:EXPORT", "patient:READ", "admission:READ",
        ],
    },
    {
        code: "ROLE_MEDECIN",
        libelle: "Médecin Praticien",
        description: "Consultation et mise à jour des dossiers médicaux, prescriptions et urgences",
        permissions: [
            "patient:READ", "patient:UPDATE", "patient:EXPORT",
            "admission:READ", "admission:UPDATE",
            "urgency:CREATE", "urgency:READ", "urgency:UPDATE",
        ],
    },
    {
        code: "ROLE_AGENT_ADMISSION",
        libelle: "Agent d'admission",
        description: "Création de dossiers patients et gestion des entrées / sorties",
        permissions: [
            "patient:CREATE", "patient:READ", "patient:UPDATE",
            "admission:CREATE", "admission:READ", "admission:UPDATE", "admission:APPROVE",
        ],
    },
    {
        code: "ROLE_INFIRMIER",
        libelle: "Infirmier(ère)",
        description: "Suivi des soins, constantes, admissions et triage des urgences",
        permissions: [
            "patient:READ", "admission:READ", "urgency:READ", "urgency:TRIAGE",
        ],
    },
    {
        code: "ROLE_CAISSIER",
        libelle: "Agent de Caisse / Facturation",
        description: "Consultation des admissions et des informations de facturation",
        permissions: ["patient:READ", "admission:READ"],
    },
];
