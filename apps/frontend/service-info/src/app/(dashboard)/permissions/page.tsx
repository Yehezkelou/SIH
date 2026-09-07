'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { KeyRound, RefreshCw, Shield } from 'lucide-react';
import { usePermissionsCatalogue } from '@/features/permissions/hooks/usePermissionsCatalogue';
import { PermissionFilterState, PermissionAuditItem } from '@/features/permissions/schema';
import {
    groupAuditItemsByDomain,
    buildPermissionMatrix,
} from '@/features/permissions/utils/permissionAuditHelpers';
import { PermissionStatsHeader } from '@/features/permissions/components/PermissionStatsHeader';
import { PermissionFilters } from '@/features/permissions/components/PermissionFilters';
import { PermissionDomainSection } from '@/features/permissions/components/PermissionDomainSection';
import { PermissionMatrixView } from '@/features/permissions/components/PermissionMatrixView';
import { PermissionStateCard } from '@/features/permissions/components/PermissionStateCard';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/config/routes';

export default function PermissionsPage() {
    const {
        roles,
        auditItems,
        stats,
        isLoading,
        isError,
        error,
        isFetching,
        refetchAll,
    } = usePermissionsCatalogue();

    const [filters, setFilters] = useState<PermissionFilterState>({
        search: '',
        domain: '',
        action: '',
        onlyCritical: false,
        onlyOrphan: false,
        viewMode: 'catalogue',
    });

    // Filtrage dynamique en mémoire des permissions
    const filteredAuditItems: PermissionAuditItem[] = useMemo(() => {
        return auditItems.filter((item) => {
            // Filtre par recherche textuelle (code ou description)
            if (filters.search) {
                const query = filters.search.toLowerCase().trim();
                const matchCode = item.code.toLowerCase().includes(query);
                const matchDesc = (item.description || '').toLowerCase().includes(query);
                if (!matchCode && !matchDesc) return false;
            }

            // Filtre par domaine / ressource
            if (filters.domain && item.ressource?.toLowerCase() !== filters.domain.toLowerCase()) {
                return false;
            }

            // Filtre par verbe d'action
            if (filters.action && String(item.action).toUpperCase() !== filters.action.toUpperCase()) {
                return false;
            }

            // Filtre permissions critiques
            if (filters.onlyCritical && item.sensitivity !== 'critical') {
                return false;
            }

            // Filtre permissions orphelines (non attribuées)
            if (filters.onlyOrphan && item.assignedRolesCount > 0) {
                return false;
            }

            return true;
        });
    }, [auditItems, filters]);

    // Groupements recalculés pour la vue Catalogue
    const filteredDomainGroups = useMemo(() => {
        return groupAuditItemsByDomain(filteredAuditItems);
    }, [filteredAuditItems]);

    // Lignes recalculées pour la vue Matrice
    const filteredMatrixRows = useMemo(() => {
        return buildPermissionMatrix(filteredAuditItems, roles);
    }, [filteredAuditItems, roles]);

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            {/* Entête de page avec navigation rapide vers les rôles */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <KeyRound size={20} />
                        </div>
                        <h1 className="text-xl font-bold text-surface-text">Catalogue des Permissions</h1>
                    </div>
                    <p className="text-xs text-muted max-w-2xl">
                        Inventaire exhaustif des habilitations système, des règles de sécurité RBAC et cartographie des droits d’accès par pôle hospitalier.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={refetchAll}
                        disabled={isFetching}
                        title="Actualiser le catalogue des permissions"
                        className="p-2.5 rounded-xl border border-border/8 bg-surface hover:bg-hover/6 text-muted hover:text-surface-text transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <RefreshCw size={15} className={isFetching ? 'animate-spin' : ''} />
                    </button>

                    <Link href={ROUTES.ROLES}>
                        <Button type="button" variant="primary" icon={Shield}>
                            Gérer les Rôles
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Statistiques et indicateurs de gouvernance */}
            <PermissionStatsHeader stats={stats} />

            {/* Barre de filtres et bascule de vue */}
            <PermissionFilters
                filters={filters}
                onChange={setFilters}
                totalMatches={filteredAuditItems.length}
            />

            {/* Contenu principal */}
            {isLoading ? (
                // Squelettes de chargement
                <div className="space-y-6">
                    {[1, 2].map((group) => (
                        <div key={group} className="space-y-3">
                            <div className="h-6 w-48 bg-surface border border-border/8 rounded-lg animate-pulse" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[1, 2, 3].map((card) => (
                                    <div
                                        key={card}
                                        className="h-44 rounded-2xl bg-surface border border-border/8 animate-pulse p-4 space-y-3"
                                    >
                                        <div className="h-6 bg-hover/8 rounded-lg w-1/2" />
                                        <div className="h-10 bg-hover/8 rounded-lg" />
                                        <div className="h-8 bg-hover/8 rounded-lg" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : isError ? (
                <PermissionStateCard
                    variant="error"
                    title="Impossible de charger les permissions"
                    description={
                        error instanceof Error
                            ? error.message
                            : 'Une erreur est survenue lors de la récupération du catalogue auprès du service d’authentification.'
                    }
                    onAction={refetchAll}
                    actionLabel="Réessayer"
                />
            ) : filteredAuditItems.length === 0 ? (
                <PermissionStateCard
                    variant="empty"
                    title="Aucune permission trouvée"
                    description={
                        filters.search || filters.domain || filters.action || filters.onlyCritical
                            ? 'Aucune autorisation ne correspond aux filtres sélectionnés. Essayez de réinitialiser vos critères.'
                            : 'Aucune permission n’est enregistrée dans le système.'
                    }
                    onAction={() =>
                        setFilters({
                            search: '',
                            domain: '',
                            action: '',
                            onlyCritical: false,
                            onlyOrphan: false,
                            viewMode: filters.viewMode,
                        })
                    }
                    actionLabel="Réinitialiser les filtres"
                />
            ) : filters.viewMode === 'matrix' ? (
                // Vue Matrice d'habilitations globale
                <PermissionMatrixView roles={roles} matrixRows={filteredMatrixRows} />
            ) : (
                // Vue Catalogue groupée par pôle
                <div className="space-y-8">
                    {filteredDomainGroups.map((group) => (
                        <PermissionDomainSection key={group.domainKey} group={group} />
                    ))}
                </div>
            )}
        </div>
    );
}
