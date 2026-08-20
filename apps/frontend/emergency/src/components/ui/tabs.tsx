"use client";

import React, { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export const Tabs = ({
  tabs,
  defaultTabId,
  onChange,
  variant = "primary",
  className,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);

  const handleSelect = (id: string) => {
    setActiveTab(id);
    if (onChange) onChange(id);
  };

  return (
    <div className={cn("grid w-full gap-0.5 text-xs font-bold", className)}>
      <div className={`grid grid-cols-${tabs.length}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          const primaryStyles = isActive
            ? "bg-sky-600 text-white shadow-xs"
            : "bg-slate-400 text-white hover:bg-slate-500";

          const secondaryStyles = isActive
            ? "bg-sky-500 text-white shadow-xs"
            : "bg-slate-200 text-slate-700 hover:bg-slate-300";

          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={cn(
                "py-2 px-3 text-center transition-colors cursor-pointer flex items-center justify-center gap-2",
                variant === "primary" ? primaryStyles : secondaryStyles
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};