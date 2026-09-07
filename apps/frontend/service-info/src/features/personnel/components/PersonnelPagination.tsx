'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationMeta } from '../schema';
import { Select } from '@/components/ui/Select';

interface PersonnelPaginationProps {
    meta?: PaginationMeta;
    onPageChange: (newPage: number) => void;
    onLimitChange?: (newLimit: number) => void;
}

export function PersonnelPagination({
    meta,
    onPageChange,
    onLimitChange,
}: PersonnelPaginationProps) {
    // Si pas de données ou une seule page avec moins d'éléments que la limite
    if (!meta || meta.total === 0) return null;

    const { page, totalPages, total, limit, hasPreviousPage, hasNextPage } = meta;

    // Calcul de la tranche affichée
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    // Génération des numéros de pages avec gestion des ellipses
    const getPageNumbers = (): (number | string)[] => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (page <= 4) {
            return [1, 2, 3, 4, 5, '...', totalPages];
        }
        if (page >= totalPages - 3) {
            return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }
        return [1, '...', page - 1, page, page + 1, '...', totalPages];
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2 py-3">
            {/* 1. Résumé et sélecteur de limite */}
            <div className="flex items-center gap-3 text-xs text-muted">
                <span>
                    Affichage de <strong className="text-surface-text font-semibold">{start}</strong> à{' '}
                    <strong className="text-surface-text font-semibold">{end}</strong> sur{' '}
                    <strong className="text-surface-text font-semibold">{total}</strong> agents
                </span>

                {onLimitChange && (
                    <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-border/8">
                        <span>Lignes :</span>
                        <Select
                            sizeVariant="sm"
                            containerClassName="w-20"
                            value={limit}
                            onChange={(e) => onLimitChange(Number(e.target.value))}
                            options={[
                                { value: 10, label: '10' },
                                { value: 20, label: '20' },
                                { value: 50, label: '50' },
                            ]}
                        />
                    </div>
                )}
            </div>

            {/* 2. Boutons de pagination */}
            <div className="flex items-center gap-1.5">
                {/* Bouton Précédent */}
                <button
                    type="button"
                    disabled={!hasPreviousPage}
                    onClick={() => onPageChange(page - 1)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium 
                    border border-border/8 bg-surface hover:bg-hover/6 text-surface-text 
                    disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    title="Page précédente"
                >
                    <ChevronLeft size={14} />
                    <span className="hidden sm:inline">Précédent</span>
                </button>

                {/* Numéros de page et ellipses */}
                <div className="flex items-center gap-1">
                    {pageNumbers.map((p, index) => {
                        if (p === '...') {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="w-8 h-8 flex items-center justify-center text-xs text-muted"
                                >
                                    …
                                </span>
                            );
                        }

                        const pageNum = Number(p);
                        const isActive = pageNum === page;

                        return (
                            <button
                                key={pageNum}
                                type="button"
                                onClick={() => onPageChange(pageNum)}
                                className={`w-8 h-8 rounded-xl text-xs font-medium flex items-center justify-center transition-all ${
                                    isActive
                                        ? 'bg-primary text-primary-text font-bold shadow-xs'
                                        : 'text-muted hover:text-surface-text hover:bg-hover/6 border border-transparent hover:border-border/8'
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>

                {/* Bouton Suivant */}
                <button
                    type="button"
                    disabled={!hasNextPage}
                    onClick={() => onPageChange(page + 1)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium 
                    border border-border/8 bg-surface hover:bg-hover/6 text-surface-text 
                    disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    title="Page suivante"
                >
                    <span className="hidden sm:inline">Suivant</span>
                    <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
}

export default PersonnelPagination;
