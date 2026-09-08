'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    BedDouble,
    AlertTriangle,
    User,
    CalendarClock,
    Stethoscope,
    MapPin,
    NotebookText,
    Users,
    CreditCard,
    FileText,
    ArrowRightLeft,
    LayoutGrid,
    Hash,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePermissions } from '@/hooks/usePermissions';
import { ROUTES } from '@/config/routes';
import { useAdmission } from '../hooks/useAdmissions';
import {
    ADMISSION_PERMISSIONS,
    formatDate,
    formatDateTime,
    statusLabel,
} from '../utils/admissionHelpers';
import { AdmissionStatusBadge, AdmissionTypeBadge } from './AdmissionStatusBadge';
import { AdmissionActions } from './AdmissionActions';
import { CompanionsPanel } from './panels/CompanionsPanel';
import { PayersPanel } from './panels/PayersPanel';
import { DocumentsPanel } from './panels/DocumentsPanel';
import { MovementsPanel } from './panels/MovementsPanel';

type TabKey = 'overview' | 'companions' | 'payers' | 'documents' | 'movements';

function InfoItem({ icon: Icon, label, value }: { icon: typeof User; label: string; value?: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-hover/6 border border-border/8 flex items-center justify-center text-muted shrink-0">
                <Icon size={15} />
            </div>
            <div className="min-w-0">
                <p className="text-[11px] text-muted uppercase tracking-wide">{label}</p>
                <p className="text-xs font-medium text-surface-text break-words">{value ?? '—'}</p>
            </div>
        </div>
    );
}

