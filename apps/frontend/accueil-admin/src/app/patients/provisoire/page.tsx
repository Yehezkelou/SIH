import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PatientForm } from "@/features/patient/components/PatientForm";

export default function ProvisoirePage() {
  return (
    <>
      <PageHeader
        title="Dossier provisoire"
        description="Ouverture rapide d'un dossier en urgence (identité non vérifiée)."
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Patients", href: "/patients" }, { label: "Provisoire" }]}
      />
      <PatientForm provisoire />
    </>
  );
}
