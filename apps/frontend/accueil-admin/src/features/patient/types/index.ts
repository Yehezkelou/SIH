/**
 * Types du domaine Patient (MPI — Master Patient Index).
 * Miroir des entités du microservice Patient-Identity-Service
 * (apps/backend/Patient-Identity-Service/src/modules/patient/entities).
 */

export type Genre = "M" | "F";

export enum StatusDossier {
  PROVISOIRE = "PROVISOIRE",
  DEFINITIF = "DEFINITIF",
}

export enum MotifProvisoire {
  URGENCE_VITAL = "URGENCE_VITAL",
  PATIENT_INCONSCIENT = "PATIENT_INCONSCIENT",
  IDENTITE_INCONNUE = "IDENTITE_INCONNUE",
  MINEUR_NON_ACCOMPAGNE = "MINEUR_NON_ACCOMPAGNE",
  PANNE_SYSTEME = "PANNE_SYSTEME",
  AUTRE = "AUTRE",
}

export enum AlertNiveau {
  MODEREE = "MODEREE",
  FORTE = "FORTE",
}

export enum AlertStatus {
  EN_ATTENTE = "EN_ATTENTE",
  CONFIRMEE_FUSION = "CONFIRMEE_FUSION",
  IGNOREE = "IGNOREE",
  FAUX_POSITIF = "FAUX_POSITIF",
}

export interface ArchivDossier {
  id: string;
  name: string;
  typeDoc: string;
  extension?: string;
  size?: string;
  description?: string;
  date: string;
}

export interface Patient {
  id: string;
  uniquePatientId: string;
  mergeIntoPatientId?: string;

  // identité civile
  nom: string;
  prenom: string;
  age: number;
  genre: Genre;
  dateNaissance?: string;
  lieuNaissance?: string;

  // filiation
  nomPere?: string;
  nomMere?: string;
  tuteur?: string;
  numeroPere?: string;
  numeroMere?: string;
  numeroTuteur?: string;

  // contact
  email?: string;
  numero?: string;
  numeroSecondaire?: string;
  contactUrgence?: string;

  // identifiants uniques
  numSecuSocial?: string;
  numIdentityNational?: string;
  numeroPassport?: string;
  numCMU?: string;

  // dossier provisoire
  statusDossier: StatusDossier;
  motifDossierProvisoire?: MotifProvisoire;
  serviceCreation?: string;

  // documents archivés
  archivDossier?: ArchivDossier[];

  createdAt?: string;
  updatedAt?: string;
}

export interface MatchedField {
  field: string;
  score: number;
}

export interface SimilarityAlert {
  id: string;
  patientAId: string;
  patientBId: string;
  numeroDossierA: string;
  numeroDossierB: string;
  patientAName: string;
  patientBName: string;
  score: number;
  niveau: AlertNiveau;
  matchedFields: MatchedField[];
  status: AlertStatus;
  detectedAt: string;
}
