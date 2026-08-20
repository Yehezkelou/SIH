import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SimilarityAlert } from "../types";
import { formatDate, matchedFieldLabel } from "../utils/format";
import { AlertNiveauBadge, AlertStatusBadge, ScoreBadge } from "./StatusBadges";

const ScoreBar = ({ score }: { score: number }) => (
  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
    <div
      className={`h-full rounded-full ${score >= 85 ? "bg-rose-500" : score >= 70 ? "bg-amber-500" : "bg-slate-400"}`}
      style={{ width: `${score}%` }}
    />
  </div>
);

export const DuplicatesList = ({ alerts }: { alerts: SimilarityAlert[] }) => {
  if (alerts.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50">
        <EmptyState icon="checkCircle" title="Aucun doublon détecté" description="Le scan de similarité n'a signalé aucune paire à examiner." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {alerts.map((a) => (
        <div key={a.id} className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="grid place-items-center w-9 h-9 rounded-lg bg-rose-50 text-rose-600"><Icon name="userSearch" size={18} /></span>
              <div>
                <p className="text-[13px] font-semibold text-slate-800">Correspondance potentielle</p>
                <p className="text-[11px] text-slate-400">Détectée le {formatDate(a.detectedAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ScoreBadge score={a.score} />
              <AlertNiveauBadge niveau={a.niveau} />
              <AlertStatusBadge status={a.status} />
            </div>
          </div>

          {/* Paire comparée */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3 mt-4">
            {[
              { name: a.patientAName, num: a.numeroDossierA },
              { name: a.patientBName, num: a.numeroDossierB },
            ].map((side, i) => (
              <React.Fragment key={i}>
                {i === 1 && (
                  <span className="hidden sm:grid place-items-center w-8 h-8 rounded-full bg-slate-100 text-slate-400 mx-auto">
                    <Icon name="merge" size={16} />
                  </span>
                )}
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 text-[11px] font-bold">
                    {side.name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-slate-800 truncate">{side.name}</p>
                    <p className="text-[11px] font-mono text-slate-400 truncate">{side.num}</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Score + champs concordants */}
          <div className="mt-3">
            <ScoreBar score={a.score} />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {a.matchedFields.map((f) => (
                <span key={f.field} className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                  {matchedFieldLabel[f.field] ?? f.field} · {f.score}%
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
            <Button variant="ghost" size="sm">Faux positif</Button>
            <Button variant="outline" size="sm">Ignorer</Button>
            <Link href={`/patients/${a.patientAId}/fusion?with=${a.patientBId}`}>
              <Button size="sm" leftIcon="merge">Examiner &amp; fusionner</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
