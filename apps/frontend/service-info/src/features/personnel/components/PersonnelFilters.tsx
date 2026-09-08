'use client';

import React, { useState, useEffect } from 'react';
import {
    Search,
    X,
    RotateCcw,
    Briefcase,
    ShieldCheck,
    Wifi,
    WifiOff,
    Activity,
} from 'lucide-react';
import { QueryUsersParams, personnelType, UserStatus } from '../schema';
import { Select } from '@/components/ui/Select';

interface PersonnelFiltersProps {
    filters: QueryUsersParams;
    onChange: (updatedFilters: Partial<QueryUsersParams>) => void;
    onReset: () => void;
}

const PERSONNEL_TYPES: { value: personnelType; label: string }[] = [
    { value: 'MEDECIN', label: 'Médecin' },
    { value: 'INFIRMIER', label: 'Infirmier(ère)' },
    { value: 'AIDE_SOIGNANT', label: 'Aide-soignant(e)' },
    { value: 'SAGE_FEMME', label: 'Sage-femme' },
    { value: 'AGENT_ADMISSION', label: "Agent d'admission" },
    { value: 'SECRETAIRE_MEDICALE', label: 'Secrétaire médicale' },
    { value: 'PHARMACIEN', label: 'Pharmacien(ne)' },
    { value: 'TECHNICIEN_LABO', label: 'Technicien de labo' },
    { value: 'BRANCARDIER', label: 'Brancardier' },
    { value: 'CAISSIER', label: 'Caissier(ère)' },
    { value: 'ADMIN', label: 'Administrateur' },
    { value: 'SUPER_ADMIN', label: 'Super Admin' },
    { value: 'AUTRE', label: 'Autre' },
];

const USER_STATUSES: { value: UserStatus; label: string }[] = [
    { value: 'ACTIF', label: 'Actif' },
    { value: 'EN_ATTENTE_ACTIVATION', label: 'En attente' },
    { value: 'SUSPENDU', label: 'Suspendu' },
    { value: 'VERROUILLE', label: 'Verrouillé' },
    { value: 'INACTIF', label: 'Inactif' },
];

export function PersonnelFilters({ filters, onChange, onReset }: PersonnelFiltersProps) {
    // 1. État local pour le texte de recherche immédiat
    const [searchTerm, setSearchTerm] = useState<string>(filters.search || '');

    // 2. useEffect pour actualiser les filtres en temps réel avec un debounce de 300ms
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm !== (filters.search || '')) {
                onChange({ search: searchTerm.trim() ? searchTerm : undefined, page: 1 });
            }
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    // 3. Synchronisation si le filtre externe est réinitialisé (via onReset)
    useEffect(() => {
        setSearchTerm(filters.search || '');
    }, [filters.search]);

    const hasActiveFilters = Boolean(
        filters.search ||
        filters.personnelType ||
        filters.status ||
        filters.isConnected !== undefined
    );

    return (
        <div className="bg-surface border border-border/8 rounded-2xl p-4 shadow-sm space-y-4">
            
            {/* Ligne principale : Barre de recherche + bouton Réinitialiser */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                    <Search
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                    />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher en direct par nom, prénom, matricule ou email..."
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm bg-page border border-border/8 
                        text-surface-text placeholder:text-muted focus:outline-none focus:ring-2 
                        focus:ring-primary/30 focus:border-transparent transition-all"
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => setSearchTerm('')}
                            aria-label="Effacer la recherche"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-surface-text 
                            p-0.5 rounded-md hover:bg-hover/6 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Bouton Réinitialiser */}
                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold 
                        text-muted hover:text-surface-text bg-hover/6 border border-border/8 
                        hover:border-border/12 transition-all whitespace-nowrap"
                    >
                        <RotateCcw size={14} />
                        <span>Réinitialiser</span>
                    </button>
                )}
            </div>

            {/* Ligne des filtres avec icônes de couleur */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-border/8">
                {/* 1. Métier */}
                <Select
                    label="Corps de métier"
                    icon={Briefcase}
                    options={[{ value: '', label: 'Tous les métiers' }, ...PERSONNEL_TYPES]}
                    value={filters.personnelType || ''}
                    onChange={(e) =>
                        onChange({
                            personnelType: e.target.value ? (e.target.value as personnelType) : undefined,
                            page: 1,
                        })
                    }
                />

                {/* 2. Statut */}
                <Select
                    label="Statut du compte"
                    icon={ShieldCheck}
                    options={[{ value: '', label: 'Tous les statuts' }, ...USER_STATUSES]}
                    value={filters.status || ''}
                    onChange={(e) =>
                        onChange({
                            status: e.target.value ? (e.target.value as UserStatus) : undefined,
                            page: 1,
                        })
                    }
                />

                {/* 3. Session / Présence (avec boutons de couleur interactifs) */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-surface-text">
                        État de session
                    </label>
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-page border border-border/8 min-h-[42px]">
                    {/* Option Tous */}
                    <button
                        type="button"
                        onClick={() => onChange({ isConnected: undefined, page: 1 })}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg text-[11px] font-medium transition-colors ${
                            filters.isConnected === undefined
                                ? 'bg-hover/6 text-surface-text font-semibold shadow-xs'
                                : 'text-muted hover:text-surface-text'
                        }`}
                        title="Tous les états de connexion"
                    >
                        <Activity size={13} className="text-info shrink-0" />
                        <span>Tous</span>
                    </button>

                    {/* Option En ligne */}
                    <button
                        type="button"
                        onClick={() => onChange({ isConnected: true, page: 1 })}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg text-[11px] font-medium transition-colors ${
                            filters.isConnected === true
                                ? 'bg-success/15 text-success-text font-semibold shadow-xs border border-success/20'
                                : 'text-muted hover:text-surface-text'
                        }`}
                        title="Agents actuellement connectés"
                    >
                        <Wifi size={13} className="text-success shrink-0" />
                        <span>En ligne</span>
                    </button>

                    {/* Option Hors ligne */}
                    <button
                        type="button"
                        onClick={() => onChange({ isConnected: false, page: 1 })}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg text-[11px] font-medium transition-colors ${
                            filters.isConnected === false
                                ? 'bg-hover/6 text-surface-text font-semibold shadow-xs border border-border/8'
                                : 'text-muted hover:text-surface-text'
                        }`}
                        title="Agents déconnectés"
                    >
                        <WifiOff size={13} className="text-muted shrink-0" />
                        <span>Hors ligne</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
);
}

export default PersonnelFilters;
