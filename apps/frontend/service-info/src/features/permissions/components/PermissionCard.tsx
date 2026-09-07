'use client';

import React from 'react';
import { Shield, ShieldAlert, Users, Lock } from 'lucide-react';
import { PermissionAuditItem } from '../schema';
import { getActionVisual } from '../utils/permissionAuditHelpers';

interface PermissionCardProps {
    permission: PermissionAuditItem;
}

export function PermissionCard({ permission }: PermissionCardProps) {
    const actionVisual = getActionVisual(String(permission.action));

    return (
        <div className="bg-surface border border-border/8 rounded-2xl p-4 space-y-3.5 hover:border-border/15 transition-all shadow-xs flex flex-col justify-between">
            {/* Haut de la carte : Code technique et badges d'action */}
            <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-surface-text bg-page px-2.5 py-1 rounded-lg border border-border/8 inline-block break-all">
                        {permission.code}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                        {/* Badge de sensibilité critique */}
                        {permission.sensitivity === 'critical' && (
                            <span
                                className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center gap-1"
                                title="Action critique ou irréversible"
                            >
                                <ShieldAlert size={11} />
                                <span>Critique</span>
                            </span>
                        )}

                        {/* Badge Verbe / Action */}
                        <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${actionVisual.bg} ${actionVisual.text} ${actionVisual.border}`}
                        >
                            {actionVisual.label}
                        </span>
                    </div>
                </div>

                {/* Description de l'autorisation */}
                <p className="text-xs text-muted leading-relaxed">
                    {permission.description || 'Aucune description disponible pour cette permission.'}
                </p>
            </div>

            {/* Bas de la carte : Rôles détenteurs */}
            <div className="pt-3 border-t border-border/6 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-muted">
                    <span className="font-semibold flex items-center gap-1">
                        <Shield size={12} className="text-primary" />
                        <span>Rôles habilités ({permission.assignedRolesCount})</span>
                    </span>
                    {permission.assignedUsersCount > 0 && (
                        <span className="flex items-center gap-1 text-[10px] text-muted/80">
                            <Users size={11} />
                            <span>{permission.assignedUsersCount} agent(s)</span>
                        </span>
                    )}
                </div>

                <div className="flex items-center flex-wrap gap-1.5">
                    {permission.roles.length === 0 ? (
                        <span className="text-[10px] font-medium text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Lock size={10} />
                            <span>Non attribuée à un rôle</span>
                        </span>
                    ) : (
                        permission.roles.map((role) => (
                            <span
                                key={role.id}
                                className={`text-[10px] font-medium px-2 py-0.5 rounded-md border transition-colors ${
                                    role.isSystem
                                        ? 'bg-page text-surface-text border-border/12'
                                        : 'bg-primary/5 text-primary border-primary/20'
                                }`}
                                title={role.description || role.libelle}
                            >
                                {role.libelle}
                            </span>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
