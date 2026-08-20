/**
 * Types du domaine Admission — miroir des entites du microservice
 * Admission-service (apps/backend/Admission-service/src/modules/entities).
 * Utilises uniquement par le template visuel (aucune logique reseau ici).
 */

export enum AdmissionType {
  INPATIENT = "INPATIENT",
  OUTPATIENT = "OUTPATIENT",
  EMERGENCY = "EMERGENCY",
}

export enum AdmissionStatus {
  PENDING = "PENDING",
  PRE_ADMITTED = "PRE_ADMITTED",
  REGISTERED = "REGISTERED",
  ADMITTED = "ADMITTED",
  WAIT_FOR_CAR = "WAIT_FOR_CAR",
  DISCHARGED_PENDING = "DISCHARGED_PENDING",
  DISCHARGED = "DISCHARGED",
  TRANSFERED = "TRANSFERED",
  CLOSED = "CLOSED",
  CANCELLED = "CANCELLED",
}

export enum AdmissionDocumentType {
  PIECE_IDENTIE = "PIECE_IDENTIE",
  CARTE_ASSURANCE = "CARTE_ASSURANCE",
  ORDONNANCE = "ORDONNANCE",
  AUTRE = "AUTRE",
}

export enum AdmissionPayerType {
  PATIENT = "PATIENT",
  INSURANCE = "INSURANCE",
  COMPANY = "COMPANY",
}

export enum Relationship {
  FATHER = "FATHER",
  MOTHER = "MOTHER",
  SON = "SON",
  DAUTHER = "DAUTHER",
  HUSBAND = "HUSBAND",
  WIFE = "WIFE",
  BROTHER = "BROTHER",
  SISTER = "SISTER",
  OTHER = "OTHER",
}

export interface AdmissionDocument {
  id: string;
  documentType: AdmissionDocumentType;
  fileName: string;
  size?: string;
  uploadedAt: string;
}

export interface AdmissionCompanion {
  id: string;
  fullName: string;
  relationship: Relationship;
  phone?: string;
}

export interface AdmissionPayer {
  id: string;
  payerType: AdmissionPayerType;
  name: string;
  policyNumber?: string;
  coveragePercentage?: number;
  coverageLimit?: number;
  validUntil?: string;
}

export interface Encounter {
  encounterNumber: string;
  encounterStatus: string;
  currentDepartment?: string;
  currentRoom?: string;
  currentBed?: string;
  startDate?: string;
}

export interface Admission {
  id: string;
  admissionNumber: string;
  patientId: string;
  numeroPatient: string;
  patientName: string;
  sex?: "M" | "F";
  age?: number;
  doctorName?: string;
  department?: string;
  admissionType: AdmissionType;
  admissionStatus: AdmissionStatus;
  reason?: string;
  admissionDate: string;
  expectedDischarge?: string;
  actualDischarge?: string;
  documents: AdmissionDocument[];
  companions: AdmissionCompanion[];
  payers: AdmissionPayer[];
  encounter?: Encounter;
  createdBy?: string;
}
