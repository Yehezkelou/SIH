'use client';

import React from 'react';
import { KeyRound, Lock, ShieldCheck, Smartphone, Wifi, History, AlertTriangle } from 'lucide-react';
import { AgentUser } from '../schema';
import { formatDateTime, isLockActive } from '../utils/personnelActions';

interface PersonnelSecurityPanelProps {
    agent: AgentUser;
}

function Row({
    icon: Icon,
    label,
    children,
    tone = 'default',
}: {
    icon: React.ElementType;
    label: string;
    children: React.ReactNode;
    tone?: 'default' | 'warning' | 'danger' | 'success';
}) {
    const toneClass = {
        default: 'text-surface-text',
        warning: 'text-warning-text',
        danger: 'text-danger-text',
        success: 'text-success-text',
    }[tone];

    return (
        <div className="flex items-center justify-between gap-3 py-2.5 border-b border-border/8 last:border-0">
            <span className="flex items-center gap-2 text-xs text-muted min-w-0">
                <Icon size={14} className="shrink-0" />
                <span className="truncate">{label}</span>
            </span>
            <span className={`text-xs font-semibold text-right shrink-0 ${toneClass}`}>
                {children}
            </span>
        </div>
    );
}

export function PersonnelSecurityPanel({ agent }: PersonnelSecurityPanelProps) {
    const locked = isLockActive(agent);
    const failedLogins = agent.failedLoginAttempts ?? 0;
    const failedPins = agent.failedPinAttempts ?? 0;

    return (
        <div className="bg-surface border border-border/8 rounded-2xl p-5 shadow-xs space-y-1">
            <div className="flex items-center gap-2 pb-3 border-b border-border/8 mb-1">
                <ShieldCheck size={16} className="text-primary" />
                <h2 className="text-sm font-bold text-surface-text">Sécurité & accès</h2>
            </div>

            {locked && (
                <div className="flex items-start gap-2 p-3 my-2 rounded-xl bg-danger/10 border border-danger/20 text-danger-text text-[11px]">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                    <span>
                        Compte verrouillé jusqu'au {formatDateTime(agent.lockedUntil)}, à la suite
                        d'échecs d'authentification répétés.
                    </span>
                </div>
            )}

            <Row
                icon={Smartphone}
                label="Double authentification (MFA)"
                tone={agent.mfaEnabled ? 'success' : 'warning'}
            >
                {agent.mfaEnabled ? `Activée · ${agent.mfaMethod || 'TOTP'}` : 'Désactivée'}
            </Row>

            <Row icon={KeyRound} label="Code PIN" tone={agent.pinEnabled ? 'success' : 'default'}>
                {agent.pinEnabled ? 'Configuré' : 'Non configuré'}
            </Row>

            <Row
                icon={Lock}
                label="Changement de mot de passe requis"
                tone={agent.mustChangePassword ? 'warning' : 'default'}
            >
                {agent.mustChangePassword ? 'Oui' : 'Non'}
            </Row>

            <Row icon={History} label="Dernier changement de mot de passe">
                {formatDateTime(agent.passwordChangedAt)}
            </Row>

            <Row
                icon={AlertTriangle}
                label="Échecs de connexion"
                tone={failedLogins > 0 ? 'warning' : 'default'}
            >
                {failedLogins} mot de passe · {failedPins} PIN
            </Row>

            <Row icon={Wifi} label="Sessions actives" tone={agent.isConnected ? 'success' : 'default'}>
                {agent.activeSessionsCount ?? (agent.isConnected ? 1 : 0)}
            </Row>

            <Row icon={History} label="Dernière connexion">
                {formatDateTime(agent.lastLoginAt)}
                {agent.lastLoginIp && (
                    <span className="block font-mono text-[10px] text-muted font-normal">
                        {agent.lastLoginIp}
                    </span>
                )}
            </Row>
        </div>
    );
}

export default PersonnelSecurityPanel;
