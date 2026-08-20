"use client";

import React, { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon, IconName } from "./Icon";

export interface TabItem {
  id: string;
  label: string;
  icon?: IconName;
  badge?: string | number;
  content: React.ReactNode;
}

export const Tabs = ({ items, defaultId }: { items: TabItem[]; defaultId?: string }) => {
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  const current = items.find((i) => i.id === active) ?? items[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={cn(
                "relative flex items-center gap-2 px-3.5 py-2.5 text-[13px] font-medium transition-colors whitespace-nowrap -mb-px border-b-2",
                isActive
                  ? "text-emerald-700 border-emerald-600"
                  : "text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300"
              )}
            >
              {item.icon && <Icon name={item.icon} size={15} />}
              {item.label}
              {item.badge !== undefined && (
                <span
                  className={cn(
                    "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                    isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div>{current?.content}</div>
    </div>
  );
};
