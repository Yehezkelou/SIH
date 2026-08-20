"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Field";
import { FormSection } from "@/components/ui/FormSection";
import { motifProvisoireLabel, toOptions } from "../utils/format";

export const PatientForm = ({ provisoire = false }: { provisoire?: boolean }) => {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 items-start">
      <div className="flex flex-col gap-5">
        {provisoire && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
            <Icon name="alert" size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] font-semibold text-amber-800">Dossier provisoire</p>
              <p className="text-[12px] text-amber-700 mt-0.5">
                À utiliser en urgence lorsque l'identité ne peut être vérifiée. Le dossier devra être <strong>régularisé</strong> ultérieurement.
              </p>
            </div>
          </div>
        )}

        {/* 1. Identité civile */}
        <FormSection step={1} title="Identité civile" description="Informations d'état civil du patient." icon="idCard">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input name="nom" label="Nom" placeholder="Ex. Koffi" required={!provisoire} />
            <Input name="prenom" label="Prénom" placeholder="Ex. Aya" required={!provisoire} />
            <Select name="genre" label="Genre" placeholder="Sélectionner" required options={[{ value: "M", label: "Masculin" }, { value: "F", label: "Féminin" }]} />
            <Input name="dateNaissance" label="Date de naissance" type="date" />
            <Input name="age" label="Âge" type="number" placeholder="0" />
            <Input name="lieuNaissance" label="Lieu de naissance" placeholder="Ex. Abidjan" leftIcon="mapPin" />
          </div>
        </FormSection>

        {provisoire && (
          <FormSection step={2} title="Contexte du provisoire" description="Motif et service à l'origine du dossier." icon="alert">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select name="motif" label="Motif du dossier provisoire" placeholder="Sélectionner" required options={toOptions(motifProvisoireLabel)} />
              <Input name="serviceCreation" label="Service de création" placeholder="Ex. Urgences" leftIcon="building" />
            </div>
          </FormSection>
        )}

        {/* Filiation */}
        <FormSection step={provisoire ? 3 : 2} title="Filiation & tuteur" description="Utile pour lever les doublons homonymes et les mineurs." icon="users">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input name="nomPere" label="Nom du père" placeholder="—" />
            <Input name="numeroPere" label="Tél. père" placeholder="+225 …" leftIcon="phone" />
            <Input name="nomMere" label="Nom de la mère" placeholder="—" />
            <Input name="numeroMere" label="Tél. mère" placeholder="+225 …" leftIcon="phone" />
            <Input name="tuteur" label="Tuteur légal" placeholder="—" />
            <Input name="numeroTuteur" label="Tél. tuteur" placeholder="+225 …" leftIcon="phone" />
          </div>
        </FormSection>

        {/* Contact */}
        <FormSection step={provisoire ? 4 : 3} title="Coordonnées" description="Moyens de contact du patient." icon="phone">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input name="numero" label="Téléphone principal" placeholder="+225 …" leftIcon="phone" />
            <Input name="numeroSecondaire" label="Téléphone secondaire" placeholder="+225 …" leftIcon="phone" />
            <Input name="email" label="Email" type="email" placeholder="nom@exemple.ci" leftIcon="mail" />
            <div className="sm:col-span-2 lg:col-span-3">
              <Input name="contactUrgence" label="Contact d'urgence" placeholder="Proche à joindre (nom + téléphone)" />
            </div>
          </div>
        </FormSection>

        {/* Identifiants uniques */}
        <FormSection step={provisoire ? 5 : 4} title="Identifiants" description="Pièces officielles — clés de dédoublonnage." icon="shield">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input name="numIdentityNational" label="N° pièce nationale (CNI)" placeholder="—" />
            <Input name="numeroPassport" label="N° passeport" placeholder="—" />
            <Input name="numSecuSocial" label="N° sécurité sociale" placeholder="—" />
            <Input name="numCMU" label="N° CMU" placeholder="—" />
          </div>
        </FormSection>

        {/* Documents */}
        <FormSection step={provisoire ? 6 : 5} title="Documents (archive dossier)" description="Numérisation des pièces justificatives." icon="file">
          <label className="flex items-center justify-center gap-2 h-24 rounded-lg border border-dashed border-slate-300 text-[12px] text-slate-500 cursor-pointer hover:border-emerald-400 hover:text-emerald-600 transition-colors">
            <Icon name="upload" size={18} />
            Glisser-déposer ou choisir des fichiers
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                const names = Array.from(e.target.files ?? []).map((f) => f.name);
                if (names.length) setFiles((f) => [...f, ...names]);
              }}
            />
          </label>
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

      {/* Récapitulatif */}
      <aside className="xl:sticky xl:top-6 flex flex-col gap-4">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-1">
            {provisoire ? "Nouveau dossier provisoire" : "Nouveau patient"}
          </h3>
          <p className="text-[12px] text-slate-400 mb-4">Un NDPU (numéro de dossier unique) sera généré automatiquement.</p>
          <div className="flex flex-col gap-2">
            <Button type="submit" leftIcon="check" className="w-full">
              {provisoire ? "Créer le provisoire" : "Enregistrer le patient"}
            </Button>
            <Link href="/patients"><Button type="button" variant="outline" className="w-full">Annuler</Button></Link>
          </div>
        </div>

        <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 flex gap-3">
          <Icon name="sparkles" size={18} className="text-sky-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-sky-800 leading-relaxed">
            À l'enregistrement, le MPI recherche automatiquement d'éventuels <strong>doublons</strong> (nom, date de naissance, filiation…) et signale les correspondances.
          </p>
        </div>
      </aside>
    </form>
  );
};
