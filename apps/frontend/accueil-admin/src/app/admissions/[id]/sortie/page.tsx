import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { getAdmissionById } from "@/features/admission/api/mock";
import { DischargeForm } from "@/features/admission/components/DischargeForm";

export default async function SortiePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admission = getAdmissionById(id);

  return (
    <>
      <PageHeader
        title="Sortie du patient"
        description="Clôturez le dossier et enregistrez les modalités de sortie."
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Admissions", href: "/admissions" },
          { label: admission.admissionNumber, href: `/admissions/${admission.id}` },
          { label: "Sortie" },
        ]}
      />
      <DischargeForm admission={admission} />
    </>
  );
}
