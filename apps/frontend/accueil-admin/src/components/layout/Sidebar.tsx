"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Icon, IconName } from "@/components/ui/Icon";

interface NavItem {
  label: string;
  href: string;
  icon: IconName;
  badge?: string;
  exact?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const groups: NavGroup[] = [
  {
    title: "Pilotage",
    items: [{ label: "Tableau de bord", href: "/", icon: "dashboard", exact: true }],
  },
  {
    title: "Identité patient (MPI)",
    items: [
      { label: "Registre patients", href: "/patients", icon: "users", exact: true },
      { label: "Nouveau patient", href: "/patients/nouveau", icon: "userPlus" },
      { label: "Doublons", href: "/patients/doublons", icon: "userSearch", badge: "2" },
    ],
  },
  {
    title: "Admissions",
    items: [
      { label: "Liste des admissions", href: "/admissions", icon: "clipboard", exact: true },
      { label: "Nouvelle admission", href: "/admissions/nouvelle", icon: "userPlus" },
      { label: "En attente", href: "/admissions?statut=PENDING", icon: "clock", badge: "3" },
    ],
  },
  {
    title: "Séjours",
    items: [
      { label: "Séjours en cours", href: "/sejours", icon: "bed", badge: "12" },
      { label: "Mouvements", href: "/mouvements", icon: "transfer" },
      { label: "Occupation des lits", href: "/lits", icon: "building" },
    ],
  },
  {
    title: "Dossier",
    items: [
      { label: "Payeurs & couverture", href: "/payeurs", icon: "creditCard" },
      { label: "Documents", href: "/documents", icon: "file" },
      { label: "Historique", href: "/historique", icon: "history" },
    ],
  },
  {
    title: "Système",
    items: [{ label: "Paramètres", href: "/parametres", icon: "settings" }],
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    const base = item.href.split("?")[0];
    return item.exact ? pathname === base : pathname.startsWith(base) && base !== "/";
  };

  return (
    <aside className="w-64 shrink-0 bg-slate-900 text-slate-300 h-screen flex flex-col border-r border-slate-800 select-none">
      {/* Marque */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-800">
        <span className="grid place-items-center w-9 h-9 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-900/40">
          <Icon name="activity" size={20} />
        </span>
        <div className="flex flex-col leading-none">
          <span className="text-white font-bold text-sm tracking-tight">MediSIH</span>
          <span className="text-[10px] text-slate-500 mt-1">Admissions &amp; Séjours</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {groups.map((group) => (
          <div key={group.title} className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-600">{group.title}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 px-3 h-9 rounded-lg text-[13px] font-medium transition-colors relative",
                      active
                        ? "bg-emerald-600 text-white shadow-sm shadow-emerald-900/40"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                    )}
                  >
                    <Icon
                      name={item.icon}
                      size={17}
                      className={cn("shrink-0", active ? "text-white" : "text-slate-500 group-hover:text-emerald-400")}
                    />
                    <span className="truncate flex-1">{item.label}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                          active ? "bg-white/20 text-white" : "bg-slate-800 text-slate-300 group-hover:bg-slate-700"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Pied */}
      <div className="p-3 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-slate-800/60">
          <span className="grid place-items-center w-8 h-8 rounded-full bg-slate-700 text-emerald-300 text-xs font-bold">
            SI
          </span>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-[12px] font-semibold text-slate-100 truncate">Serge Ibaka</span>
            <span className="text-[10px] text-slate-500 truncate">Agent d'accueil</span>
          </div>
          <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400" />
        </div>
      </div>
    </aside>
  );
};
