"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { admissionStatusLabel, admissionTypeLabel, toOptions } from "../utils/format";

export const AdmissionFilters = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center gap-3 shadow-sm shadow-slate-200/50">
    <div className="relative flex items-center flex-1 min-w-[220px]">
      <span className="absolute left-3 text-slate-400 pointer-events-none">
        <Icon name="search" size={15} />
      </span>
      <input
        type="search"
        placeholder="Nom du patient, n° dossier ou n° admission…"
        className="w-full bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-700 placeholder:text-slate-400 pl-9 pr-3 h-9 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
      />
    </div>

    <div className="w-40">
      <Select
        name="statut"
        options={[{ value: "", label: "Tous les statuts" }, ...toOptions(admissionStatusLabel)]}
      />
    </div>
    <div className="w-40">
      <Select
        name="type"
        options={[{ value: "", label: "Tous les types" }, ...toOptions(admissionTypeLabel)]}
      />
    </div>

    <div className="flex items-center gap-2 ml-auto">
      <Button variant="ghost" size="sm" leftIcon="filter">
        Filtres
      </Button>
      <Button variant="outline" size="sm" leftIcon="download">
        Exporter
      </Button>
    </div>
  </div>
);
