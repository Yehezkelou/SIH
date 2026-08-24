// ===== Type de personnel (métier) =====
// Catégorise l'agent dans l'organisation hospitalière.
export enum PersonnelType {
    MEDECIN = "MEDECIN",
    INFIRMIER = "INFIRMIER",
    AIDE_SOIGNANT = "AIDE_SOIGNANT",
    SAGE_FEMME = "SAGE_FEMME",
    AGENT_ADMISSION = "AGENT_ADMISSION",
    SECRETAIRE_MEDICALE = "SECRETAIRE_MEDICALE",
    PHARMACIEN = "PHARMACIEN",
    TECHNICIEN_LABO = "TECHNICIEN_LABO",
    BRANCARDIER = "BRANCARDIER",
    CAISSIER = "CAISSIER",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
    AUTRE = "AUTRE",
}

// ===== Statut du compte =====
// Cycle de vie du compte utilisateur (indépendant des rôles).
export enum UserStatus {
    EN_ATTENTE_ACTIVATION = "EN_ATTENTE_ACTIVATION", // créé, mot de passe pas encore défini
    ACTIF = "ACTIF",
    INACTIF = "INACTIF",     // désactivé volontairement (départ, congé long)
    SUSPENDU = "SUSPENDU",   // suspendu par un administrateur
    VERROUILLE = "VERROUILLE", // verrouillé automatiquement (trop d'échecs de connexion)
}

// ===== Genre / civilité =====
export enum Genre {
    M = "M",
    F = "F",
}

// ===== Méthode d'authentification à double facteur =====
export enum MfaMethod {
    NONE = "NONE",
    TOTP = "TOTP",   // application d'authentification (Google Authenticator...)
    EMAIL = "EMAIL",
    SMS = "SMS",
}

// ===== Action d'une permission (verbe) =====
// Combinée à une ressource, forme le code de permission (ex: patient:READ).
export enum PermissionAction {
    CREATE = "CREATE",
    READ = "READ",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    MANAGE = "MANAGE", // couvre toutes les actions sur la ressource
    EXPORT = "EXPORT",
    APPROVE = "APPROVE",
}

// ===== Action d'historisation (table user_history) =====
export enum HistoryAction {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
}

// ===== Résultat d'une tentative de connexion (journal d'audit) =====
export enum LoginAttemptStatus {
    SUCCESS = "SUCCESS",
    FAILED_USER_NOT_FOUND = "FAILED_USER_NOT_FOUND",
    FAILED_BAD_PASSWORD = "FAILED_BAD_PASSWORD",
    FAILED_ACCOUNT_LOCKED = "FAILED_ACCOUNT_LOCKED",
    FAILED_ACCOUNT_INACTIVE = "FAILED_ACCOUNT_INACTIVE",
    FAILED_MFA = "FAILED_MFA",
    LOGOUT = "LOGOUT",
}

// ===== Types de documents justificatifs du personnel hospitalier =====
export enum UserDocumentType {
    CNI = "CNI",                                 // Carte Nationale d'Identité
    PASSEPORT = "PASSEPORT",                     // Passeport
    CARTE_SEJOUR = "CARTE_SEJOUR",               // Titre / Carte de séjour
    DIPLOME = "DIPLOME",                         // Diplôme d'état (Médecin, Infirmier...)
    CARTE_PROFESSIONNELLE = "CARTE_PROFESSIONNELLE", // Carte RPPS / Ordre / CPS
    CASIER_JUDICIAIRE = "CASIER_JUDICIAIRE",     // Extrait de casier judiciaire (B3)
    CONTRAT_TRAVAIL = "CONTRAT_TRAVAIL",         // Contrat de travail / Convention
    AUTRE = "AUTRE",
}
