export type personnelType = 
  | 'MEDECIN'
  | 'INFIRMIER'
  | 'AIDE_SOIGNANT'
  | 'SAGE_FEMME'
  | 'AGENT_ADMISSION'
  | 'SECRETAIRE_MEDICALE'
  | 'PHARMACIEN'
  | 'TECHNICIEN_LABO'
  | 'BRANCARDIER'
  | 'CAISSIER'
  | 'ADMIN'
  | 'SUPER_ADMIN'
  | 'AUTRE';

export type UserStatus = 
  | 'EN_ATTENTE_ACTIVATION'
  | 'ACTIF'
  | 'INACTIF'
  | 'SUSPENDU'
  | 'VERROUILLE';

export type Genre = 'M' | 'F';

export type MfaMethod = 'NONE' | 'TOTP' | 'EMAIL' | 'SMS';

// Types de documents justificatifs RH hospitaliers
export type UserDocumentType = 
  | 'CNI'
  | 'PASSEPORT'
  | 'CARTE_SEJOUR'
  | 'DIPLOME'
  | 'CARTE_PROFESSIONNELLE'
  | 'CASIER_JUDICIAIRE'
  | 'CONTRAT_TRAVAIL'
  | 'AUTRE';

export const USER_DOCUMENT_TYPES: { value: UserDocumentType; label: string; description: string }[] = [
  { value: 'CNI', label: "Carte Nationale d'Identité (CNI)", description: 'Pièce d’identité officielle en cours de validité' },
  { value: 'PASSEPORT', label: 'Passeport', description: 'Passeport national ou international' },
  { value: 'CARTE_SEJOUR', label: 'Titre / Carte de séjour', description: 'Autorisation de séjour et travail' },
  { value: 'DIPLOME', label: 'Diplôme d’état médical / paramédical', description: 'Attestation de réussite ou diplôme officiel' },
  { value: 'CARTE_PROFESSIONNELLE', label: 'Carte Professionnelle (CPS / RPPS)', description: 'Inscription au tableau de l’ordre / carte CPS' },
  { value: 'CASIER_JUDICIAIRE', label: 'Extrait de Casier Judiciaire (B3)', description: 'Bulletin n°3 vierge datant de moins de 3 mois' },
  { value: 'CONTRAT_TRAVAIL', label: 'Contrat de Travail / Affectation', description: 'Contrat signé ou arrêté d’affectation hospitalière' },
  { value: 'AUTRE', label: 'Autre document justificatif', description: 'Attestation, certificat ou annexe' },
];

export interface PendingDocument {
  id: string;
  file: File;
  documentType: UserDocumentType;
  numeroDocument?: string;
  dateDelivrance?: string;
  dateExpiration?: string;
}

// ===== Entités associées =====

export interface Permission {
    id: string;
    code: string;
    ressource: string;
    action: string;
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
    createdAt?: string;
    updatedAt?: string;
}

export interface UserRole {
    id: string;
    userId: string;
    roleId: string;
    role?: Role;
    expiresAt?: string | null;
    assignedAt: string;
    assignedBy?: string | null;
}

export interface AgentUser {
    id: string;
    matricule: string;
    nom: string;
    prenom: string;
    genre?: Genre | string;
    email: string;
    telephone?: string;
    personnelType: personnelType;
    serviceAffectation?: string;
    specialite?: string;
    numeroOrdre?: string;
    status: UserStatus;
    mustChangePassword?: boolean;
    mfaEnabled?: boolean;
    mfaMethod?: MfaMethod;
    pinEnabled?: boolean;
    failedLoginAttempts?: number;
    failedPinAttempts?: number;
    lockedUntil?: string | null;
    pinLockedUntil?: string | null;
    lastLoginAt?: string | null;
    lastLoginIp?: string | null;
    passwordChangedAt?: string | null;
    userRoles?: UserRole[];
    isConnected?: boolean;
    activeSessionsCount?: number;
    createdAt: string;
    updatedAt: string;
    createdBy?: string | null;
    updatedBy?: string | null;
    deletedAt?: string | null;
    deletedBy?: string | null;
}

// Alias de commodité
export type Agent = AgentUser;

export interface AgentDocument {
    id: string;
    userId: string;
    documentType: string;
    numeroDocument?: string;
    nomFichier: string;
    cheminFichier: string;
    mimeType: string;
    tailleFichier: number;
    dateDelivrance?: string | null;
    dateExpiration?: string | null;
    createdAt: string;
    updatedAt?: string;
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

// requetes
export interface AgentInput {
    nom: string;
    prenom: string;
    email: string;
    matricule: string;
    personnelType: personnelType;
    roleIds: string[];
    genre?: Genre | string;
    telephone?: string;
    serviceAffectation?: string;
    specialite?: string;
    numeroOrdre?: string;
    tempPassword?: string;
}

export interface AgentUpdateInput {
    id: string;
    nom?: string;
    prenom?: string;
    email?: string;
    matricule?: string;
    personnelType?: personnelType;
    roleIds?: string[];
    genre?: Genre | string;
    telephone?: string;
    serviceAffectation?: string;
    specialite?: string;
    numeroOrdre?: string;
    update?: Partial<AgentInput>;
}

export interface AgentStatusUpdateInput {
    id: string;
    status: UserStatus;
    motif?: string;
}

export interface AssingRolesInput {
    id: string;
    roleIds: string[];
    expiresAt?: Date | string;
}

export interface QueryUsersParams {
    search?: string;
    personnelType?: personnelType;
    status?: UserStatus;
    serviceAffectation?: string;
    roleId?: string;
    isConnected?: boolean;
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'nom' | 'matricule' | 'lastLoginAt';
    sortOrder?: 'ASC' | 'DESC';
}


// reponses api
// POST /api/users - Création d'un agent
export interface ResponseCreateAgent {
    message: string;
    status: number;
    timeStamp: string;
    user: AgentUser;
    temporaryPassword?: string;
}

// GET /api/users - Liste paginée avec filtres
export interface ResponseGetAgents {
    data: AgentUser[];
    meta: PaginationMeta;
    status: number;
    timeStamp: string;
}

// GET /api/users/:id - Fiche détaillée d'un agent
export interface ResponseGetAgentById {
    user: AgentUser;
    status: number;
    timeStamp: string;
}

// PUT /api/users/:id - Modification d'un agent
export interface ResponseUpdateAgent {
    message: string;
    status: number;
    timeStamp: string;
    user: AgentUser;
}

// PATCH /api/users/:id/status - Activation ou suspension
export interface ResponseUpdateAgentStatus {
    message: string;
    status: number;
    timeStamp: string;
    user: AgentUser;
}
export type ResponseUpdateStatus = ResponseUpdateAgentStatus;

// POST /api/users/:id/roles - Attribution de rôles
export interface ResponseAssignRoles {
    message: string;
    status: number;
    timeStamp: string;
    user: AgentUser;
}

// DELETE /api/users/:id/roles/:roleId - Révocation d'un rôle
export interface ResponseRemoveRole {
    message: string;
    status: number;
    timeStamp: string;
    user: AgentUser;
}

// DELETE /api/users/:id - Suppression douce
export interface ResponseDeleteAgent {
    message: string;
    status: number;
    timeStamp: string;
}

// Documents justificatifs
export interface ResponseAddDocument {
    message: string;
    status: number;
    timeStamp: string;
    document: AgentDocument;
}

export interface ResponseGetDocuments {
    documents: AgentDocument[];
    status: number;
    timeStamp: string;
}

export interface ResponseRemoveDocument {
    message: string;
    status: number;
    timeStamp: string;
}