import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AdmissionForm } from "@/features/admission/components/AdmissionForm";

export default function NouvelleAdmissionPage() {
  return (
    <>
      <PageHeader
        title="Nouvelle admission"
        description="Enregistrez un patient et ouvrez un dossier d'admission."
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Admissions", href: "/admissions" }, { label: "Nouvelle" }]}
      />
      <AdmissionForm />
    </>
  );
}
