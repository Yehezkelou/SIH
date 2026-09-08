// Contrat de données du module Admissions (venues / séjours).
// Miroir fidèle des validators Zod du Admission-Service.

// ===== Énumérations =====

export type AdmissionStatus =
    | 'PENDING'
    | 'PRE_ADMITTED'
    | 'REGISTERED'
    | 'ADMITTED'
    | 'DISCHARGED_PENDING'
    | 'DISCHARGED'
    | 'TRANSFERED'
    | 'CANCELLED'
    | 'CLOSED';

export type AdmissionType = 'INPATIENT' | 'OUTPATIENT' | 'EMERGENCY';

export type AdmissionPayerType = 'PATIENT' | 'INSURANCE' | 'COMPANY';

export type AdmissionDocumentType =
    | 'PIECE_IDENTIE'
    | 'CARTE_ASSURANCE'
    | 'ORDONNANCE'
    | 'AUTRE';

export type Relationship =
    | 'FATHER'
    | 'MOTHER'
    | 'SON'
    | 'DAUTHER'
    | 'HUSBAND'
    | 'WIFE'
    | 'BROTHER'
    | 'SISTER'
    | 'OTHER';

export type MovementType = 'ADMISSION' | 'TRANSFER' | 'DISCHARGE';

export type EncounterStatus =
    | 'ENCOUNTER_PENDING'
    | 'ENCOUNTER_ADMITTED'
    | 'ENCOUNTER_DISCHARGED'
    | 'ENCOUNTER_CANCELLED'
    | 'ENCOUNTER_PRE_ADMITTED'
    | 'ENCOUNTER_REGISTERED'
    | 'ENCOUNTER_CLOSED'
    | 'ENCOUNTER_DISCHARGED_PENDING'
    | 'ENCOUNTER_TRANSFERED';

// ===== Entités =====

