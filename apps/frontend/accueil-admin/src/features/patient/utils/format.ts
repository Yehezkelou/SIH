import { BadgeTone } from "@/components/ui/Badge";
import { AlertNiveau, AlertStatus, Genre, MotifProvisoire, StatusDossier } from "../types";

export const genreLabel: Record<Genre, string> = { M: "Masculin", F: "Féminin" };

export const statusDossierLabel: Record<StatusDossier, string> = {
  [StatusDossier.PROVISOIRE]: "Provisoire",
  [StatusDossier.DEFINITIF]: "Définitif",
};

export const statusDossierTone: Record<StatusDossier, BadgeTone> = {
  [StatusDossier.PROVISOIRE]: "amber",
  [StatusDossier.DEFINITIF]: "emerald",
};

export const motifProvisoireLabel: Record<MotifProvisoire, string> = {
  [MotifProvisoire.URGENCE_VITAL]: "Urgence vitale",
  [MotifProvisoire.PATIENT_INCONSCIENT]: "Patient inconscient",
  [MotifProvisoire.IDENTITE_INCONNUE]: "Identité inconnue",
  [MotifProvisoire.MINEUR_NON_ACCOMPAGNE]: "Mineur non accompagné",
  [MotifProvisoire.PANNE_SYSTEME]: "Panne système",
  [MotifProvisoire.AUTRE]: "Autre",
};

export const alertNiveauLabel: Record<AlertNiveau, string> = {
  [AlertNiveau.MODEREE]: "Modérée",
  [AlertNiveau.FORTE]: "Forte",
};

export const alertNiveauTone: Record<AlertNiveau, BadgeTone> = {
  [AlertNiveau.MODEREE]: "amber",
  [AlertNiveau.FORTE]: "rose",
};

export const alertStatusLabel: Record<AlertStatus, string> = {
  [AlertStatus.EN_ATTENTE]: "En attente",
  [AlertStatus.CONFIRMEE_FUSION]: "Fusion confirmée",
  [AlertStatus.IGNOREE]: "Ignorée",
  [AlertStatus.FAUX_POSITIF]: "Faux positif",
};

export const alertStatusTone: Record<AlertStatus, BadgeTone> = {
  [AlertStatus.EN_ATTENTE]: "sky",
  [AlertStatus.CONFIRMEE_FUSION]: "emerald",
  [AlertStatus.IGNOREE]: "slate",
  [AlertStatus.FAUX_POSITIF]: "slate",
};

export const matchedFieldLabel: Record<string, string> = {
  nom: "Nom",
  prenom: "Prénom",
  dateNaissance: "Date de naissance",
  lieuNaissance: "Lieu de naissance",
  nomPere: "Nom du père",
  nomMere: "Nom de la mère",
  numero: "Téléphone",
  numSecuSocial: "N° sécurité sociale",
  genre: "Genre",
};

export const toOptions = <T extends string>(labels: Record<T, string>) =>
  (Object.keys(labels) as T[]).map((value) => ({ value, label: labels[value] }));

export const formatDate = (iso?: string) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
};

export const initials = (nom: string, prenom: string) =>
  `${prenom?.[0] ?? ""}${nom?.[0] ?? ""}`.toUpperCase();

export const scoreTone = (score: number): BadgeTone =>
  score >= 85 ? "rose" : score >= 70 ? "amber" : "slate";
