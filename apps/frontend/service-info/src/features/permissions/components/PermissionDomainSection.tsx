'use client';

import React from 'react';
import {
    Users,
    BedDouble,
    Activity,
    UserCheck,
    Shield,
    FileText,
    KeyRound,
} from 'lucide-react';
import { DomainAuditGroup } from '../schema';
import { PermissionCard } from './PermissionCard';

interface PermissionDomainSectionProps {
    group: DomainAuditGroup;
}

const ICON_MAP: Record<string, React.ElementType> = {
    Users,
    BedDouble,
    Activity,
    UserCheck,
    Shield,
    FileText,
    KeyRound,
};

export function PermissionDomainSection({ group }: PermissionDomainSectionProps) {
    const Icon = ICON_MAP[group.iconName] || KeyRound;

    return (
        <section className="space-y-3.5">
            {/* Entête de section domaine */}
            <div className="flex items-center justify-between pb-2 border-b border-border/8">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Icon size={16} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-surface-text">{group.label}</h2>
                            <span className="text-[11px] font-semibold text-muted bg-page px-2 py-0.5 rounded-full border border-border/8">
                                {group.permissions.length}
                            </span>
                        </div>
                        <p className="text-[11px] text-muted">{group.description}</p>
                    </div>
                </div>
            </div>

            {/* Grille de cartes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {group.permissions.map((perm) => (
                    <PermissionCard key={perm.id} permission={perm} />
                ))}
            </div>
        </section>
    );
}
