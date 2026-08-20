"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { FormSection } from "@/components/ui/FormSection";
import { Admission } from "../types";

export const TransferForm = ({ admission }: { admission: Admission }) => (
  <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 items-start">
    <FormSection title="Transfert du patient" description="Mouvement vers un autre service, une chambre ou un établissement." icon="transfer">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select name="typeTransfert" label="Type de transfert" placeholder="Sélectionner" required options={[
          { value: "interne", label: "Interne (autre service)" },
          { value: "chambre", label: "Changement de chambre / lit" },
          { value: "externe", label: "Externe (autre établissement)" },
        ]} />
        <Input name="dateTransfert" label="Date et heure" type="datetime-local" required />
        <Select name="serviceCible" label="Service de destination" placeholder="Sélectionner" options={[
          { value: "cardio", label: "Cardiologie" },
          { value: "reanimation", label: "Réanimation" },
          { value: "chirurgie", label: "Chirurgie" },
          { value: "maternite", label: "Maternité" },
        ]} />
        <Input name="litCible" label="Chambre / Lit cible" placeholder="Ex. C-204 / Lit 2" />
      </div>
      <div className="mt-4">
        <Textarea name="motif" label="Motif du transfert" placeholder="Justification médicale du transfert…" />
      </div>
    </FormSection>

    <aside className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50 p-5 lg:sticky lg:top-6">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Localisation actuelle</p>
      <p className="text-sm font-semibold text-slate-800 mt-1">{admission.encounter?.currentDepartment ?? admission.department ?? "—"}</p>
      <p className="text-[12px] text-slate-500">
        {admission.encounter?.currentRoom ?? "—"} · {admission.encounter?.currentBed ?? "—"}
      </p>
      <div className="mt-5 flex flex-col gap-2">
        <Button type="submit" leftIcon="transfer" className="w-full">Valider le transfert</Button>
        <Link href={`/admissions/${admission.id}`}>
          <Button type="button" variant="outline" className="w-full">Annuler</Button>
        </Link>
      </div>
    </aside>
  </form>
);
