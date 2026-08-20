import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { EmptyState } from "@/components/ui/EmptyState";
import { Admission } from "../types";
import { formatDateTime, initials } from "../utils/format";
import { AdmissionStatusBadge, AdmissionTypeBadge } from "./StatusBadges";

const HeadCell = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <th className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500 ${className}`}>
    {children}
  </th>
);

export const AdmissionTable = ({ data }: { data: Admission[] }) => {
  if (data.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50">
        <EmptyState icon="clipboard" title="Aucune admission" description="Aucune admission ne correspond à vos critères de recherche." />
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[860px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <HeadCell>Patient</HeadCell>
              <HeadCell>N° Admission</HeadCell>
              <HeadCell>Type</HeadCell>
              <HeadCell>Service</HeadCell>
              <HeadCell>Médecin</HeadCell>
              <HeadCell>Date d'admission</HeadCell>
              <HeadCell>Statut</HeadCell>
              <HeadCell className="text-right">Action</HeadCell>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="grid place-items-center w-9 h-9 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold shrink-0">
                      {initials(a.patientName)}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-slate-800 truncate">{a.patientName}</p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {a.numeroPatient} · {a.sex === "F" ? "F" : "H"} · {a.age ?? "—"} ans
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[12px] font-mono font-medium text-slate-700">{a.admissionNumber}</span>
                </td>
                <td className="px-4 py-3"><AdmissionTypeBadge type={a.admissionType} /></td>
                <td className="px-4 py-3 text-[13px] text-slate-600">{a.department ?? "—"}</td>
                <td className="px-4 py-3 text-[13px] text-slate-600">{a.doctorName ?? "—"}</td>
                <td className="px-4 py-3 text-[13px] text-slate-600">{formatDateTime(a.admissionDate)}</td>
                <td className="px-4 py-3"><AdmissionStatusBadge status={a.admissionStatus} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admissions/${a.id}`}
                      className="inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-700 hover:text-emerald-800 px-2 py-1 rounded-md hover:bg-emerald-50 transition-colors"
                    >
                      Détails
                      <Icon name="chevronRight" size={14} />
                    </Link>
                    <button className="grid place-items-center w-7 h-7 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                      <Icon name="dots" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-[12px] text-slate-500">
        <span>
          <span className="font-semibold text-slate-700">{data.length}</span> admission(s) affichée(s)
        </span>
        <div className="flex items-center gap-1">
          <button className="grid place-items-center w-8 h-8 rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
            <Icon name="chevronLeft" size={15} />
          </button>
          <button className="w-8 h-8 rounded-md bg-emerald-600 text-white text-[12px] font-semibold">1</button>
          <button className="w-8 h-8 rounded-md border border-slate-200 text-slate-600 text-[12px] font-medium hover:bg-slate-50">2</button>
          <button className="grid place-items-center w-8 h-8 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50">
            <Icon name="chevronRight" size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
