import React from "react";
import { cn } from "@/lib/cn";
import { Icon, IconName } from "./Icon";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: IconName;
  tone?: "emerald" | "sky" | "amber" | "rose" | "violet";
  trend?: { value: string; up?: boolean };
  hint?: string;
}

const tones = {
  emerald: "bg-emerald-50 text-emerald-600",
  sky: "bg-sky-50 text-sky-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
  violet: "bg-violet-50 text-violet-600",
};

export const StatCard = ({ label, value, icon, tone = "emerald", trend, hint }: StatCardProps) => (
  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm shadow-slate-200/50 flex flex-col gap-3">
    <div className="flex items-start justify-between">
      <span className={cn("grid place-items-center w-10 h-10 rounded-lg", tones[tone])}>
        <Icon name={icon} size={19} />
      </span>
      {trend && (
        <span
          className={cn(
            "text-[11px] font-semibold px-1.5 py-0.5 rounded-md",
            trend.up ? "text-emerald-700 bg-emerald-50" : "text-rose-600 bg-rose-50"
          )}
        >
          {trend.up ? "▲" : "▼"} {trend.value}
        </span>
      )}
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-800 leading-none tracking-tight">{value}</p>
      <p className="text-[12px] text-slate-500 mt-1.5 font-medium">{label}</p>
      {hint && <p className="text-[11px] text-slate-400 mt-0.5">{hint}</p>}
    </div>
  </div>
);
