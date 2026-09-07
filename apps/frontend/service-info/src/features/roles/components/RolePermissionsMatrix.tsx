'use client';

import React from 'react';
import {
    HeartPulse,
    BedDouble,
    Flame,
    Users,
    ShieldCheck,
    Activity,
    Key,
    Check,
} from 'lucide-react';
import { Permission } from '../schema';
import { groupPermissionsByDomain, formatActionLabel } from '../utils/rbacHelpers';

interface RolePermissionsMatrixProps {
    allPermissions: Permission[];
    selectedPermissionIds: string[];
    onChange: (selectedIds: string[]) => void;
    readOnly?: boolean;
}

const DOMAIN_ICONS: Record<string, React.ElementType> = {
    HeartPulse,
    BedDouble,
    Flame,
    Users,
    ShieldCheck,
    Activity,
    Key,
};

function getActionColorBadge(action: string) {
    switch (action.toUpperCase()) {
        case 'CREATE':
            return 'bg-success/15 text-success-text border-success/20';
        case 'READ':
            return 'bg-info/15 text-info-text border-info/20';
        case 'UPDATE':
            return 'bg-warning/15 text-warning-text border-warning/20';
        case 'DELETE':
            return 'bg-danger/15 text-danger-text border-danger/20';
        default:
            return 'bg-primary/10 text-primary border-primary/20';
    }
}

export function RolePermissionsMatrix({
    allPermissions,
    selectedPermissionIds,
    onChange,
    readOnly = false,
}: RolePermissionsMatrixProps) {
    const domainGroups = groupPermissionsByDomain(allPermissions);

    const togglePermission = (id: string) => {
        if (readOnly) return;
        if (selectedPermissionIds.includes(id)) {
            onChange(selectedPermissionIds.filter((pId) => pId !== id));
        } else {
            onChange([...selectedPermissionIds, id]);
        }
    };

    const toggleDomainAll = (groupPermissions: Permission[]) => {
        if (readOnly) return;
        const groupIds = groupPermissions.map((p) => p.id);
        const allSelected = groupIds.every((id) => selectedPermissionIds.includes(id));

        if (allSelected) {
            // Décocher tout le groupe
            onChange(selectedPermissionIds.filter((id) => !groupIds.includes(id)));
        } else {
            // Cocher tout le groupe
            const newIds = new Set([...selectedPermissionIds, ...groupIds]);
            onChange(Array.from(newIds));
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border/8">
                <div>
                    <h4 className="text-xs font-semibold text-surface-text">
                        Matrice des habilitations hospitalières
                    </h4>
                    <p className="text-[11px] text-muted">
                        {selectedPermissionIds.length} sur {allPermissions.length} permissions accordées
                    </p>
                </div>

                {!readOnly && (
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => onChange(allPermissions.map((p) => p.id))}
                            className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                        >
                            Tout cocher
                        </button>
                        <span className="text-muted text-[10px]">•</span>
                        <button
                            type="button"
                            onClick={() => onChange([])}
                            className="text-[11px] font-semibold text-muted hover:text-danger cursor-pointer"
                        >
                            Tout désélectionner
                        </button>
                    </div>
                )}
            </div>

            {/* Liste des domaines hospitaliers */}
            <div className="space-y-3">
                {domainGroups.map((group) => {
                    const IconComponent = DOMAIN_ICONS[group.iconName] || Key;
                    const groupIds = group.permissions.map((p) => p.id);
                    const selectedInGroup = groupIds.filter((id) =>
                        selectedPermissionIds.includes(id)
                    ).length;
                    const isAllSelected = selectedInGroup === groupIds.length && groupIds.length > 0;

                    return (
                        <div
                            key={group.domainKey}
                            className="border border-border/8 rounded-2xl p-4 bg-page/40 space-y-3"
                        >
                            {/* En-tête du pôle médical */}
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-surface border border-border/8 text-primary flex items-center justify-center shrink-0">
                                        <IconComponent size={16} />
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-bold text-surface-text">
                                            {group.label}
                                        </h5>
                                        <p className="text-[10px] text-muted">
                                            {group.description}
                                        </p>
                                    </div>
                                </div>

                                {!readOnly && (
                                    <button
                                        type="button"
                                        onClick={() => toggleDomainAll(group.permissions)}
                                        className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-colors cursor-pointer ${
                                            isAllSelected
                                                ? 'bg-primary/10 text-primary border-primary/20'
                                                : 'bg-surface text-muted border-border/8 hover:text-surface-text'
                                        }`}
                                    >
                                        {isAllSelected ? 'Tout désélectionner' : 'Tout autoriser'}
                                    </button>
                                )}
                            </div>

                            {/* Grille des permissions du pôle */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                {group.permissions.map((perm) => {
                                    const isChecked = selectedPermissionIds.includes(perm.id);

                                    return (
                                        <button
                                            key={perm.id}
                                            type="button"
                                            role="checkbox"
                                            aria-checked={isChecked}
                                            aria-label={`${formatActionLabel(String(perm.action))} — ${perm.description || perm.code}`}
                                            disabled={readOnly}
                                            onClick={() => togglePermission(perm.id)}
                                            className={`w-full text-left flex items-start gap-2.5 p-2.5 rounded-xl border transition-all select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                                                readOnly ? 'cursor-default' : 'cursor-pointer'
                                            } ${
                                                isChecked
                                                    ? 'bg-surface border-primary/40 shadow-xs'
                                                    : 'bg-surface/50 border-border/8 hover:border-border/12 opacity-80'
                                            }`}
                                        >
                                            <div
                                                className={`w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center transition-colors shrink-0 ${
                                                    isChecked
                                                        ? 'bg-primary border-primary text-primary-text'
                                                        : 'border-border/12 bg-page'
                                                }`}
                                            >
                                                {isChecked && <Check size={11} strokeWidth={3} />}
                                            </div>

                                            <div className="min-w-0 flex-1 space-y-0.5">
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    <span
                                                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase ${getActionColorBadge(
                                                            String(perm.action)
                                                        )}`}
                                                    >
                                                        {formatActionLabel(String(perm.action))}
                                                    </span>
                                                    <span className="font-mono text-[10px] text-muted truncate">
                                                        {perm.code}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-surface-text leading-tight">
                                                    {perm.description || perm.code}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RolePermissionsMatrix;
