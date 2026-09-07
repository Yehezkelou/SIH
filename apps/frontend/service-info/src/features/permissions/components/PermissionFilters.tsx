'use client';

import React from 'react';
import { Search, Filter, ShieldAlert, LayoutGrid, Table, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { PermissionFilterState } from '../schema';
import { DOMAIN_METADATA } from '../utils/permissionAuditHelpers';

interface PermissionFiltersProps {
    filters: PermissionFilterState;
    onChange: (next: PermissionFilterState) => void;
    totalMatches: number;
}

const ACTION_OPTIONS = [
    { value: '', label: 'Toutes les actions' },
    { value: 'READ', label: 'Lecture' },
    { value: 'CREATE', label: 'Création' },
    { value: 'UPDATE', label: 'Modification' },
    { value: 'DELETE', label: 'Suppression' },
    { value: 'EXPORT', label: 'Export' },
    { value: 'MANAGE', label: 'Gestion & Statut' },
];

export function PermissionFilters({ filters, onChange, totalMatches }: PermissionFiltersProps) {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...filters, search: e.target.value });
    };

    const handleDomainChange = (domain: string) => {
        onChange({ ...filters, domain: filters.domain === domain ? '' : domain });
    };

    const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({ ...filters, action: e.target.value });
    };

    const toggleOnlyCritical = () => {
        onChange({ ...filters, onlyCritical: !filters.onlyCritical });
    };

    const resetFilters = () => {
        onChange({
            ...filters,
            search: '',
            domain: '',
            action: '',
            onlyCritical: false,
            onlyOrphan: false,
        });
    };

    const hasActiveFilters = Boolean(
        filters.search || filters.domain || filters.action || filters.onlyCritical || filters.onlyOrphan
    );

    return (
        <div className="space-y-4 bg-surface border border-border/8 rounded-2xl p-4 shadow-xs">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Recherche textuelle */}
                <div className="flex-1 max-w-md">
                    <Input
                        icon={Search}
                        placeholder="Rechercher par code (ex: patient:READ) ou description..."
                        value={filters.search}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Filtres secondaires & bascule de vue */}
                <div className="flex items-center flex-wrap gap-2">
                    {/* Sélecteur d'action */}
                    <div className="relative">
                        <select
                            value={filters.action}
                            onChange={handleActionChange}
                            className="text-xs bg-page border border-border/8 rounded-xl px-3 py-2.5 text-surface-text focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
                        >
                            {ACTION_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Toggle sensibles */}
                    <button
                        type="button"
                        onClick={toggleOnlyCritical}
                        className={`text-xs px-3 py-2.5 rounded-xl border flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
                            filters.onlyCritical
                                ? 'bg-rose-500/10 text-rose-500 border-rose-500/30 font-semibold'
                                : 'bg-page text-muted border-border/8 hover:text-surface-text'
                        }`}
                    >
                        <ShieldAlert size={14} />
                        <span>Sensibles</span>
                    </button>

                    {/* Réinitialisation */}
                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="text-xs px-2.5 py-2 rounded-xl text-muted hover:text-surface-text hover:bg-hover/6 transition-colors flex items-center gap-1 cursor-pointer"
                            title="Réinitialiser tous les filtres"
                        >
                            <X size={14} />
                            <span>Effacer</span>
                        </button>
                    )}

                    {/* Séparateur */}
                    <div className="h-6 w-px bg-border/8 mx-1 hidden sm:block" />

                    {/* Bascule Vue Catalogue / Vue Matrice */}
                    <div className="flex items-center bg-page p-1 rounded-xl border border-border/8">
                        <button
                            type="button"
                            onClick={() => onChange({ ...filters, viewMode: 'catalogue' })}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                filters.viewMode === 'catalogue'
                                    ? 'bg-surface text-surface-text shadow-xs'
                                    : 'text-muted hover:text-surface-text'
                            }`}
                            title="Vue par cartes et domaines"
                        >
                            <LayoutGrid size={14} />
                            <span>Catalogue</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => onChange({ ...filters, viewMode: 'matrix' })}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                filters.viewMode === 'matrix'
                                    ? 'bg-surface text-surface-text shadow-xs'
                                    : 'text-muted hover:text-surface-text'
                            }`}
                            title="Vue matrice d'habilitations globale"
                        >
                            <Table size={14} />
                            <span>Matrice RBAC</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Onglets de domaines / pôles métier */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-border/6">
                <button
                    type="button"
                    onClick={() => handleDomainChange('')}
                    className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all whitespace-nowrap cursor-pointer ${
                        filters.domain === ''
                            ? 'bg-primary text-white border-primary shadow-xs'
                            : 'bg-page text-muted border-border/8 hover:text-surface-text hover:bg-hover/6'
                    }`}
                >
                    Tous les pôles ({totalMatches})
                </button>
                {Object.entries(DOMAIN_METADATA).map(([key, meta]) => {
                    const isSelected = filters.domain === key;
                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => handleDomainChange(key)}
                            className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all whitespace-nowrap cursor-pointer ${
                                isSelected
                                    ? 'bg-primary text-white border-primary shadow-xs'
                                    : 'bg-page text-muted border-border/8 hover:text-surface-text hover:bg-hover/6'
                            }`}
                        >
                            {meta.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
