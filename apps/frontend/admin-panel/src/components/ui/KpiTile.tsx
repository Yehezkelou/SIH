import React from 'react';
import { Icon, type IconName } from '@/components/layout/icons';

export function KpiTile({ label, value, icon }: { label: string; value: string; icon: IconName }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-surface p-5 shadow-card">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-text">{value}</p>
        <p className="text-sm text-muted">{label}</p>
      </div>
    </div>
  );
}
