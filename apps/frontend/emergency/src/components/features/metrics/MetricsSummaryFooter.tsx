"use client";

import React from "react";

export interface SummaryStats {
  totalPatients: number;
  aboveTargetCount: number;
  aboveTargetPercent: number;
  belowTargetCount: number;
  belowTargetPercent: number;
  averageTime: number;
  minTime: number;
  maxTime: number;
}

interface MetricsSummaryFooterProps {
  stats?: SummaryStats;
}

export const MetricsSummaryFooter = ({ stats }: MetricsSummaryFooterProps) => {
  const kpis = [
    { label: "Total patients:", val: stats?.totalPatients ?? 0 },
    { label: "Hors cible (>25mn):", val: stats?.aboveTargetCount ?? 0 },
    { label: "Pourcentage (>25mn):", val: `${stats?.aboveTargetPercent ?? 0}%` },
    { label: "Cible (<=25mn):", val: stats?.belowTargetCount ?? 0 },
    { label: "Pourcentage (<=25mn):", val: `${stats?.belowTargetPercent ?? 0}%` },
    { label: "Moyenne (min):", val: stats?.averageTime ?? 0 },
    { label: "Min (min):", val: stats?.minTime ?? 0 },
    { label: "Max (min):", val: stats?.maxTime ?? 0 },
  ];

  return (
    <div className="bg-slate-50 border-t border-slate-200 p-2.5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 text-[11px] rounded-b-lg">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="flex flex-col bg-white p-2 rounded border border-slate-200 shadow-2xs">
          <span className="font-semibold text-slate-500 truncate text-[10px] uppercase tracking-wider">
            {kpi.label}
          </span>
          <span className="font-bold text-slate-800 text-center mt-1 text-xs">
            {kpi.val}
          </span>
        </div>
      ))}
    </div>
  );
};