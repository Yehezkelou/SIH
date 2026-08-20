"use client";

import React from "react";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Search, Printer } from "lucide-react";

interface FilterBarProps {
  onSearch?: () => void;
  onPrint?: () => void;
}

export const FilterBar = ({ onSearch, onPrint }: FilterBarProps) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-xs border border-slate-200 flex flex-wrap items-center justify-between text-xs gap-4">
      <div className="flex items-center gap-4">
        <DatePicker label="Période du" required />
        <DatePicker label="Au" required />
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="primary" 
          size="sm" 
          onClick={onSearch}
          leftIcon={<Search className="w-3.5 h-3.5" />}
        >
          Afficher
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onPrint}
          leftIcon={<Printer className="w-3.5 h-3.5" />}
        >
          Imprimer
        </Button>
      </div>
    </div>
  );
};