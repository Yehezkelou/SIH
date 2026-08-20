"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { FormSection } from "@/components/ui/FormSection";
import { Admission } from "../types";

export const DischargeForm = ({ admission }: { admission: Admission }) => (
  <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 items-start">
    <FormSection title="Informations de sortie" description="Renseignez les modalités de sortie du patient." icon="logout">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select name="mode" label="Mode de sortie" placeholder="Sélectionner" required options={[
          { value: "guerison", label: "Guérison / retour domicile" },
          { value: "transfert", label: "Transfert externe" },
          { value: "deces", label: "Décès" },
          { value: "sortie_contre_avis", label: "Sortie contre avis médical" },
          { value: "evade", label: "Sortie sans autorisation" },
        ]} />
        <Input name="dateSortie" label="Date et heure de sortie" type="datetime-local" required />
        <Select name="destination" label="Destination" placeholder="Sélectionner" options={[
          { value: "domicile", label: "Domicile" },
          { value: "etab_externe", label: "Établissement externe" },
          { value: "service_interne", label: "Autre service interne" },
        ]} />
        <Input name="diagnostic" label="Diagnostic de sortie" placeholder="Ex. Angor stabilisé" />
      </div>
      <div className="mt-4">
        <Textarea name="consignes" label="Consignes / observations" placeholder="Consignes de sortie, traitement, suivi…" />
      </div>
    </FormSection>

    <aside className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50 p-5 lg:sticky lg:top-6">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Patient concerné</p>
      <p className="text-sm font-semibold text-slate-800 mt-1">{admission.patientName}</p>
      <p className="text-[12px] text-slate-500">{admission.admissionNumber}</p>
      <dl className="mt-4 space-y-2 text-[12px]">
        <div className="flex justify-between"><dt className="text-slate-400">Service</dt><dd className="font-medium text-slate-700">{admission.department ?? "—"}</dd></div>
        <div className="flex justify-between"><dt className="text-slate-400">Médecin</dt><dd className="font-medium text-slate-700">{admission.doctorName ?? "—"}</dd></div>
      </dl>
      <div className="mt-5 flex flex-col gap-2">
        <Button type="submit" leftIcon="check" className="w-full">Confirmer la sortie</Button>
        <Link href={`/admissions/${admission.id}`}>
          <Button type="button" variant="outline" className="w-full">Annuler</Button>
        </Link>
      </div>
    </aside>
  </form>
);
