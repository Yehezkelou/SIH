import React from "react";
import { Badge } from "@/components/ui/Badge";
import { AdmissionStatus, AdmissionType } from "../types";
import { admissionStatusLabel, admissionStatusTone, admissionTypeLabel, admissionTypeTone } from "../utils/format";

export const AdmissionStatusBadge = ({ status }: { status: AdmissionStatus }) => (
  <Badge tone={admissionStatusTone[status]} dot>
    {admissionStatusLabel[status]}
  </Badge>
);

export const AdmissionTypeBadge = ({ type }: { type: AdmissionType }) => (
  <Badge tone={admissionTypeTone[type]}>{admissionTypeLabel[type]}</Badge>
);
