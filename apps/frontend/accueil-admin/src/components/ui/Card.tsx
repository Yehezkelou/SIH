import React from "react";
import { cn } from "@/lib/cn";
import { Icon, IconName } from "./Icon";

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50", className)}>
    {children}
  </div>
);

export const CardHeader = ({
  title,
  subtitle,
  icon,
  action,
}: {
  title: string;
  subtitle?: string;
  icon?: IconName;
  action?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100">
    <div className="flex items-center gap-2.5 min-w-0">
      {icon && (
        <span className="grid place-items-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
          <Icon name={icon} size={16} />
        </span>
      )}
      <div className="min-w-0">
        <h3 className="text-[13px] font-semibold text-slate-800 truncate">{title}</h3>
        {subtitle && <p className="text-[11px] text-slate-400 truncate">{subtitle}</p>}
      </div>
    </div>
    {action}
  </div>
);

export const CardBody = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("p-4", className)}>{children}</div>
);
