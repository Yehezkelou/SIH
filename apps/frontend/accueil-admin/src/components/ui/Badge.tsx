import React from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "slate" | "emerald" | "sky" | "amber" | "rose" | "violet" | "indigo";

const tones: Record<BadgeTone, string> = {
  slate: "bg-slate-100 text-slate-600 border-slate-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  sky: "bg-sky-50 text-sky-700 border-sky-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
  violet: "bg-violet-50 text-violet-700 border-violet-200",
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

export interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
}

export const Badge = ({ children, tone = "slate", dot, className }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-semibold whitespace-nowrap",
      tones[tone],
      className
    )}
  >
    {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
    {children}
  </span>
);
