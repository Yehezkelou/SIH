import { BadgeTone } from "@/components/ui/Badge";
import {
  AdmissionDocumentType,
  AdmissionPayerType,
  AdmissionStatus,
  AdmissionType,
  Relationship,
} from "../types";

/* --------------------------- Libelles (FR) -------------------------------- */

export const admissionTypeLabel: Record<AdmissionType, string> = {
  [AdmissionType.INPATIENT]: "Hospitalisation",
  [AdmissionType.OUTPATIENT]: "Ambulatoire",
  [AdmissionType.EMERGENCY]: "Urgence",
};

export const admissionStatusLabel: Record<AdmissionStatus, string> = {
  [AdmissionStatus.PENDING]: "En attente",
  [AdmissionStatus.PRE_ADMITTED]: "Pré-admis",
  [AdmissionStatus.REGISTERED]: "Enregistré",
  [AdmissionStatus.ADMITTED]: "Admis",
  [AdmissionStatus.WAIT_FOR_CAR]: "Attente transport",
  [AdmissionStatus.DISCHARGED_PENDING]: "Sortie en cours",
  [AdmissionStatus.DISCHARGED]: "Sorti",
  [AdmissionStatus.TRANSFERED]: "Transféré",
  [AdmissionStatus.CLOSED]: "Clôturé",
  [AdmissionStatus.CANCELLED]: "Annulé",
};

export const payerTypeLabel: Record<AdmissionPayerType, string> = {
  [AdmissionPayerType.PATIENT]: "Patient",
  [AdmissionPayerType.INSURANCE]: "Assurance",
  [AdmissionPayerType.COMPANY]: "Entreprise",
};

export const documentTypeLabel: Record<AdmissionDocumentType, string> = {
  [AdmissionDocumentType.PIECE_IDENTIE]: "Pièce d'identité",
  [AdmissionDocumentType.CARTE_ASSURANCE]: "Carte d'assurance",
  [AdmissionDocumentType.ORDONNANCE]: "Ordonnance",
  [AdmissionDocumentType.AUTRE]: "Autre",
};

export const relationshipLabel: Record<Relationship, string> = {
  [Relationship.FATHER]: "Père",
  [Relationship.MOTHER]: "Mère",
  [Relationship.SON]: "Fils",
  [Relationship.DAUTHER]: "Fille",
  [Relationship.HUSBAND]: "Époux",
  [Relationship.WIFE]: "Épouse",
  [Relationship.BROTHER]: "Frère",
  [Relationship.SISTER]: "Sœur",
  [Relationship.OTHER]: "Autre",
};

/* ----------------------------- Couleurs ----------------------------------- */

export const admissionStatusTone: Record<AdmissionStatus, BadgeTone> = {
  [AdmissionStatus.PENDING]: "amber",
  [AdmissionStatus.PRE_ADMITTED]: "sky",
  [AdmissionStatus.REGISTERED]: "indigo",
  [AdmissionStatus.ADMITTED]: "emerald",
  [AdmissionStatus.WAIT_FOR_CAR]: "amber",
  [AdmissionStatus.DISCHARGED_PENDING]: "violet",
  [AdmissionStatus.DISCHARGED]: "slate",
  [AdmissionStatus.TRANSFERED]: "sky",
  [AdmissionStatus.CLOSED]: "slate",
  [AdmissionStatus.CANCELLED]: "rose",
};

export const admissionTypeTone: Record<AdmissionType, BadgeTone> = {
  [AdmissionType.INPATIENT]: "indigo",
  [AdmissionType.OUTPATIENT]: "sky",
  [AdmissionType.EMERGENCY]: "rose",
};

/* --------------------------- Helpers d'options ---------------------------- */

export const toOptions = <T extends string>(labels: Record<T, string>) =>
  (Object.keys(labels) as T[]).map((value) => ({ value, label: labels[value] }));

/* ------------------------------ Formatage --------------------------------- */

export const formatDate = (iso?: string) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
};

export const formatDateTime = (iso?: string) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
