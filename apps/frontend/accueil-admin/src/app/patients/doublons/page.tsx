import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { mockAlerts } from "@/features/patient/api/mock";
import { DuplicatesList } from "@/features/patient/components/DuplicatesTable";
import { AlertNiveau, AlertStatus } from "@/features/patient/types";

export default function DoublonsPage() {
  const enAttente = mockAlerts.filter((a) => a.status === AlertStatus.EN_ATTENTE);
  const fortes = mockAlerts.filter((a) => a.niveau === AlertNiveau.FORTE && a.status === AlertStatus.EN_ATTENTE).length;

  return (
    <>
      <PageHeader
        title="Détection de doublons"
        description="Paires de dossiers probablement identiques, signalées par le scan de similarité."
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Patients", href: "/patients" }, { label: "Doublons" }]}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Alertes en attente" value={enAttente.length} icon="userSearch" tone="sky" />
        <StatCard label="Priorité forte" value={fortes} icon="alert" tone="rose" />
        <StatCard label="Traitées (30 j)" value={12} icon="userCheck" tone="emerald" />
        <StatCard label="Faux positifs" value={4} icon="checkCircle" tone="violet" />
      </div>

      <DuplicatesList alerts={enAttente} />
    </>
  );
}
