import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { PatientForm } from "@/features/patient/components/PatientForm";

export default function NouveauPatientPage() {
  return (
    <>
      <PageHeader
        title="Nouveau patient"
        description="Créez un dossier d'identité définitif dans le MPI."
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Patients", href: "/patients" }, { label: "Nouveau" }]}
        actions={
          <Link href="/patients/provisoire"><Button variant="outline" size="sm" leftIcon="alert">Créer un provisoire</Button></Link>
        }
      />
      <PatientForm />
    </>
  );
}
