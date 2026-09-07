'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Mail, Building2, Clock } from 'lucide-react';
import { AgentUser } from '../schema';
import { PersonnelStatusBadge } from './PersonnelStatusBadge';
import { PersonnelStateCard } from './PersonnelStateCard';
import { ROUTES } from '@/config/routes';

interface PersonnelTableProps {
    agents: AgentUser[];
    isLoading: boolean;
    onToggleStatus?: (agent: AgentUser) => void;
}

// Formatage propre du type de personnel
const formatPersonnelType = (type: string) => {
    const map: Record<string, string> = {
        MEDECIN: 'Médecin',
        INFIRMIER: 'Infirmier(ère)',
        AIDE_SOIGNANT: 'Aide-soignant(e)',
        SAGE_FEMME: 'Sage-femme',
        AGENT_ADMISSION: "Agent d'admission",
        SECRETAIRE_MEDICALE: 'Secrétaire médicale',
        PHARMACIEN: 'Pharmacien(ne)',
        TECHNICIEN_LABO: 'Technicien labo',
        BRANCARDIER: 'Brancardier',
        CAISSIER: 'Caissier(ère)',
        ADMIN: 'Administrateur',
        SUPER_ADMIN: 'Super Admin',
        AUTRE: 'Autre',
    };
    return map[type] || type;
};

// Formatage de la date de dernière connexion
const formatLastLogin = (dateStr?: string | null) => {
    if (!dateStr) return 'Jamais connecté';
    try {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    } catch {
        return 'Date invalide';
    }
};

export function PersonnelTable({ agents, isLoading, onToggleStatus }: PersonnelTableProps) {
    // Calcul des initiales pour l'avatar
    const getInitials = (nom: string, prenom: string) => {
        const n = nom ? nom.trim()[0] : '';
        const p = prenom ? prenom.trim()[0] : '';
        return `${n}${p}`.toUpperCase() || 'AG';
    };

    // 1. ÉTAT DE CHARGEMENT (SKELETON)
    if (isLoading) {
        return (
            <div className="bg-surface border border-border/8 rounded-2xl overflow-hidden shadow-xs">
                <div className="p-4 space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-3 gap-4 animate-pulse">
                            <div className="flex items-center gap-3 flex-1">
                                <div className="w-10 h-10 rounded-xl bg-hover/6 shrink-0" />
                                <div className="space-y-2 flex-1">
                                    <div className="w-40 h-3.5 bg-hover/6 rounded" />
                                    <div className="w-56 h-2.5 bg-hover/6 rounded" />
                                </div>
                            </div>
                            <div className="w-28 h-4 bg-hover/6 rounded" />
                            <div className="w-24 h-6 bg-hover/6 rounded-full" />
                            <div className="w-24 h-6 bg-hover/6 rounded-full" />
                            <div className="w-8 h-8 bg-hover/6 rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // 2. ÉTAT VIDE (AUCUN RÉSULTAT)
    if (!agents || agents.length === 0) {
        return (
            <PersonnelStateCard
                variant="empty"
                title="Aucun membre du personnel trouvé"
                description="Aucun agent ne correspond aux filtres sélectionnés. Essayez de réinitialiser la recherche ou de changer les critères."
            />
        );
    }

    // 3. TABLEAU DES AGENTS
    return (
        <div className="bg-surface border border-border/8 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border/8 text-[11px] font-semibold text-muted uppercase tracking-wider bg-page/50">
                            <th className="py-3.5 px-4">Agent</th>
                            <th className="py-3.5 px-4">Matricule & Service</th>
                            <th className="py-3.5 px-4">Métier & Spécialité</th>
                            <th className="py-3.5 px-4">Statut & Présence</th>
                            <th className="py-3.5 px-4">Dernière activité</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/8 text-xs">
                        {agents.map((agent) => (
                            <tr
                                key={agent.id}
                                className="hover:bg-hover/4 transition-colors group"
                            >
                                {/* 1. Identité Agent (Avatar + Nom/Prénom + Email) */}
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-primary/8 text-primary-text font-bold text-xs flex items-center justify-center shrink-0 border border-border/8">
                                            {getInitials(agent.nom, agent.prenom)}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-semibold text-surface-text truncate group-hover:text-primary-text transition-colors">
                                                {agent.nom.toUpperCase()} {agent.prenom}
                                            </div>
                                            <div className="text-[11px] text-muted flex items-center gap-1.5 truncate">
                                                <Mail size={11} className="shrink-0" />
                                                <span className="truncate">{agent.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* 2. Matricule & Service */}
                                <td className="py-3 px-4">
                                    <div className="inline-block font-mono text-[11px] px-2 py-0.5 rounded-md bg-page border border-border/8 text-surface-text font-semibold">
                                        {agent.matricule}
                                    </div>
                                    <div className="text-[11px] text-muted flex items-center gap-1 mt-1 truncate">
                                        <Building2 size={11} className="shrink-0" />
                                        <span className="truncate">{agent.serviceAffectation || 'Non affecté'}</span>
                                    </div>
                                </td>

                                {/* 3. Métier & Spécialité */}
                                <td className="py-3 px-4">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-hover/6 text-surface-text border border-border/8">
                                        {formatPersonnelType(agent.personnelType)}
                                    </span>
                                    {agent.specialite && (
                                        <div className="text-[11px] text-muted mt-1 truncate">
                                            {agent.specialite}
                                        </div>
                                    )}
                                </td>

                                {/* 4. Statut & Session (utilise PersonnelStatusBadge) */}
                                <td className="py-3 px-4">
                                    <PersonnelStatusBadge
                                        status={agent.status}
                                        isConnected={agent.isConnected}
                                    />
                                </td>

                                {/* 5. Dernière connexion */}
                                <td className="py-3 px-4 text-muted">
                                    <div className="flex items-center gap-1.5 text-[11px]">
                                        <Clock size={12} className="shrink-0" />
                                        <span>{formatLastLogin(agent.lastLoginAt)}</span>
                                    </div>
                                </td>

                                {/* 6. Actions */}
                                <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                        <Link
                                            href={ROUTES.PERSONNEL_DETAIL(agent.id)}
                                            title="Consulter la fiche agent"
                                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium 
                                            text-surface-text bg-hover/6 hover:bg-primary/8 hover:text-primary-text 
                                            border border-border/8 transition-colors"
                                        >
                                            <Eye size={13} />
                                            <span className="hidden md:inline">Voir</span>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PersonnelTable;
