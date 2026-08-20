"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Filter } from "lucide-react";

export interface PatientRecord {
  id: string;
  folderNumber: string;
  patientName: string;
  provenance: string;
  arrivalTime: string;
  careTime: string;
  waitTimeMinutes: number;
}

interface PatientWaitTimeTableProps {
  data?: PatientRecord[];
}

export const PatientWaitTimeTable = ({ data = [] }: PatientWaitTimeTableProps) => {
  return (
    <div className="flex-1 bg-white border border-slate-200 rounded-lg flex flex-col justify-between overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
            <tr>
              <th className="p-2.5 border-r border-slate-200">N° Dossier</th>
              <th className="p-2.5 border-r border-slate-200">Patient</th>
              <th className="p-2.5 border-r border-slate-200">Provenance</th>
              <th className="p-2.5 border-r border-slate-200">HA (Heure arrivé)</th>
              <th className="p-2.5 border-r border-slate-200">HP (Heure prise en charge)</th>
              <th className="p-2.5 border-r border-slate-200">TA (mn)</th>
              <th className="p-2.5 text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  leftIcon={<FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />}
                >
                  Exporter
                </Button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-2.5 border-r font-medium text-slate-800">{row.folderNumber}</td>
                  <td className="p-2.5 border-r">{row.patientName}</td>
                  <td className="p-2.5 border-r">{row.provenance}</td>
                  <td className="p-2.5 border-r">{row.arrivalTime}</td>
                  <td className="p-2.5 border-r">{row.careTime}</td>
                  <td className="p-2.5 border-r font-bold text-sky-700">{row.waitTimeMinutes} min</td>
                  <td className="p-2.5 text-right">
                    <Button variant="ghost" size="sm">Détails</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center italic text-slate-400" colSpan={7}>
                  <div className="flex flex-col items-center justify-center gap-1.5 py-8">
                    <Filter className="w-6 h-6 text-slate-300" />
                    <span>Aucune donnée disponible pour cette période...</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};