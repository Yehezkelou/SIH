'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
    CopyCheck,
    Search,
    Merge,
    AlertTriangle,
    ShieldCheck,
    Hash,
    Info,
    Loader2,
} from 'lucide-react';
import { useSearchPatients } from '../hooks/usePatients';
import { Patient } from '../schema';
import { buildDuplicatePairs, CHAMP_LABELS, DuplicatePair } from '../utils/duplicateMatching';
import { PatientMergeModal } from './PatientMergeModal';
import { PatientStatusBadge } from './PatientStatusBadge';
import { formatDate, fullName, initials } from '../utils/patientHelpers';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/config/routes';

/** Lot suffisant pour que le rapprochement croisé ait du sens, sans saturer. */
const LOT = 50;

function PatientColumn({ patient }: { patient: Patient }) {
    return (
        <Link
            href={ROUTES.PATIENT_DETAIL(patient.uniquePatientId)}
            target="_blank"
            className="flex items-start gap-3 p-3 rounded-xl bg-page border border-border/8 hover:border-border/12 transition-all min-w-0"
        >
            <div className="w-9 h-9 rounded-xl bg-hover/6 text-surface-text border border-border/8 flex items-center justify-center font-bold text-[11px] shrink-0">
                {initials(patient)}
            </div>
            <div className="min-w-0 space-y-1">
                <p className="text-xs font-semibold text-surface-text truncate">
                    {fullName(patient)}
                </p>
                <p className="inline-flex items-center gap-1 font-mono text-[10px] text-muted">
                    <Hash size={9} />
                    {patient.uniquePatientId}
                </p>
                <p className="text-[10px] text-muted">
                    {patient.age} ans · {formatDate(patient.dateNaissance, 'date inconnue')}
                </p>
                <PatientStatusBadge patient={patient} />
            </div>
        </Link>
    );
}