export interface AdmissionCompanion {
    id: string;
    admissionId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    relationship: Relationship;
    address: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AdmissionPayer {
    id: string;
    admissionId: string;
    name: string;
    payerType: AdmissionPayerType;
    policyNumber: string;
    coveragePercentage: number;
    coverageLimit?: number;
    validUntil?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AdmissionDocument {
    id: string;
    admissionId: string;
    documentType: AdmissionDocumentType;
    documentName?: string;
    documentUrl?: string;
    documentExtension?: string;
    documentSize?: number;
    attachedAt?: string;
    createdAt?: string;
}

export interface EncounterMovement {
    id: string;
    encounterId: string;
    encounterNumber?: string;
    movementType: MovementType;
    fromDepartmentId?: string;
    fromRoomId?: string;
    fromBedId?: string;
    toDepartmentId?: string;
    toRoomId?: string;
    toBedId?: string;
    movementDate?: string;
    movementBy?: string;
    reason?: string;
    createdAt?: string;
}

export interface Encounter {
    id: string;
    patientId: string;
    numeroPatient: string;
    admissionId: string;
    encounterNumber?: string;
    encounterStatus: EncounterStatus;
    currentDepartmentId?: string;
    currentRoomId?: string;
    currentBedId?: string;
    startDate?: string;
    endDate?: string;
    movements?: EncounterMovement[];
    createdAt?: string;
    updatedAt?: string;
}

export interface Admission {
    id: string;
    patientId: string;
    numeroPatient: string;
    admissionNumber: string;
    doctorId?: string | null;
    admissionType: AdmissionType;
    admissionStatus: AdmissionStatus;
    reason?: string | null;
    admissionDate?: string | null;
    expectedDischarge?: string | null;
    actualDischarge?: string | null;

    createdAt: string;
    updatedAt: string;
    createdBy?: string | null;
    updatedBy?: string | null;

    // Relations (chargées par le service : détail et recherche).
    encounters?: Encounter | null;
    companions?: AdmissionCompanion[];
    payers?: AdmissionPayer[];
    documents?: AdmissionDocument[];
}

// ===== Entrées =====

export interface CompanionDraft {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    relationship: Relationship;
    address: string;
}

export interface PayerDraft {
    name: string;
    payerType: AdmissionPayerType;
    policyNumber: string;
    coveragePercentage: number;
    coverageLimit: number;
    validUntil: string;
}

// POST /api/admission — les blocs companions/payers/encouter sont optionnels.
// Attention : le backend orthographie « encouter » / « encouterStatus ».
export interface CreateAdmissionInput {
    patientId: string;
    numeroPatient: string;
    admission: {
        doctorId?: string;
        admissionType: AdmissionType;
        admissionStatus?: AdmissionStatus;
        reason?: string;
        admissionDate?: string;
        expectedDischarge?: string;
    };
    companions?: CompanionDraft[];
    payers?: PayerDraft[];
    encouter?: {
        encouterStatus: EncounterStatus;
        currentDepartementId?: string;
        currentRoomId?: string;
        currentBedId?: string;
    };
    createdBy: string;
}

export interface AdmissionQueryParams {
    patientId?: string;
    numeroPatient?: string;
    admissionNumber?: string;
    doctorId?: string;
    admissionStatus?: AdmissionStatus;
    admissionType?: AdmissionType;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}

export interface UpdateAdmissionStatusInput {
    admissionId: string;
    numeroAdmission: string;
    patientId?: string;
    numeroPatient?: string;
    newStatus: AdmissionStatus;
    reason?: string;
    updatedBy: string;
}

export interface DischargePatientInput {
    admissionId: string;
    numeroAdmission: string;
    patientId?: string;
    numeroPatient?: string;
    encounterId?: string;
    encounterNumber?: string;
    reason?: string;
    dischargedBy: string;
}

export interface CancelAdmissionInput {
    admissionId: string;
    numeroAdmission: string;
    patientId?: string;
    numeroPatient?: string;
    reason: string;
    cancelledBy: string;
}

export interface SoftDeleteAdmissionInput {
    admissionId: string;
    numeroAdmission?: string;
    patientId?: string;
    numeroPatient?: string;
    deletedBy: string;
}

// --- Accompagnants ---
export interface AddCompanionInput extends CompanionDraft {
    admissionId: string;
    numeroAdmission: string;
    patientId: string;
    numeroPatient: string;
    createdBy: string;
}

export interface UpdateCompanionInput extends Partial<CompanionDraft> {
    companionId: string;
    admissionId: string;
    updatedBy: string;
}

export interface RemoveCompanionInput {
    companionId: string;
    admissionId: string;
    deletedBy: string;
}

// --- Payeurs ---
export interface AddPayerInput extends PayerDraft {
    admissionId: string;
    numeroAdmission: string;
    patientId: string;
    numeroPatient: string;
    createdBy: string;
}

export interface UpdatePayerInput extends Partial<PayerDraft> {
    payerId: string;
    admissionId: string;
    updatedBy: string;
}

export interface RemovePayerInput {
    payerId: string;
    admissionId: string;
    deletedBy: string;
}

// --- Documents ---
export interface AddDocumentInput {
    admissionId: string;
    numeroAdmission: string;
    patientId: string;
    numeroPatient: string;
    documentType: AdmissionDocumentType;
    documentName?: string;
    createdBy: string;
    file: File;
}

export interface RemoveDocumentInput {
    documentId: string;
    admissionId: string;
    deletedBy: string;
}

// --- Mouvements ---
export interface CreateMovementInput {
    encounterId: string;
    encounterNumber: string;
    admissionId: string;
    admissionNumber: string;
    patientId: string;
    numeroPatient: string;
    movementType: MovementType;
    toDepartmentId?: string;
    toRoomId?: string;
    toBedId?: string;
    reason?: string;
    movementBy: string;
}

// ===== Réponses =====

export interface AdmissionListMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface AdmissionSearchResponse {
    message: string;
    data: Admission[];
    meta: AdmissionListMeta;
}

export interface AdmissionSearchOutcome {
    admissions: Admission[];
    meta: AdmissionListMeta;
}

export type { ParsedApiError } from './utils/parseApiError';
