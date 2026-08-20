"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { FormSection } from "@/components/ui/FormSection";
import {
  admissionTypeLabel,
  documentTypeLabel,
  payerTypeLabel,
  relationshipLabel,
  toOptions,
} from "../utils/format";

interface CompanionRow {
  id: number;
}
interface PayerRow {
  id: number;
}

export const AdmissionForm = () => {
  const [companions, setCompanions] = useState<CompanionRow[]>([{ id: 1 }]);
  const [payers, setPayers] = useState<PayerRow[]>([{ id: 1 }]);
  const [files, setFiles] = useState<string[]>([]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 items-start"
    >
      {/* Colonne principale */}
      <div className="flex flex-col gap-5">
        {/* 1. Identité patient */}
        <FormSection step={1} title="Identité du patient" description="Recherchez un dossier existant ou renseignez un nouveau patient." icon="idCard">
          <div className="flex items-center gap-2 mb-4 p-2.5 rounded-lg bg-sky-50 border border-sky-100">
            <Icon name="search" size={16} className="text-sky-500 shrink-0" />
            <input
              placeholder="Rechercher par n° de dossier, nom ou téléphone…"
              className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder:text-slate-400 outline-none"
            />
            <Button type="button" size="sm" variant="subtle">Rechercher</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input name="nom" label="Nom" placeholder="Ex. Koffi" required />
            <Input name="prenom" label="Prénom" placeholder="Ex. Aya" required />
            <Input name="numeroDossier" label="N° dossier" placeholder="DOS-000000" leftIcon="clipboard" />
            <Select name="sexe" label="Sexe" placeholder="Sélectionner" options={[{ value: "F", label: "Féminin" }, { value: "M", label: "Masculin" }]} />
            <Input name="dateNaissance" label="Date de naissance" type="date" />
            <Input name="telephone" label="Téléphone" placeholder="+225 …" leftIcon="phone" />
          </div>
        </FormSection>

        {/* 2. Détails admission */}
        <FormSection step={2} title="Détails de l'admission" description="Type de prise en charge, service et médecin référent." icon="clipboard">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select name="type" label="Type d'admission" placeholder="Sélectionner" required options={toOptions(admissionTypeLabel)} />
            <Select name="service" label="Service" placeholder="Sélectionner" required options={[
              { value: "cardio", label: "Cardiologie" },
              { value: "urgences", label: "Urgences" },
              { value: "maternite", label: "Maternité" },
              { value: "chirurgie", label: "Chirurgie" },
            ]} />
            <Select name="medecin" label="Médecin référent" placeholder="Sélectionner" options={[
              { value: "1", label: "Dr. Fabrice N'Guessan" },
              { value: "2", label: "Dr. Céline Assi" },
            ]} />
            <Input name="dateAdmission" label="Date d'admission" type="datetime-local" required />
            <Input name="sortiePrevue" label="Sortie prévisionnelle" type="datetime-local" />
            <Select name="provenance" label="Provenance" placeholder="Sélectionner" options={[
              { value: "domicile", label: "Domicile" },
              { value: "transfert", label: "Transfert externe" },
              { value: "samu", label: "SAMU / Ambulance" },
            ]} />
          </div>
          <div className="mt-4">
            <Textarea name="motif" label="Motif d'admission" placeholder="Décrivez le motif de la prise en charge…" />
          </div>
        </FormSection>

        {/* 3. Accompagnants */}
        <FormSection step={3} title="Accompagnants" description="Personnes à contacter durant le séjour." icon="users">
          <div className="flex flex-col gap-3">
            {companions.map((row, idx) => (
              <div key={row.id} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end">
                <Input name={`comp_nom_${row.id}`} label={idx === 0 ? "Nom complet" : undefined} placeholder="Nom de l'accompagnant" />
                <Select name={`comp_lien_${row.id}`} label={idx === 0 ? "Lien de parenté" : undefined} placeholder="Lien" options={toOptions(relationshipLabel)} />
                <Input name={`comp_tel_${row.id}`} label={idx === 0 ? "Téléphone" : undefined} placeholder="+225 …" leftIcon="phone" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-rose-500 hover:bg-rose-50"
                  onClick={() => setCompanions((c) => (c.length > 1 ? c.filter((r) => r.id !== row.id) : c))}
                >
                  <Icon name="trash" size={16} />
                </Button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setCompanions((c) => [...c, { id: Date.now() }])}
              className="self-start inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <Icon name="plus" size={15} /> Ajouter un accompagnant
            </button>
          </div>
        </FormSection>

        {/* 4. Payeurs */}
        <FormSection step={4} title="Payeurs & couverture" description="Répartition de la prise en charge financière." icon="creditCard">
          <div className="flex flex-col gap-3">
            {payers.map((row, idx) => (
              <div key={row.id} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-3 items-end">
                <Select name={`pay_type_${row.id}`} label={idx === 0 ? "Type" : undefined} placeholder="Type" options={toOptions(payerTypeLabel)} />
                <Input name={`pay_nom_${row.id}`} label={idx === 0 ? "Nom / Organisme" : undefined} placeholder="Ex. CNPS" />
                <Input name={`pay_police_${row.id}`} label={idx === 0 ? "N° police" : undefined} placeholder="—" />
                <Input name={`pay_taux_${row.id}`} label={idx === 0 ? "Couverture %" : undefined} type="number" placeholder="0" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-rose-500 hover:bg-rose-50"
                  onClick={() => setPayers((p) => (p.length > 1 ? p.filter((r) => r.id !== row.id) : p))}
                >
                  <Icon name="trash" size={16} />
                </Button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setPayers((p) => [...p, { id: Date.now() }])}
              className="self-start inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <Icon name="plus" size={15} /> Ajouter un payeur
            </button>
          </div>
        </FormSection>

        {/* 5. Documents */}
        <FormSection step={5} title="Documents justificatifs" description="Pièce d'identité, carte d'assurance, ordonnance…" icon="file">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select name="docType" label="Type de document" placeholder="Sélectionner" options={toOptions(documentTypeLabel)} />
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">Fichier</span>
              <label className="flex items-center justify-center gap-2 h-9 rounded-lg border border-dashed border-slate-300 text-[12px] text-slate-500 cursor-pointer hover:border-emerald-400 hover:text-emerald-600 transition-colors">
                <Icon name="upload" size={15} />
                Choisir un fichier
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const name = e.target.files?.[0]?.name;
                    if (name) setFiles((f) => [...f, name]);
                  }}
                />
              </label>
            </div>
          </div>
          {files.length > 0 && (
            <ul className="mt-4 flex flex-col gap-2">
              {files.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[12px] text-slate-600">
                  <Icon name="file" size={15} className="text-emerald-600" />
                  <span className="flex-1 truncate">{f}</span>
                  <button type="button" onClick={() => setFiles((list) => list.filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500">
                    <Icon name="close" size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </FormSection>
      </div>

      {/* Colonne latérale : récapitulatif & actions */}
      <aside className="xl:sticky xl:top-6 flex flex-col gap-4">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Récapitulatif</h3>
          <ul className="flex flex-col gap-2.5 text-[12px]">
            {[
              ["Étape 1", "Identité patient"],
              ["Étape 2", "Détails admission"],
              ["Étape 3", `Accompagnants (${companions.length})`],
              ["Étape 4", `Payeurs (${payers.length})`],
              ["Étape 5", `Documents (${files.length})`],
            ].map(([k, v]) => (
              <li key={k} className="flex items-center gap-2.5">
                <span className="grid place-items-center w-5 h-5 rounded-full bg-slate-100 text-slate-400">
                  <Icon name="check" size={12} />
                </span>
                <span className="text-slate-400">{k}</span>
                <span className="ml-auto font-medium text-slate-600 truncate">{v}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-2">
            <Button type="submit" leftIcon="check" className="w-full">
              Enregistrer l'admission
            </Button>
            <Link href="/admissions">
              <Button type="button" variant="outline" className="w-full">Annuler</Button>
            </Link>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 text-center">
            Un n° d'admission sera généré automatiquement.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex gap-3">
          <Icon name="shield" size={18} className="text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-emerald-800 leading-relaxed">
            Les données saisies sont conservées de façon sécurisée et tracées (piste d'audit médico-légale).
          </p>
        </div>
      </aside>
    </form>
  );
};
