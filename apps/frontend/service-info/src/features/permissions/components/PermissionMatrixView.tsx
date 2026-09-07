'use client';

import React from 'react';
import { Check, Minus, Shield, ShieldAlert } from 'lucide-react';
import { Role, PermissionMatrixRow } from '../schema';
import { getActionVisual } from '../utils/permissionAuditHelpers';

interface PermissionMatrixViewProps {
    roles: Role[];
    matrixRows: PermissionMatrixRow[];
}

export function PermissionMatrixView({ roles, matrixRows }: PermissionMatrixViewProps) {
    return (
        <div className="bg-surface border border-border/8 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto max-h-[70vh] relative">
                <table className="w-full text-left text-xs border-collapse">
                    {/* En-tête du tableau : Rôles en colonnes */}
                    <thead className="sticky top-0 z-20 bg-surface border-b border-border/12 shadow-xs">
                        <tr>
                            <th className="p-3.5 font-bold text-surface-text bg-surface sticky left-0 z-30 min-w-[260px] border-r border-border/8">
                                <div className="flex items-center gap-1.5">
                                    <Shield size={14} className="text-primary" />
                                    <span>Permissions système ({matrixRows.length})</span>
                                </div>
                            </th>
                            {roles.map((role) => (
                                <th
                                    key={role.id}
                                    className="p-3.5 font-bold text-surface-text text-center min-w-[140px] max-w-[180px] border-r border-border/6 last:border-r-0"
                                >
                                    <div className="space-y-0.5">
                                        <p className="truncate" title={role.libelle}>
                                            {role.libelle}
                                        </p>
                                        <span
                                            className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                                                role.isSystem
                                                    ? 'bg-page text-muted border border-border/8'
                                                    : 'bg-primary/10 text-primary border border-primary/20'
                                            }`}
                                        >
                                            {role.isSystem ? 'Système' : 'Personnalisé'}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Corps du tableau */}
                    <tbody className="divide-y divide-border/6">
                        {matrixRows.length === 0 ? (
                            <tr>
                                <td colSpan={roles.length + 1} className="p-8 text-center text-muted">
                                    Aucune permission ne correspond aux filtres appliqués.
                                </td>
                            </tr>
                        ) : (
                            matrixRows.map((row) => {
                                const { permission, rolesMap } = row;
                                const actionVisual = getActionVisual(String(permission.action));

                                return (
                                    <tr
                                        key={permission.id}
                                        className="hover:bg-hover/4 transition-colors group"
                                    >
                                        {/* Colonne Permission (sticky à gauche) */}
                                        <td className="p-3 bg-surface group-hover:bg-hover/4 sticky left-0 z-10 border-r border-border/8 space-y-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="font-mono font-bold text-[11px] text-surface-text">
                                                    {permission.code}
                                                </span>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    {permission.sensitivity === 'critical' && (
                                                        <ShieldAlert
                                                            size={12}
                                                            className="text-rose-500"
                                                            title="Permission critique"
                                                        />
                                                    )}
                                                    <span
                                                        className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${actionVisual.bg} ${actionVisual.text} ${actionVisual.border}`}
                                                    >
                                                        {actionVisual.label}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-muted truncate max-w-[240px]" title={permission.description}>
                                                {permission.description}
                                            </p>
                                        </td>

                                        {/* Colonnes Rôles */}
                                        {roles.map((role) => {
                                            const hasPermission = Boolean(rolesMap[role.id]);

                                            return (
                                                <td
                                                    key={role.id}
                                                    className="p-3 text-center border-r border-border/6 last:border-r-0"
                                                >
                                                    {hasPermission ? (
                                                        <span
                                                            className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                                            title={`${role.libelle} détient ${permission.code}`}
                                                        >
                                                            <Check size={14} strokeWidth={2.5} />
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className="inline-flex items-center justify-center w-6 h-6 text-muted/30"
                                                            title={`${role.libelle} n'a pas accès à ${permission.code}`}
                                                        >
                                                            <Minus size={12} />
                                                        </span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
