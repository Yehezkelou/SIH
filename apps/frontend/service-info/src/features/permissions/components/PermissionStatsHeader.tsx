'use client';

import React from 'react';
import { KeyRound, Layers, ShieldAlert, ShieldCheck } from 'lucide-react';
import { PermissionStats } from '../schema';

interface PermissionStatsHeaderProps {
    stats: PermissionStats;
}

export function PermissionStatsHeader({ stats }: PermissionStatsHeaderProps) {
    const kpis = [
        {
            label: 'Permissions actives',
            value: stats.totalPermissions,
            icon: KeyRound,
            accent: 'text-primary bg-primary/10',
        },
        {
            label: 'Pôles protégés',
            value: stats.totalDomains,
            icon: Layers,
            accent: 'text-sky-500 bg-sky-500/10',
        },
        {
            label: 'Privilèges sensibles',
            value: stats.criticalCount + stats.highCount,
            icon: ShieldAlert,
            accent: 'text-rose-500 bg-rose-500/10',
        },
        {
            label: 'Profils de rôles',
            value: stats.totalRoles,
            icon: ShieldCheck,
            accent: 'text-emerald-500 bg-emerald-500/10',
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {kpis.map((kpi, idx) => {
                const Icon = kpi.icon;
                return (
                    <div
                        key={idx}
                        className="bg-surface border border-border/8 rounded-xl px-3 py-2 flex items-center gap-2.5 shadow-2xs hover:border-border/15 transition-colors"
                    >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${kpi.accent}`}>
                            <Icon size={14} />
                        </div>
                        <div className="min-w-0 leading-tight">
                            <span className="text-[11px] text-muted block truncate font-medium">{kpi.label}</span>
                            <span className="text-sm font-bold text-surface-text">{kpi.value}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
