"use client";

import React from "react";
import { Icon, IconName } from "@/components/ui/Icon";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { Admission } from "../types";
import { documentTypeLabel, formatDate, formatDateTime, initials, payerTypeLabel, relationshipLabel } from "../utils/format";
import { AdmissionStatusBadge, AdmissionTypeBadge } from "./StatusBadges";

const InfoRow = ({ label, value, icon }: { label: string; value?: string; icon?: IconName }) => (
  <div className="flex items-start gap-3 py-2.5">
    {icon && (
      <span className="grid place-items-center w-8 h-8 rounded-lg bg-slate-100 text-slate-400 shrink-0">
        <Icon name={icon} size={15} />
      </span>
    )}
    <div className="min-w-0">
      <p className="text-[11px] text-slate-400 uppercase tracking-wide">{label}</p>
      <p className="text-[13px] font-medium text-slate-700">{value ?? "—"}</p>
    </div>
  </div>
);

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50">
    <div className="px-4 py-3 border-b border-slate-100">
      <h3 className="text-[13px] font-semibold text-slate-800">{title}</h3>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

export const AdmissionDetail = ({ admission: a }: { admission: Admission }) => {
  const summary = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SectionCard title="Informations patient">
        <div className="divide-y divide-slate-50">
          <InfoRow label="Nom complet" value={a.patientName} icon="idCard" />
          <InfoRow label="N° dossier" value={a.numeroPatient} icon="clipboard" />
          <InfoRow label="Sexe / Âge" value={`${a.sex === "F" ? "Féminin" : "Masculin"} · ${a.age ?? "—"} ans`} icon="users" />
        </div>
      </SectionCard>
      <SectionCard title="Détails de l'admission">
        <div className="divide-y divide-slate-50">
          <InfoRow label="Service" value={a.department} icon="building" />
          <InfoRow label="Médecin référent" value={a.doctorName} icon="stethoscope" />
          <InfoRow label="Date d'admission" value={formatDateTime(a.admissionDate)} icon="calendar" />
          <InfoRow label="Sortie prévue" value={formatDateTime(a.expectedDischarge)} icon="clock" />
        </div>
      </SectionCard>
      <div className="lg:col-span-2">
        <SectionCard title="Motif d'admission">
          <p className="text-[13px] text-slate-600 leading-relaxed">{a.reason ?? "Aucun motif renseigné."}</p>
        </SectionCard>
      </div>
    </div>
  );

  const companions =
    a.companions.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {a.companions.map((c) => (
          <div key={c.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 shadow-sm shadow-slate-200/50">
            <span className="grid place-items-center w-10 h-10 rounded-full bg-slate-100 text-slate-500 text-[12px] font-bold">
              {initials(c.fullName)}
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-slate-800 truncate">{c.fullName}</p>
              <p className="text-[12px] text-slate-500">{relationshipLabel[c.relationship]} · {c.phone ?? "—"}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="bg-white border border-slate-200 rounded-xl"><EmptyState icon="users" title="Aucun accompagnant" /></div>
    );

  const payers =
    a.payers.length > 0 ? (
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {["Type", "Nom / Organisme", "N° police", "Couverture", "Plafond", "Valide jusqu'au"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {a.payers.map((p) => (
              <tr key={p.id} className="text-[13px] text-slate-600">
                <td className="px-4 py-3 font-medium text-slate-800">{payerTypeLabel[p.payerType]}</td>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3 font-mono text-[12px]">{p.policyNumber ?? "—"}</td>
                <td className="px-4 py-3">{p.coveragePercentage != null ? `${p.coveragePercentage}%` : "—"}</td>
                <td className="px-4 py-3">{p.coverageLimit != null ? `${p.coverageLimit.toLocaleString("fr-FR")} F` : "—"}</td>
                <td className="px-4 py-3">{formatDate(p.validUntil)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="bg-white border border-slate-200 rounded-xl"><EmptyState icon="creditCard" title="Aucun payeur" description="Aucune prise en charge financière n'a été enregistrée." /></div>
    );

  const documents =
    a.documents.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {a.documents.map((d) => (
          <div key={d.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm shadow-slate-200/50 flex items-start gap-3">
            <span className="grid place-items-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
              <Icon name="file" size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-slate-800 truncate">{documentTypeLabel[d.documentType]}</p>
              <p className="text-[11px] text-slate-400 truncate">{d.fileName}</p>
              <p className="text-[11px] text-slate-400 mt-1">{d.size} · {formatDate(d.uploadedAt)}</p>
            </div>
            <button className="text-slate-400 hover:text-emerald-600"><Icon name="download" size={16} /></button>
          </div>
        ))}
      </div>
    ) : (
      <div className="bg-white border border-slate-200 rounded-xl"><EmptyState icon="file" title="Aucun document" description="Aucune pièce justificative n'a été téléversée." /></div>
    );

  const stay = a.encounter ? (
    <SectionCard title="Séjour en cours">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <InfoRow label="N° séjour" value={a.encounter.encounterNumber} icon="clipboard" />
        <InfoRow label="Statut" value={a.encounter.encounterStatus} icon="activity" />
        <InfoRow label="Service" value={a.encounter.currentDepartment} icon="building" />
        <InfoRow label="Chambre" value={a.encounter.currentRoom} icon="bed" />
        <InfoRow label="Lit" value={a.encounter.currentBed} icon="bed" />
        <InfoRow label="Début" value={formatDateTime(a.encounter.startDate)} icon="calendar" />
      </div>
    </SectionCard>
  ) : (
    <div className="bg-white border border-slate-200 rounded-xl"><EmptyState icon="bed" title="Aucun séjour actif" description="Ce dossier n'a pas encore de séjour d'hospitalisation ouvert." /></div>
  );

  return (
    <Tabs
      items={[
        { id: "resume", label: "Résumé", icon: "clipboard", content: summary },
        { id: "sejour", label: "Séjour", icon: "bed", content: stay },
        { id: "accompagnants", label: "Accompagnants", icon: "users", badge: a.companions.length, content: companions },
        { id: "payeurs", label: "Payeurs", icon: "creditCard", badge: a.payers.length, content: payers },
        { id: "documents", label: "Documents", icon: "file", badge: a.documents.length, content: documents },
      ]}
    />
  );
};

/* En-tete de fiche (bandeau resume patient) */
export const AdmissionSummaryBanner = ({ admission: a }: { admission: Admission }) => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
    <span className="grid place-items-center w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 text-lg font-bold shrink-0">
      {initials(a.patientName)}
    </span>
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-bold text-slate-800">{a.patientName}</h2>
        <AdmissionStatusBadge status={a.admissionStatus} />
        <AdmissionTypeBadge type={a.admissionType} />
      </div>
      <p className="text-[12px] text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-mono">{a.admissionNumber}</span>
        <span>· Dossier {a.numeroPatient}</span>
        <span>· {a.department ?? "—"}</span>
        <span>· Admis le {formatDateTime(a.admissionDate)}</span>
      </p>
    </div>
  </div>
);
