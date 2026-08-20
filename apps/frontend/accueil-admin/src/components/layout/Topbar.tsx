"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export const Topbar = () => (
  <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between gap-4 px-6">
    {/* Recherche globale */}
    <div className="flex items-center gap-3 flex-1 max-w-md">
      <div className="relative flex items-center w-full">
        <span className="absolute left-3 text-slate-400 pointer-events-none">
          <Icon name="search" size={16} />
        </span>
        <input
          type="search"
          placeholder="Rechercher un patient, un n° d'admission…"
          className="w-full bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-700 placeholder:text-slate-400 pl-9 pr-3 h-9 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
        />
      </div>
    </div>

    {/* Actions */}
    <div className="flex items-center gap-2">
      <Link href="/admissions/nouvelle">
        <Button size="sm" leftIcon="plus">
          Nouvelle admission
        </Button>
      </Link>

      <div className="h-6 w-px bg-slate-200 mx-1" />

      <button className="relative grid place-items-center w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors" title="Notifications">
        <Icon name="bell" size={18} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
      </button>
      <button className="grid place-items-center w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors" title="Paramètres">
        <Icon name="settings" size={18} />
      </button>

      <div className="h-6 w-px bg-slate-200 mx-1" />

      <button className="flex items-center gap-2.5 pl-1 pr-2 h-9 rounded-lg hover:bg-slate-100 transition-colors" title="Compte">
        <span className="grid place-items-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
          SI
        </span>
        <span className="hidden md:flex flex-col items-start leading-none">
          <span className="text-[12px] font-semibold text-slate-800">Serge Ibaka</span>
          <span className="text-[10px] text-slate-400 mt-0.5">Institut de Cardiologie</span>
        </span>
        <Icon name="chevronDown" size={15} className="text-slate-400 hidden md:block" />
      </button>
    </div>
  </header>
);
