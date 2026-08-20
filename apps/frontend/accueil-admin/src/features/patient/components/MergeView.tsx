"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Patient } from "../types";
import { formatDate, genreLabel } from "../utils/format";

type Side = "A" | "B";

const FIELDS: { key: keyof Patient; label: string; render?: (p: Patient) => string }[] = [
  { key: "nom", label: "Nom" },
  { key: "prenom", label: "Prénom" },
  { key: "genre", label: "Genre", render: (p) => (p.genre ? genreLabel[p.genre] : "—") },
  { key: "dateNaissance", label: "Date de naissance", render: (p) => formatDate(p.dateNaissance) },
  { key: "lieuNaissance", label: "Lieu de naissance" },
  { key: "numero", label: "Téléphone" },
  { key: "email", label: "Email" },
  { key: "nomPere", label: "Nom du père" },
  { key: "nomMere", label: "Nom de la mère" },
  { key: "numIdentityNational", label: "N° pièce nationale" },
  { key: "numCMU", label: "N° CMU" },
];

const val = (p: Patient, f: (typeof FIELDS)[number]) => f.render ? f.render(p) : (p[f.key] as string) ?? "—";

export const MergeView = ({ patientA, patientB }: { patientA: Patient; patientB: Patient }) => {
  const [master, setMaster] = useState<Side>("A");
  // choix de la valeur retenue par champ (par défaut : celle du maître)
  const [choices, setChoices] = useState<Record<string, Side>>({});

  const pick = (key: string) => choices[key] ?? master;

  const Header = ({ side, p }: { side: Side; p: Patient }) => {
    const isMaster = master === side;
    return (
      <button
        type="button"
        onClick={() => setMaster(side)}
        className={`flex-1 text-left rounded-xl border p-4 transition-all ${
          isMaster ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20" : "border-slate-200 bg-white hover:border-slate-300"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[11px] font-bold uppercase tracking-wide ${isMaster ? "text-emerald-700" : "text-slate-400"}`}>
            Dossier {side} {isMaster && "· maître"}
          </span>
          <span className={`grid place-items-center w-5 h-5 rounded-full ${isMaster ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-300"}`}>
            <Icon name="check" size={12} />
          </span>
        </div>
        <p className="text-[14px] font-semibold text-slate-800 mt-1">{p.prenom} {p.nom}</p>
        <p className="text-[11px] font-mono text-slate-400">{p.uniquePatientId}</p>
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 flex gap-3">
        <Icon name="alert" size={18} className="text-sky-600 shrink-0 mt-0.5" />
        <p className="text-[12px] text-sky-800 leading-relaxed">
          Choisissez le <strong>dossier maître</strong> (celui qui sera conservé). Le second sera archivé et pointera vers le maître via <code className="font-mono">mergeIntoPatientId</code>. Pour chaque champ, sélectionnez la valeur à retenir. <strong>La fusion est irréversible.</strong>
        </p>
      </div>

      {/* En-têtes des deux dossiers */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Header side="A" p={patientA} />
        <span className="hidden sm:grid place-items-center w-10 shrink-0 text-slate-300"><Icon name="merge" size={20} /></span>
        <Header side="B" p={patientB} />
      </div>

      {/* Comparaison champ par champ */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50 overflow-hidden">
        <div className="grid grid-cols-[140px_1fr_1fr] bg-slate-50 border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          <div className="px-4 py-2.5">Champ</div>
          <div className="px-4 py-2.5">Dossier A</div>
          <div className="px-4 py-2.5">Dossier B</div>
        </div>
        <div className="divide-y divide-slate-100">
          {FIELDS.map((f) => {
            const key = String(f.key);
            const a = val(patientA, f);
            const b = val(patientB, f);
            const diff = a !== b;
            return (
              <div key={key} className="grid grid-cols-[140px_1fr_1fr] items-stretch">
                <div className="px-4 py-2.5 text-[12px] font-medium text-slate-500 flex items-center">{f.label}</div>
                {(["A", "B"] as Side[]).map((side) => {
                  const selected = pick(key) === side;
                  const value = side === "A" ? a : b;
                  return (
                    <button
                      key={side}
                      type="button"
                      onClick={() => setChoices((c) => ({ ...c, [key]: side }))}
                      className={`px-4 py-2.5 text-left text-[13px] flex items-center gap-2 transition-colors ${
                        selected ? "bg-emerald-50/70 text-slate-800 font-medium" : "text-slate-600 hover:bg-slate-50"
                      } ${diff ? "" : "text-slate-400"}`}
                    >
                      <span className={`grid place-items-center w-4 h-4 rounded-full border shrink-0 ${selected ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 text-transparent"}`}>
                        <Icon name="check" size={10} />
                      </span>
                      <span className="truncate">{value}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        <Link href="/patients/doublons"><Button variant="outline">Annuler</Button></Link>
        <Button variant="danger" leftIcon="merge">Confirmer la fusion</Button>
      </div>
    </div>
  );
};
