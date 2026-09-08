'use client';

import React from 'react';
import { Shield, Lock, KeyRound, CalendarClock } from 'lucide-react';
import { AgentUser } from '../schema';
import { formatDateTime } from '../utils/personnelActions';

interface PersonnelRolesPanelProps {
    agent: AgentUser;
}

export function PersonnelRolesPanel({ agent }: PersonnelRolesPanelProps) {
    const userRoles = agent.userRoles || [];

    return (
        <div className="bg-surface border border-border/8 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/8">
                <div className="flex items-center gap-2">
                    <Shield size={16} className="text-primary" />
                    <h2 className="text-sm font-bold text-surface-text">Rôles attribués</h2>
                </div>
                <span className="text-[11px] text-muted">
                    {userRoles.length} rôle{userRoles.length > 1 ? 's' : ''}
                </span>
            </div>

            {userRoles.length === 0 ? (
                <p className="text-xs text-muted py-3 text-center">
                    Aucun rôle n'est attribué à cet agent : il n'a donc aucun droit dans le système.
                </p>
            ) : (
                <div className="space-y-2">
                    {userRoles.map((userRole) => {
                        const role = userRole.role;
                        const permissionCount = role?.rolePermissions?.length ?? 0;

                        return (
                            <div
                                key={userRole.id}
                                className="p-3 rounded-xl bg-page border border-border/8 space-y-1.5"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="text-xs font-semibold text-surface-text">
                                                {role?.libelle || 'Rôle inconnu'}
                                            </span>
                                            {role?.isSystem && (
                                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-warning/10 text-warning-text border border-warning/20">
                                                    <Lock size={9} /> Système
                                                </span>
                                            )}
                                        </div>
                                        <span className="font-mono text-[10px] text-muted uppercase">
                                            {role?.code}
                                        </span>
                                    </div>

                                    <span className="inline-flex items-center gap-1 text-[10px] text-muted shrink-0">
                                        <KeyRound size={10} />
                                        {permissionCount} droit{permissionCount > 1 ? 's' : ''}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 text-[10px] text-muted pt-1 border-t border-border/8">
                                    <span className="inline-flex items-center gap-1">
                                        <CalendarClock size={10} />
                                        Attribué le {formatDateTime(userRole.assignedAt, '—')}
                                    </span>
                                    {userRole.expiresAt && (
                                        <span className="text-warning-text">
                                            Expire le {formatDateTime(userRole.expiresAt, '—')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default PersonnelRolesPanel;
