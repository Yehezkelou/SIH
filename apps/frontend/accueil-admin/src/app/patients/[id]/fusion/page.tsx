import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { getPatientById, mockPatients } from "@/features/patient/api/mock";
import { MergeView } from "@/features/patient/components/MergeView";

export default async function FusionPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ with?: string }>;
}) {
  const { id } = await params;
  const { with: withId } = await searchParams;

  const patientA = getPatientById(id);
  // à défaut de cible fournie, on prend un autre dossier pour la démo
  const patientB = getPatientById(withId ?? mockPatients.find((p) => p.id !== id)?.id ?? id);

  return (
    <>
      <PageHeader
        title="Fusion de dossiers"
        description="Rapprochement de deux dossiers identifiés comme doublons."
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Patients", href: "/patients" },
          { label: "Doublons", href: "/patients/doublons" },
          { label: "Fusion" },
        ]}
      />
      <MergeView patientA={patientA} patientB={patientB} />
    </>
  );
}
