import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { mockPatients, mockAlerts } from "@/features/patient/api/mock";
import { PatientFilters } from "@/features/patient/components/PatientFilters";
import { PatientTable } from "@/features/patient/components/PatientTable";
import { AlertStatus, StatusDossier } from "@/features/patient/types";

export default function PatientsPage() {
  const total = mockPatients.length;
  const provisoires = mockPatients.filter((p) => p.statusDossier === StatusDossier.PROVISOIRE).length;
  const definitifs = mockPatients.filter((p) => p.statusDossier === StatusDossier.DEFINITIF).length;
  const doublons = mockAlerts.filter((a) => a.status === AlertStatus.EN_ATTENTE).length;

  return (
    <>
      <PageHeader
        title="Registre des patients (MPI)"
        description="Master Patient Index — identité unique de chaque personne du système."
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Patients" }]}
        actions={
          <>
            <Link href="/patients/doublons"><Button variant="outline" size="sm" leftIcon="userSearch">Doublons ({doublons})</Button></Link>
            <Link href="/patients/nouveau"><Button size="sm" leftIcon="userPlus">Nouveau patient</Button></Link>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Patients enregistrés" value={total} icon="users" tone="sky" />
        <StatCard label="Dossiers définitifs" value={definitifs} icon="userCheck" tone="emerald" />
        <StatCard label="Dossiers provisoires" value={provisoires} icon="alert" tone="amber" />
        <StatCard label="Doublons à traiter" value={doublons} icon="userSearch" tone="rose" />
      </div>

      <PatientFilters />
      <PatientTable data={mockPatients} />
    </>
  );
}
