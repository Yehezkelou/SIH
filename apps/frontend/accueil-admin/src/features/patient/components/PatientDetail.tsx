"use client";

import React from "react";
import { Icon, IconName } from "@/components/ui/Icon";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { Patient } from "../types";
import { formatDate, genreLabel, motifProvisoireLabel } from "../utils/format";

const InfoRow = ({ label, value, icon }: { label: string; value?: string; icon?: IconName }) => (
  <div className="flex items-start gap-3 py-2.5">
    {icon && (
      <span className="grid place-items-center w-8 h-8 rounded-lg bg-slate-100 text-slate-400 shrink-0">
        <Icon name={icon} size={15} />
      </span>
    )}
    <div className="min-w-0">
      <p className="text-[11px] text-slate-400 uppercase tracking-wide">{label}</p>
      <p className="text-[13px] font-medium text-slate-700 break-words">{value ?? "—"}</p>
    </div>
  </div>
);

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50">
    <div className="px-4 py-3 border-b border-slate-100"><h3 className="text-[13px] font-semibold text-slate-800">{title}</h3></div>
    <div className="p-4">{children}</div>
  </div>
);

export const PatientDetail = ({ patient: p }: { patient: Patient }) => {
  const identite = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SectionCard title="État civil">
        <div className="divide-y divide-slate-50">
          <InfoRow label="Nom & prénom" value={`${p.prenom} ${p.nom}`} icon="idCard" />
          <InfoRow label="Genre / Âge" value={`${genreLabel[p.genre]} · ${p.age} ans`} icon="users" />
          <InfoRow label="Date de naissance" value={formatDate(p.dateNaissance)} icon="calendar" />
          <InfoRow label="Lieu de naissance" value={p.lieuNaissance} icon="mapPin" />
        </div>
      </SectionCard>
      <SectionCard title="Identifiants">
        <div className="divide-y divide-slate-50">
          <InfoRow label="NDPU" value={p.uniquePatientId} icon="shield" />
          <InfoRow label="N° pièce nationale" value={p.numIdentityNational} icon="idCard" />
          <InfoRow label="N° passeport" value={p.numeroPassport} icon="idCard" />
          <InfoRow label="N° CMU / Sécu" value={p.numCMU ?? p.numSecuSocial} icon="creditCard" />
        </div>
      </SectionCard>
      <SectionCard title="Filiation">
        <div className="grid grid-cols-2 gap-x-4">
          <InfoRow label="Père" value={p.nomPere} icon="users" />
          <InfoRow label="Tél. père" value={p.numeroPere} />
          <InfoRow label="Mère" value={p.nomMere} icon="users" />
          <InfoRow label="Tél. mère" value={p.numeroMere} />
          <InfoRow label="Tuteur" value={p.tuteur} />
          <InfoRow label="Tél. tuteur" value={p.numeroTuteur} />
        </div>
      </SectionCard>
      <SectionCard title="Coordonnées">
        <div className="divide-y divide-slate-50">
          <InfoRow label="Téléphone" value={p.numero} icon="phone" />
          <InfoRow label="Téléphone secondaire" value={p.numeroSecondaire} icon="phone" />
          <InfoRow label="Email" value={p.email} icon="mail" />
          <InfoRow label="Contact d'urgence" value={p.contactUrgence} icon="alert" />
        </div>
      </SectionCard>
    </div>
  );

  const docs = p.archivDossier && p.archivDossier.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {p.archivDossier.map((d) => (
        <div key={d.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm shadow-slate-200/50 flex items-start gap-3">
          <span className="grid place-items-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 shrink-0"><Icon name="file" size={18} /></span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-slate-800 truncate">{d.typeDoc}</p>
            <p className="text-[11px] text-slate-400 truncate">{d.name}</p>
            <p className="text-[11px] text-slate-400 mt-1">{d.size} · {formatDate(d.date)}</p>
          </div>
          <button className="text-slate-400 hover:text-emerald-600"><Icon name="download" size={16} /></button>
        </div>
      ))}
    </div>
  ) : (
    <div className="bg-white border border-slate-200 rounded-xl"><EmptyState icon="file" title="Aucun document archivé" description="Aucune pièce n'a été numérisée pour ce dossier." /></div>
  );

  const historique = (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50 p-5">
      <ol className="relative border-l border-slate-200 ml-2 space-y-5">
        {[
          { icon: "userPlus" as const, label: "Création du dossier", date: p.createdAt, by: p.serviceCreation },
          { icon: "history" as const, label: "Dernière modification", date: p.updatedAt ?? p.createdAt, by: "Accueil central" },
        ].map((e, i) => (
          <li key={i} className="ml-5">
            <span className="absolute -left-[9px] grid place-items-center w-4 h-4 rounded-full bg-emerald-500 text-white ring-4 ring-white">
              <Icon name={e.icon} size={10} />
            </span>
            <p className="text-[13px] font-medium text-slate-700">{e.label}</p>
            <p className="text-[11px] text-slate-400">{formatDate(e.date)} · {e.by ?? "—"}</p>
          </li>
        ))}
      </ol>
    </div>
  );

  const items = [
    { id: "identite", label: "Identité", icon: "idCard" as const, content: identite },
    { id: "documents", label: "Documents", icon: "file" as const, badge: p.archivDossier?.length ?? 0, content: docs },
    { id: "historique", label: "Historique", icon: "history" as const, content: historique },
  ];

  return <Tabs items={items} />;
};

export const PatientSummaryBanner = ({ patient: p }: { patient: Patient }) => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
    <span className="grid place-items-center w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 text-lg font-bold shrink-0">
      {`${p.prenom?.[0] ?? ""}${p.nom?.[0] ?? ""}`.toUpperCase()}
    </span>
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-bold text-slate-800">{p.prenom} {p.nom}</h2>
        {p.statusDossier === "PROVISOIRE" && (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-[11px] font-semibold">
            <Icon name="alert" size={12} /> Provisoire{p.motifDossierProvisoire ? ` · ${motifProvisoireLabel[p.motifDossierProvisoire]}` : ""}
          </span>
        )}
      </div>
      <p className="text-[12px] text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-mono">{p.uniquePatientId}</span>
        <span>· {genreLabel[p.genre]} · {p.age} ans</span>
        <span>· Créé le {formatDate(p.createdAt)}</span>
      </p>
    </div>
  </div>
);
