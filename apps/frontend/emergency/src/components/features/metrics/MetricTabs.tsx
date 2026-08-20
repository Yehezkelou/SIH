"use client";

import React, { useState } from "react";
import { Clock, Users } from "lucide-react";

export const MetricTabs = () => {
  const [mainTab, setMainTab] = useState<"attente" | "dms">("attente");
  const [subTab, setSubTab] = useState<"global" | "provenance">("global");

  return (
    <div className="space-y-1 select-none">
      {/* Niveau 1 : Métriques Principales */}
      <div className="grid grid-cols-2 text-center text-xs font-bold text-white gap-0.5">
        <button
          onClick={() => setMainTab("attente")}
          className={`py-2 rounded-t-md transition-colors flex items-center justify-center gap-2 cursor-pointer ${
            mainTab === "attente" ? "bg-sky-600 shadow-xs" : "bg-slate-400 hover:bg-slate-500"
          }`}
        >
          <Clock className="w-4 h-4" /> Temps d'attente
        </button>
        <button
          onClick={() => setMainTab("dms")}
          className={`py-2 rounded-t-md transition-colors flex items-center justify-center gap-2 cursor-pointer ${
            mainTab === "dms" ? "bg-sky-600 shadow-xs" : "bg-slate-400 hover:bg-slate-500"
          }`}
        >
          <Users className="w-4 h-4" /> Durée Moyen de Séjour
        </button>
      </div>

      {/* Niveau 2 : Segmentations */}
      <div className="grid grid-cols-2 text-center text-xs font-semibold text-white gap-0.5">
        <button
          onClick={() => setSubTab("global")}
          className={`py-1.5 transition-colors cursor-pointer ${
            subTab === "global" ? "bg-sky-500 shadow-xs" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
          }`}
        >
          Temps d'attente global
        </button>
        <button
          onClick={() => setSubTab("provenance")}
          className={`py-1.5 transition-colors cursor-pointer ${
            subTab === "provenance" ? "bg-sky-500 shadow-xs" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
          }`}
        >
          Temps d'attente par provenance
        </button>
      </div>
    </div>
  );
};