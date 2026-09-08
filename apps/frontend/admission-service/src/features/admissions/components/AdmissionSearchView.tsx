'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Search,
    RefreshCw,
    Plus,
    BedDouble,
    ChevronLeft,
    ChevronRight,
    AlertTriangle,
    ClipboardList,
    Users,
    CreditCard,
    FileText,
    Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { usePermissions } from '@/hooks/usePermissions';
import { ROUTES } from '@/config/routes';
import { AdmissionQueryParams, AdmissionStatus, AdmissionType } from '../schema';
import { useSearchAdmissions } from '../hooks/useAdmissions';
import {
    ADMISSION_PERMISSIONS,
    ADMISSION_STATUS,
    ADMISSION_TYPE,
    formatDate,
} from '../utils/admissionHelpers';
import { AdmissionStatusBadge, AdmissionTypeBadge } from './AdmissionStatusBadge';
import { AdmissionActions } from './AdmissionActions';

const LIMIT = 10;

// Un numéro (ADM…/patient) déclenche une recherche exacte ; sinon, rien.
const looksLikeNumber = (v: string) => /\d/.test(v);

export function AdmissionSearchView() {
    const { can } = usePermissions();

    const [term, setTerm] = useState('');
    const [status, setStatus] = useState<AdmissionStatus | ''>('');
    const [type, setType] = useState<AdmissionType | ''>('');
    const [filters, setFilters] = useState<AdmissionQueryParams>({ page: 1, limit: LIMIT });

    useEffect(() => {
        const handle = setTimeout(() => {
            const value = term.trim();
            const isAdm = /^adm/i.test(value);
            setFilters((prev) => ({
                ...prev,
                page: 1,
                admissionNumber: value && (isAdm || !looksLikeNumber(value)) ? value : undefined,
                numeroPatient: value && looksLikeNumber(value) && !isAdm ? value : undefined,
                admissionStatus: status || undefined,
                admissionType: type || undefined,
            }));
        }, 350);
        return () => clearTimeout(handle);
    }, [term, status, type]);

    const { data, isLoading, isError, error, refetch, isFetching } = useSearchAdmissions(filters);

    const admissions = data?.admissions ?? [];
    const meta = data?.meta;
    const page = meta?.page ?? 1;
    const totalPages = meta?.totalPages ?? 1;
    const goToPage = (next: number) => setFilters((prev) => ({ ...prev, page: next }));

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-border/8 shrink-0">
                        <BedDouble size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-surface-text">Admissions & séjours</h1>
                        <p className="text-xs text-muted">Suivi des venues, hospitalisations et urgences</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => refetch()}
                        disabled={isFetching}
                        title="Actualiser"
                        className="p-2.5 rounded-xl border border-border/8 bg-surface hover:bg-hover/6 text-muted hover:text-surface-text transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <RefreshCw size={15} className={isFetching ? 'animate-spin' : ''} />
                    </button>
                    {can(ADMISSION_PERMISSIONS.CREATE) && (
                        <Link href={ROUTES.ADMISSION_NEW}>
                            <Button type="button" variant="primary" icon={Plus}>
                                Nouvelle admission
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Filtres */}
            <div className="bg-surface border border-border/8 rounded-2xl p-4 shadow-xs grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3">
                <Input
                    icon={Search}
                    placeholder="N° d'admission (ADM…) ou n° patient…"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as AdmissionStatus)}
                    containerClassName="md:w-52"
                >
                    <option value="">Tous les statuts</option>
                    {ADMISSION_STATUS.map((s) => (
                        <option key={s.value} value={s.value}>
                            {s.label}
                        </option>
                    ))}
                </Select>
                <Select
                    value={type}
                    onChange={(e) => setType(e.target.value as AdmissionType)}
                    containerClassName="md:w-52"
                >
                    <option value="">Tous les types</option>
                    {ADMISSION_TYPE.map((t) => (
                        <option key={t.value} value={t.value}>
                            {t.label}
                        </option>
                    ))}
                </Select>
            </div>

            {/* Résultats */}
            {isLoading ? (
                <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-16 rounded-2xl bg-surface border border-border/8 animate-pulse" />
                    ))}
                </div>
            ) : isError ? (
                <div className="bg-surface border border-danger/20 rounded-2xl p-10 text-center shadow-xs flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-danger/10 text-danger-text flex items-center justify-center mb-4">
                        <AlertTriangle size={26} />
                    </div>
                    <h3 className="text-sm font-semibold text-surface-text">Impossible de charger les admissions</h3>
                    <p className="text-xs text-muted mt-1.5 max-w-md">
                        {error instanceof Error ? error.message : 'Erreur de communication avec le service des admissions.'}
                    </p>
                    <div className="mt-5">
                        <Button type="button" variant="primary" onClick={() => refetch()}>
                            Réessayer
                        </Button>
                    </div>
                </div>
            ) : admissions.length === 0 ? (
                <div className="bg-surface border border-border/8 rounded-2xl p-10 text-center shadow-xs flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-hover/6 text-muted flex items-center justify-center mb-4">
                        <ClipboardList size={26} />
                    </div>
                    <h3 className="text-sm font-semibold text-surface-text">Aucune admission trouvée</h3>
                    <p className="text-xs text-muted mt-1.5 max-w-md">
                        Ajustez vos filtres ou créez une nouvelle admission pour démarrer un séjour.
                    </p>
                </div>
            ) : (
                <>
                    <p className="text-xs text-muted px-1">
                        <strong className="text-surface-text font-semibold">{meta?.total}</strong> admission
                        {(meta?.total ?? 0) > 1 ? 's' : ''}
                    </p>

                    <div className="bg-surface border border-border/8 rounded-2xl shadow-xs overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[860px]">
                                <thead>
                                    <tr className="border-b border-border/8 text-[11px] uppercase tracking-wide text-muted">
                                        <th className="font-semibold px-4 py-3">Admission</th>
                                        <th className="font-semibold px-4 py-3">Patient</th>
                                        <th className="font-semibold px-4 py-3">Statut</th>
                                        <th className="font-semibold px-4 py-3">Date</th>
                                        <th className="font-semibold px-4 py-3">Éléments</th>
                                        <th className="font-semibold px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admissions.map((a, i) => (
                                        <motion.tr
                                            key={a.id}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.2) }}
                                            className="border-b border-border/8 last:border-0 hover:bg-hover/4 transition-colors"
                                        >
                                            <td className="px-4 py-3">
                                                <Link
                                                    href={ROUTES.ADMISSION_DETAIL(a.id, a.admissionNumber)}
                                                    className="font-mono text-xs font-semibold text-surface-text hover:underline"
                                                >
                                                    {a.admissionNumber}
                                                </Link>
                                                <div className="mt-1">
                                                    <AdmissionTypeBadge type={a.admissionType} />
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="font-mono text-xs text-surface-text">{a.numeroPatient}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <AdmissionStatusBadge status={a.admissionStatus} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                                                    <Calendar size={12} />
                                                    {formatDate(a.admissionDate ?? a.createdAt)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3 text-[11px] text-muted">
                                                    <span className="inline-flex items-center gap-1" title="Accompagnants">
                                                        <Users size={12} />
                                                        {a.companions?.length ?? 0}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1" title="Payeurs">
                                                        <CreditCard size={12} />
                                                        {a.payers?.length ?? 0}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1" title="Documents">
                                                        <FileText size={12} />
                                                        {a.documents?.length ?? 0}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-end">
                                                    <AdmissionActions admission={a} variant="menu" />
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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

export default AdmissionSearchView;
