"use client";

import React, { useState } from "react";
import { 
  BarChart2, Users, History, Percent, Stethoscope, 
  Bed, UserCheck, ShieldAlert, FileText, Settings, 
  Box, Package, CheckCircle, ChevronRight, Activity,
  ChevronDown
} from "lucide-react";

interface MenuItem {
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

interface MenuGroup {
  category: string;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    category: "Analyse & Métriques",
    items: [
      { label: "Indicateurs", icon: BarChart2 },
      { label: "Pourcentage évalué", icon: Percent },
    ]
  },
  {
    category: "Gestion Patients",
    items: [
      { label: "Liste Admission", icon: Users, badge: "12", badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
      { label: "Historique Admission", icon: History },
      { label: "Prise de constante", icon: Stethoscope },
      { label: "Séjour en cours", icon: Bed, badge: "5", badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
      { label: "Dossiers", icon: FileText },
    ]
  },
  {
    category: "Corps Médical & Soins",
    items: [
      { label: "Médecin", icon: UserCheck },
      { label: "Infirmier", icon: ShieldAlert },
      { label: "Prelevement infirmier", icon: FileText },
      { label: "Transmission prelev", icon: FileText },
      { label: "Ordonnance à servir", icon: FileText, badge: "Urg.", badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
    ]
  },
  {
    category: "Logistique & Matériel",
    items: [
      { label: "SDGMP", icon: Box },
      { label: "Edition matériel", icon: Package },
      { label: "Fournitures", icon: Package },
      { label: "Réimprimer etiquette", icon: FileText },
      { label: "Vérifications", icon: CheckCircle },
    ]
  },
  {
    category: "Configuration",
    items: [
      { label: "Paramètres", icon: Settings },
    ]
  }
];

export const Sidebar = () => {
  const [selected, setSelected] = useState("Indicateurs");

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 h-screen flex flex-col border-r border-slate-800/80 text-xs shrink-0 select-none shadow-xl">
      
      {/* Brand Header */}
      <div className="p-4 bg-gradient-to-r from-emerald-800 to-emerald-950 text-white flex items-center justify-between border-b border-emerald-700/50 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-emerald-500/20 rounded-lg border border-emerald-400/30 text-emerald-300">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-wide leading-none">Urgences ICA</span>
            <span className="text-[10px] text-emerald-200/70 mt-1">Centre Hospitalier</span>
          </div>
        </div>
        <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-600/40 font-mono">
          v1.0
        </span>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {group.category}
            </p>

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = selected === item.label;

                return (
                  <button
                    key={item.label}
                    onClick={() => setSelected(item.label)}
                    className={`group w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer relative ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 font-semibold"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-400"
                      }`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded border font-semibold ${item.badgeColor || "bg-slate-800 text-slate-300 border-slate-700"}`}>
                          {item.badge}
                        </span>
                      )}
                      
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 opacity-0 group-hover:opacity-100 ${
                        isActive ? "opacity-100 text-white translate-x-0.5" : "text-slate-500"
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/40 text-[11px] text-slate-500 flex items-center justify-between">
        <span className="truncate">Session active</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
      </div>
    </aside>
  );
};