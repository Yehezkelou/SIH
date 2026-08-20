"use client";

import React from "react";
import { FilterBar } from "@/components/features/metrics/FilterBar";
import { MetricTabs } from "@/components/features/metrics/MetricTabs";
import { PatientWaitTimeTable } from "@/components/features/metrics/PatientWaitTimeTable";
import { MetricsSummaryFooter } from "@/components/features/metrics/MetricsSummaryFooter";

export default function EmergencyDashboardPage() {
  // Gestionnaires d'évènements à relier à vos appels d'API (p. ex. via React Query ou Server Actions)
  const handleSearch = () => {
    console.log("Recherche des indicateurs pour la période sélectionnée...");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col gap-3 min-h-0">
      {/* 1. Barre de filtre par dates */}
      <FilterBar onSearch={handleSearch} onPrint={handlePrint} />

      {/* 2. Onglets de sélection des métriques */}
      <MetricTabs />

      {/* 3. Conteneur central : Tableau de données + Pied de page KPI */}
      <div className="flex-1 flex flex-col justify-between min-h-0">
        <PatientWaitTimeTable data={[]} />
        <MetricsSummaryFooter />
      </div>
    </div>
  );
}