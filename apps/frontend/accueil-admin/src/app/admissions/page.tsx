import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { mockAdmissions } from "@/features/admission/api/mock";
import { AdmissionFilters } from "@/features/admission/components/AdmissionFilters";
import { AdmissionTable } from "@/features/admission/components/AdmissionTable";
import { AdmissionStatus } from "@/features/admission/types";

export default function AdmissionsPage() {
  const total = mockAdmissions.length;
  const admitted = mockAdmissions.filter((a) => a.admissionStatus === AdmissionStatus.ADMITTED).length;
  const pending = mockAdmissions.filter((a) => a.admissionStatus === AdmissionStatus.PENDING).length;
  const discharged = mockAdmissions.filter((a) => a.admissionStatus === AdmissionStatus.DISCHARGED).length;

  return (
    <>
      <PageHeader
        title="Admissions"
        description="Consultez, filtrez et gérez l'ensemble des admissions."
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Admissions" }]}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon="printer">Imprimer</Button>
            <Link href="/admissions/nouvelle"><Button size="sm" leftIcon="plus">Nouvelle admission</Button></Link>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total admissions" value={total} icon="clipboard" tone="sky" />
        <StatCard label="Admis (actifs)" value={admitted} icon="checkCircle" tone="emerald" />
        <StatCard label="En attente" value={pending} icon="clock" tone="amber" />
        <StatCard label="Sortis" value={discharged} icon="logout" tone="violet" />
      </div>

      <AdmissionFilters />
      <AdmissionTable data={mockAdmissions} />
    </>
  );
}