export function AdmissionDetailView({
    admissionId,
    admissionNumber,
}: {
    admissionId: string;
    admissionNumber?: string;
}) {
    const router = useRouter();
    const { can } = usePermissions();
    const { data: admission, isLoading, isError, error } = useAdmission(admissionId, admissionNumber);
    const [tab, setTab] = useState<TabKey>('overview');

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto space-y-4">
                <div className="h-8 w-40 rounded-lg bg-surface border border-border/8 animate-pulse" />
                <div className="h-28 rounded-2xl bg-surface border border-border/8 animate-pulse" />
                <div className="h-64 rounded-2xl bg-surface border border-border/8 animate-pulse" />
            </div>
        );
    }

    if (isError || !admission) {
        return (
            <div className="max-w-6xl mx-auto">
                <Link
                    href={ROUTES.ADMISSIONS}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-surface-text transition-colors mb-5"
                >
                    <ArrowLeft size={14} /> Retour aux admissions
                </Link>
                <div className="bg-surface border border-danger/20 rounded-2xl p-10 text-center shadow-xs flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-danger/10 text-danger-text flex items-center justify-center mb-4">
                        <AlertTriangle size={26} />
                    </div>
                    <h3 className="text-sm font-semibold text-surface-text">Admission introuvable</h3>
                    <p className="text-xs text-muted mt-1.5 max-w-md">
                        {error instanceof Error ? error.message : "Cette admission n'existe pas ou a été supprimée."}
                    </p>
                </div>
            </div>
        );
    }

    const enc = admission.encounters ?? null;
    const canRead = can(ADMISSION_PERMISSIONS.READ) || can(ADMISSION_PERMISSIONS.UPDATE);

    const tabs: { key: TabKey; label: string; icon: typeof User; count?: number }[] = [
        { key: 'overview', label: "Vue d'ensemble", icon: LayoutGrid },
        { key: 'companions', label: 'Accompagnants', icon: Users, count: admission.companions?.length },
        { key: 'payers', label: 'Payeurs', icon: CreditCard, count: admission.payers?.length },
        { key: 'documents', label: 'Documents', icon: FileText, count: admission.documents?.length },
        { key: 'movements', label: 'Mouvements', icon: ArrowRightLeft, count: enc?.movements?.length },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-5 pb-12">
            <Link
                href={ROUTES.ADMISSIONS}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-surface-text transition-colors"
            >
                <ArrowLeft size={14} /> Retour aux admissions
            </Link>

            {/* En-tête */}
            <div className="bg-surface border border-border/8 rounded-2xl shadow-xs p-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary border border-border/8 flex items-center justify-center shrink-0">
                            <BedDouble size={22} />
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="text-lg font-bold text-surface-text font-mono">{admission.admissionNumber}</h1>
                                <AdmissionStatusBadge status={admission.admissionStatus} />
                                <AdmissionTypeBadge type={admission.admissionType} />
                            </div>
                            <Link
                                href={ROUTES.PATIENT_DETAIL(admission.numeroPatient)}
                                className="text-xs text-muted hover:text-surface-text transition-colors inline-flex items-center gap-1.5 mt-1"
                            >
                                <Hash size={11} /> Patient {admission.numeroPatient}
                            </Link>
                        </div>
                    </div>

                    {canRead && (
                        <AdmissionActions
                            admission={admission}
                            variant="buttons"
                            onDeleted={() => router.push(ROUTES.ADMISSIONS)}
                        />
                    )}
                </div>
            </div>

            {/* Onglets */}
            <div className="flex items-center gap-1 overflow-x-auto border-b border-border/8">
                {tabs.map((t) => {
                    const Icon = t.icon;
                    const activeTab = tab === t.key;
                    return (
                        <button
                            key={t.key}
                            type="button"
                            onClick={() => setTab(t.key)}
                            className={`relative inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                                activeTab ? 'text-surface-text' : 'text-muted hover:text-surface-text'
                            }`}
                        >
                            <Icon size={14} />
                            {t.label}
                            {typeof t.count === 'number' && t.count > 0 && (
                                <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-hover/6 border border-border/8 text-[10px]">
                                    {t.count}
                                </span>
                            )}
                            {activeTab && (
                                <motion.span
                                    layoutId="admission-tab"
                                    className="absolute left-0 right-0 -bottom-px h-[2px] bg-primary rounded-full"
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                >
                    {tab === 'overview' && (
                        <div className="space-y-4">
                            <div className="bg-surface border border-border/8 rounded-2xl shadow-xs p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                <InfoItem icon={User} label="N° patient" value={admission.numeroPatient} />
                                <InfoItem icon={Stethoscope} label="Médecin" value={admission.doctorId ? admission.doctorId.slice(0, 8) : 'Non affecté'} />
                                <InfoItem icon={NotebookText} label="Statut" value={statusLabel(admission.admissionStatus)} />
                                <InfoItem icon={CalendarClock} label="Date d'admission" value={formatDateTime(admission.admissionDate)} />
                                <InfoItem icon={CalendarClock} label="Sortie prévue" value={formatDate(admission.expectedDischarge)} />
                                <InfoItem icon={CalendarClock} label="Sortie effective" value={formatDateTime(admission.actualDischarge)} />
                                <div className="sm:col-span-2 lg:col-span-3">
                                    <InfoItem icon={NotebookText} label="Motif" value={admission.reason || '—'} />
                                </div>
                            </div>

                            <div className="bg-surface border border-border/8 rounded-2xl shadow-xs p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <MapPin size={15} className="text-muted" />
                                    <h3 className="text-sm font-semibold text-surface-text">Séjour & localisation</h3>
                                </div>
                                {enc ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                        <InfoItem icon={Hash} label="N° séjour" value={enc.encounterNumber ?? enc.id.slice(0, 8)} />
                                        <InfoItem icon={MapPin} label="Département" value={enc.currentDepartmentId ? enc.currentDepartmentId.slice(0, 8) : '—'} />
                                        <InfoItem icon={BedDouble} label="Chambre / Lit" value={[enc.currentRoomId, enc.currentBedId].filter(Boolean).map((v) => v!.slice(0, 8)).join(' · ') || '—'} />
                                        <InfoItem icon={CalendarClock} label="Début séjour" value={formatDateTime(enc.startDate)} />
                                    </div>
                                ) : (
                                    <p className="text-xs text-muted">
                                        Aucun séjour ouvert pour cette admission (statut non hospitalisé).
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {tab !== 'overview' && (
                        <div className="bg-surface border border-border/8 rounded-2xl shadow-xs p-5">
                            {tab === 'companions' && <CompanionsPanel admission={admission} />}
                            {tab === 'payers' && <PayersPanel admission={admission} />}
                            {tab === 'documents' && <DocumentsPanel admission={admission} />}
                            {tab === 'movements' && <MovementsPanel admission={admission} />}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default AdmissionDetailView;
