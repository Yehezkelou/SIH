import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export interface Crumb {
  label: string;
  href?: string;
}

export const PageHeader = ({
  title,
  description,
  breadcrumbs,
  actions,
}: {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  actions?: React.ReactNode;
}) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div className="min-w-0">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-[12px] text-slate-400 mb-1.5">
          {breadcrumbs.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <Icon name="chevronRight" size={13} className="text-slate-300" />}
              {c.href ? (
                <Link href={c.href} className="hover:text-emerald-600 transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-slate-500 font-medium">{c.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
      <h1 className="text-xl font-bold text-slate-800 tracking-tight truncate">{title}</h1>
      {description && <p className="text-[13px] text-slate-500 mt-0.5">{description}</p>}
    </div>
    {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
  </div>
);