function PairCard({ pair, onMerge }: { pair: DuplicatePair; onMerge: () => void }) {
    const forte = pair.niveau === 'FORTE';

    return (
        <div
            className={`rounded-2xl border p-4 space-y-3 shadow-xs ${
                forte ? 'bg-danger/5 border-danger/20' : 'bg-surface border-border/8'
            }`}
        >
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        forte
                            ? 'bg-danger/10 text-danger-text border-danger/20'
                            : 'bg-warning/10 text-warning-text border-warning/20'
                    }`}
                >
                    <AlertTriangle size={11} />
                    Similarité {forte ? 'forte' : 'modérée'} · {pair.score}%
                </span>

                <Button type="button" variant="primary" size="sm" icon={Merge} onClick={onMerge}>
                    Examiner et fusionner
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <PatientColumn patient={pair.a} />
                <PatientColumn patient={pair.b} />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-border/8">
                <span className="text-[10px] text-muted">Identiques sur :</span>
                {pair.matchedFields.map((field) => (
                    <span
                        key={field}
                        className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-hover/6 text-surface-text border border-border/8"
                    >
                        {CHAMP_LABELS[field] ?? field}
                    </span>
                ))}
                {pair.complementaryCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-info/10 text-info-text border border-info/20">
                        +{pair.complementaryCount} champ{pair.complementaryCount > 1 ? 's' : ''} complémentaire
                        {pair.complementaryCount > 1 ? 's' : ''}
                    </span>
                )}
            </div>
        </div>
    );
}

export function DuplicatesView() {
    const [term, setTerm] = useState('');
    const [submitted, setSubmitted] = useState('');
    const [selected, setSelected] = useState<{ a: Patient; b: Patient } | null>(null);

    const { data, isFetching, isError, error, refetch } = useSearchPatients(
        submitted ? { nom: submitted, limit: LOT, page: 1 } : {}
    );

    const pairs = useMemo(
        () => (data?.patients ? buildDuplicatePairs(data.patients) : []),
        [data]
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(term.trim());
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary border border-border/8 flex items-center justify-center shrink-0">
                    <CopyCheck size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-surface-text">Doublons</h1>
                    <p className="text-xs text-muted">
                        Rapprochement et fusion des dossiers d’un même patient
                    </p>
                </div>
            </div>

            {/* Le service ne publie pas d'endpoint de détection : on est explicite
                sur le fait que l'analyse porte sur un lot recherché. */}
            <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-info/10 border border-info/20 text-info-text">
                <Info size={16} className="shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                    L’analyse porte sur un lot de {LOT} dossiers au plus, rapprochés deux à deux
                    dans le navigateur. Le service ne publie pas encore d’endpoint de détection
                    systématique : partez d’un nom de famille pour explorer les homonymes.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface border border-border/8 rounded-2xl p-4 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                        <Input
                            icon={Search}
                            placeholder="Nom de famille à analyser (ex: KOUASSI)"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            helperText="Les homonymes sont le terrain naturel des doublons."
                        />
                    </div>
                    <Button type="submit" variant="primary" icon={Search} isLoading={isFetching}>
                        Analyser
                    </Button>
                </div>
            </form>

            {!submitted ? (
                <div className="bg-surface border border-border/8 rounded-2xl p-10 text-center shadow-xs flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-hover/6 text-muted flex items-center justify-center mb-4">
                        <CopyCheck size={26} />
                    </div>
                    <h3 className="text-sm font-semibold text-surface-text">
                        Lancez une analyse
                    </h3>
                    <p className="text-xs text-muted mt-1.5 max-w-md">
                        Saisissez un nom de famille pour rapprocher les dossiers qui pourraient
                        désigner la même personne.
                    </p>
                </div>
            ) : isFetching ? (
                <div className="flex items-center justify-center gap-2 py-12 text-xs text-muted">
                    <Loader2 size={14} className="animate-spin" />
                    Rapprochement des dossiers…
                </div>
            ) : isError ? (
                <div className="bg-surface border border-danger/20 rounded-2xl p-10 text-center shadow-xs flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-danger/10 text-danger-text flex items-center justify-center mb-4">
                        <AlertTriangle size={26} />
                    </div>
                    <h3 className="text-sm font-semibold text-surface-text">
                        L’analyse a échoué
                    </h3>
                    <p className="text-xs text-muted mt-1.5 max-w-md">
                        {error instanceof Error ? error.message : 'Erreur de communication avec le service.'}
                    </p>
                    <div className="mt-5">
                        <Button type="button" variant="primary" onClick={() => refetch()}>
                            Réessayer
                        </Button>
                    </div>
                </div>
            ) : pairs.length === 0 ? (
                <div className="bg-surface border border-success/20 rounded-2xl p-10 text-center shadow-xs flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-success/10 text-success-text flex items-center justify-center mb-4">
                        <ShieldCheck size={26} />
                    </div>
                    <h3 className="text-sm font-semibold text-surface-text">
                        Aucun doublon détecté
                    </h3>
                    <p className="text-xs text-muted mt-1.5 max-w-md">
                        Les {data?.patients.length ?? 0} dossiers analysés pour « {submitted} » ne
                        présentent pas de ressemblance suffisante.
                    </p>
                </div>
            ) : (
                <>
                    <p className="text-xs text-muted px-1">
                        <strong className="text-surface-text font-semibold">{pairs.length}</strong>{' '}
                        paire{pairs.length > 1 ? 's' : ''} suspecte{pairs.length > 1 ? 's' : ''} sur{' '}
                        {data?.patients.length ?? 0} dossiers analysés
                    </p>

                    <div className="space-y-3">
                        {pairs.map((pair) => (
                            <PairCard
                                key={pair.id}
                                pair={pair}
                                onMerge={() => setSelected({ a: pair.a, b: pair.b })}
                            />
                        ))}
                    </div>
                </>
            )}

            <PatientMergeModal
                pair={selected}
                onClose={() => setSelected(null)}
                onMerged={() => refetch()}
            />
        </div>
    );
}

export default DuplicatesView;
