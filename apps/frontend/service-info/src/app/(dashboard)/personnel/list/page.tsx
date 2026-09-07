'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserPlus, Users, RefreshCw } from 'lucide-react';
import { useListAgents } from '@/features/personnel/hooks/useApiPeronnel';
import { QueryUsersParams } from '@/features/personnel/schema';
import { PersonnelFilters } from '@/features/personnel/components/personnelFilters';
import { PersonnelTable } from '@/features/personnel/components/PersonnelTable';
import { PersonnelPagination } from '@/features/personnel/components/PersonnelPagination';
import { PersonnelStateCard } from '@/features/personnel/components/PersonnelStateCard';
import { ROUTES } from '@/config/routes';

export default function PersonnelListPage() {
    // 1. État des filtres
    const [filters, setFilters] = useState<QueryUsersParams>({
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
    });

    // 2. Récupération des données via TanStack Query
    const { data, isLoading, isError, error, refetch, isFetching } = useListAgents(filters);

    // 3. Gestionnaires d'état
    const handleFilterChange = (updated: Partial<QueryUsersParams>) => {
        setFilters((prev) => ({ ...prev, ...updated }));
    };

    const handleResetFilters = () => {
        setFilters({
            page: 1,
            limit: filters.limit || 10,
            sortBy: 'createdAt',
            sortOrder: 'DESC',
        });
    };

    const handlePageChange = (newPage: number) => {
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    const handleLimitChange = (newLimit: number) => {
        setFilters((prev) => ({ ...prev, limit: newLimit, page: 1 }));
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-8">
            {/* En-tête de la page */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/8 text-primary-text flex items-center justify-center border border-border/8 shrink-0">
                        <Users size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-surface-text">Gestion du Personnel</h1>
                        <p className="text-xs text-muted">
                            Annuaire, affectations et statut d'accès des agents hospitaliers
                        </p>
                    </div>
                </div>

                {/* Boutons d'actions */}
                <div className="flex items-center gap-2">
                    {/* Rafraîchir manuellement */}
                    <button
                        type="button"
                        onClick={() => refetch()}
                        disabled={isFetching}
                        title="Actualiser la liste"
                        className="p-2.5 rounded-xl border border-border/8 bg-surface hover:bg-hover/6 text-muted hover:text-surface-text transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <RefreshCw size={15} className={isFetching ? 'animate-spin' : ''} />
                    </button>

                    {/* Ajouter un nouvel agent */}
                    <Link
                        href={ROUTES.PERSONNEL_ADD}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold 
                        bg-primary text-primary-text hover:opacity-90 transition-all shadow-xs shrink-0"
                    >
                        <UserPlus size={15} />
                        <span>Nouveau membre</span>
                    </Link>
                </div>
            </div>

            {/* Barre de filtres réactifs */}
            <PersonnelFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
            />

            {/* Gestion d'erreur via notre composant standard */}
            {isError ? (
                <PersonnelStateCard
                    variant="error"
                    title="Impossible de charger la liste du personnel"
                    description={
                        error instanceof Error
                            ? error.message
                            : 'Une erreur est survenue lors de la communication avec le serveur.'
                    }
                    action={{
                        label: 'Réessayer',
                        onClick: () => refetch(),
                    }}
                />
            ) : (
                <>
                    {/* Tableau principal des agents */}
                    <PersonnelTable
                        agents={data?.data || []}
                        isLoading={isLoading}
                    />

                    {/* Pagination en bas de page */}
                    <PersonnelPagination
                        meta={data?.meta}
                        onPageChange={handlePageChange}
                        onLimitChange={handleLimitChange}
                    />
                </>
            )}
        </div>
    );
}
