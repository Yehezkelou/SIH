'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Search,
    Users,
    RefreshCw,
    FilePlus2,
    Siren,
    ChevronLeft,
    ChevronRight,
    UserSearch,
    AlertTriangle,
    Hash,
    Cake,
    Phone,
} from 'lucide-react';
import { useSearchPatients } from '../hooks/usePatients';
import { SearchPatientParams } from '../schema';
import { PatientStatusBadge } from './PatientStatusBadge';
import { PATIENT_PERMISSIONS, formatDate, fullName, initials } from '../utils/patientHelpers';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { usePermissions } from '@/hooks/usePermissions';
import { ROUTES } from '@/config/routes';

const LIMIT = 10;

export function PatientSearchView() {
    const { can } = usePermissions();

    const [term, setTerm] = useState('');
    const [filters, setFilters] = useState<SearchPatientParams>({ page: 1, limit: LIMIT });

    // Recherche différée : l'index patient est volumineux, on n'interroge pas
    // le service à chaque frappe.
    useEffect(() => {
        const handle = setTimeout(() => {
            const value = term.trim();
            setFilters((prev) => ({
                ...prev,
                page: 1,
                // Un NDPU commence par une lettre suivie de chiffres : on le
                // route vers la correspondance exacte plutôt que le nom.
                uniquePatientId: /^[A-Za-z]*\d{3,}$/.test(value) ? value : undefined,
                nom: value && !/^[A-Za-z]*\d{3,}$/.test(value) ? value : undefined,
            }));
        }, 350);
        return () => clearTimeout(handle);
    }, [term]);

    const { data, isLoading, isError, error, refetch, isFetching } = useSearchPatients(filters);

    const patients = data?.patients ?? [];
    const page = data?.page ?? 1;
    const totalPages = data?.totalPages ?? 1;

    const goToPage = (next: number) => setFilters((prev) => ({ ...prev, page: next }));

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            {/* En-tête */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-border/8 shrink-0">
                        <Users size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-surface-text">Index patient</h1>
                        <p className="text-xs text-muted">
                            Recherche dans le dossier maître d’identité (MPI)
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => refetch()}
                        disabled={isFetching}
                        title="Actualiser la recherche"
                        className="p-2.5 rounded-xl border border-border/8 bg-surface hover:bg-hover/6 text-muted hover:text-surface-text transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <RefreshCw size={15} className={isFetching ? 'animate-spin' : ''} />
                    </button>

                    {can(PATIENT_PERMISSIONS.CREATE) && (
                        <>
                            <Link href={ROUTES.PATIENT_PROVISOIRE}>
                                <Button type="button" variant="secondary" icon={Siren}>
                                    Dossier provisoire
                                </Button>
                            </Link>
                            <Link href={ROUTES.PATIENT_NEW}>
                                <Button type="button" variant="primary" icon={FilePlus2}>
                                    Nouveau dossier
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Recherche */}
            <div className="bg-surface border border-border/8 rounded-2xl p-4 shadow-xs">
                <Input
                    icon={Search}
                    placeholder="Rechercher par nom, ou saisir un NDPU (numéro de dossier)…"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    helperText="Un numéro de dossier déclenche une correspondance exacte ; un nom, une recherche approchante."
                />
            </div>

            {/* Résultats */}
            {isLoading ? (
                <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="h-20 rounded-2xl bg-surface border border-border/8 animate-pulse"
                        />
                    ))}
                </div>
            ) : isError ? (
                <div className="bg-surface border border-danger/20 rounded-2xl p-10 text-center shadow-xs flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-danger/10 text-danger-text flex items-center justify-center mb-4">
                        <AlertTriangle size={26} />
                    </div>
                    <h3 className="text-sm font-semibold text-surface-text">
                        Impossible d’interroger l’index patient
                    </h3>
                    <p className="text-xs text-muted mt-1.5 max-w-md">
                        {error instanceof Error
                            ? error.message
                            : "Une erreur est survenue lors de la communication avec le service d'identité patient."}
                    </p>
                    <div className="mt-5">
                        <Button type="button" variant="primary" onClick={() => refetch()}>
                            Réessayer
                        </Button>
                    </div>
                </div>
            ) : patients.length === 0 ? (
                <div className="bg-surface border border-border/8 rounded-2xl p-10 text-center shadow-xs flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-hover/6 text-muted flex items-center justify-center mb-4">
                        <UserSearch size={26} />
                    </div>
                    <h3 className="text-sm font-semibold text-surface-text">
                        {term ? 'Aucun dossier ne correspond' : 'Lancez une recherche'}
                    </h3>
                    <p className="text-xs text-muted mt-1.5 max-w-md">
                        {term
                            ? `Aucun patient trouvé pour « ${term} ». Vérifiez l’orthographe, ou ouvrez un nouveau dossier si le patient est inconnu de l’établissement.`
                            : 'Saisissez un nom ou un numéro de dossier pour interroger l’index patient.'}
                    </p>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between px-1">
                        <p className="text-xs text-muted">
                            <strong className="text-surface-text font-semibold">
                                {data?.total}
                            </strong>{' '}
                            dossier{(data?.total ?? 0) > 1 ? 's' : ''} trouvé
                            {(data?.total ?? 0) > 1 ? 's' : ''}
                            {data?.exactMatch && ' · correspondance exacte'}
                        </p>
                    </div>

                    <div className="space-y-2">
                        {patients.map((patient) => (
                            <Link
                                key={patient.id}
                                href={ROUTES.PATIENT_DETAIL(patient.uniquePatientId)}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-border/8 hover:border-border/12 hover:bg-hover/4 shadow-xs transition-all"
                            >
                                <div className="w-11 h-11 rounded-xl bg-primary/8 text-surface-text border border-border/8 flex items-center justify-center font-bold text-xs shrink-0">
                                    {initials(patient)}
                                </div>

                                <div className="min-w-0 flex-1 space-y-1">
                                    <p className="text-sm font-semibold text-surface-text truncate">
                                        {fullName(patient)}
                                    </p>
                                    <div className="flex items-center gap-3 flex-wrap text-[11px] text-muted">
                                        <span className="inline-flex items-center gap-1 font-mono">
                                            <Hash size={11} />
                                            {patient.uniquePatientId}
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <Cake size={11} />
                                            {patient.age} ans ·{' '}
                                            {formatDate(patient.dateNaissance, 'date inconnue')}
                                        </span>
                                        {patient.numero && (
                                            <span className="inline-flex items-center gap-1">
                                                <Phone size={11} />
                                                {patient.numero}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="shrink-0">
                                    <PatientStatusBadge patient={patient} />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-2">
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                icon={ChevronLeft}
                                disabled={page <= 1 || isFetching}
                                onClick={() => goToPage(page - 1)}
                            >
                                Précédent
                            </Button>
                            <span className="text-xs text-muted px-2">
                                Page {page} / {totalPages}
                            </span>
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                disabled={page >= totalPages || isFetching}
                                onClick={() => goToPage(page + 1)}
                            >
                                Suivant
                                <ChevronRight size={13} />
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default PatientSearchView;
