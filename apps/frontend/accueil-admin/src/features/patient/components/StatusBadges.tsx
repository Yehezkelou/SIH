import React from "react";
import { Badge } from "@/components/ui/Badge";
import { AlertNiveau, AlertStatus, StatusDossier } from "../types";
import {
  alertNiveauLabel,
  alertNiveauTone,
  alertStatusLabel,
  alertStatusTone,
  scoreTone,
  statusDossierLabel,
  statusDossierTone,
} from "../utils/format";

export const PatientStatusBadge = ({ status }: { status: StatusDossier }) => (
  <Badge tone={statusDossierTone[status]} dot>
    {statusDossierLabel[status]}
  </Badge>
);

export const AlertNiveauBadge = ({ niveau }: { niveau: AlertNiveau }) => (
  <Badge tone={alertNiveauTone[niveau]}>{alertNiveauLabel[niveau]}</Badge>
);

export const AlertStatusBadge = ({ status }: { status: AlertStatus }) => (
  <Badge tone={alertStatusTone[status]} dot>
    {alertStatusLabel[status]}
  </Badge>
);

export const ScoreBadge = ({ score }: { score: number }) => (
  <Badge tone={scoreTone(score)}>{score}%</Badge>
);
