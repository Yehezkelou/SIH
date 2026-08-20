import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { getAdmissionById } from "@/features/admission/api/mock";
import { AdmissionDetail, AdmissionSummaryBanner } from "@/features/admission/components/AdmissionDetail";

export default async function AdmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admission = getAdmissionById(id);

  return (
    <>
      <PageHeader
        title="Fiche d'admission"
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Admissions", href: "/admissions" }, { label: admission.admissionNumber }]}
        actions={
          <>
            <Link href={`/admissions/${admission.id}/transfert`}>
              <Button variant="outline" size="sm" leftIcon="transfer">Transférer</Button>
            </Link>
            <Link href={`/admissions/${admission.id}/sortie`}>
              <Button size="sm" leftIcon="logout">Sortie</Button>
            </Link>
          </>
        }
      />
      <AdmissionSummaryBanner admission={admission} />
      <AdmissionDetail admission={admission} />
    </>
  );
}
