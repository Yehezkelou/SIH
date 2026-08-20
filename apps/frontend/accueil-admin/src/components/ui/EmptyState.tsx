import React from "react";
import { Icon, IconName } from "./Icon";

export const EmptyState = ({
  icon = "clipboard",
  title,
  description,
  action,
}: {
  icon?: IconName;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) => (
  <div className="flex flex-col items-center justify-center text-center gap-2 py-14 px-6">
    <span className="grid place-items-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-1">
      <Icon name={icon} size={22} />
    </span>
    <p className="text-sm font-semibold text-slate-700">{title}</p>
    {description && <p className="text-[12px] text-slate-400 max-w-xs">{description}</p>}
    {action && <div className="mt-2">{action}</div>}
  </div>
);
