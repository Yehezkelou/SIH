import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { getAdmissionById } from "@/features/admission/api/mock";
import { TransferForm } from "@/features/admission/components/TransferForm";

export default async function TransfertPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admission = getAdmissionById(id);

  return (
    <>
      <PageHeader
        title="Transfert du patient"
        description="Enregistrez un mouvement interne ou externe."
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Admissions", href: "/admissions" },
          { label: admission.admissionNumber, href: `/admissions/${admission.id}` },
          { label: "Transfert" },
        ]}
      />
      <TransferForm admission={admission} />
    </>
  );
}
