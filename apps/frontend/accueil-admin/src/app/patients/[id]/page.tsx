import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { getPatientById } from "@/features/patient/api/mock";
import { PatientDetail, PatientSummaryBanner } from "@/features/patient/components/PatientDetail";
import { StatusDossier } from "@/features/patient/types";

export default async function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const patient = getPatientById(id);
  const isProvisoire = patient.statusDossier === StatusDossier.PROVISOIRE;

  return (
    <>
      <PageHeader
        title="Fiche patient"
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Patients", href: "/patients" }, { label: patient.uniquePatientId }]}
        actions={
          <>
            {isProvisoire && (
              <Button size="sm" leftIcon="userCheck">Régulariser</Button>
            )}
            <Button variant="outline" size="sm" leftIcon="settings">Modifier</Button>
          </>
        }
      />
      <PatientSummaryBanner patient={patient} />
      <PatientDetail patient={patient} />
    </>
  );
}
