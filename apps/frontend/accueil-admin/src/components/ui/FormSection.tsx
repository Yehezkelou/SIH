import React from "react";
import { Icon, IconName } from "@/components/ui/Icon";

export const FormSection = ({
  step,
  title,
  description,
  icon,
  children,
}: {
  step?: number;
  title: string;
  description?: string;
  icon: IconName;
  children: React.ReactNode;
}) => (
  <section className="bg-white border border-slate-200 rounded-xl shadow-sm shadow-slate-200/50">
    <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
      <span className="grid place-items-center w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
        <Icon name={icon} size={18} />
      </span>
      <div>
        <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          {step && (
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 rounded-full w-5 h-5 grid place-items-center">
              {step}
            </span>
          )}
          {title}
        </h3>
        {description && <p className="text-[12px] text-slate-400 mt-0.5">{description}</p>}
      </div>
    </div>
    <div className="p-5">{children}</div>
  </section>
);
