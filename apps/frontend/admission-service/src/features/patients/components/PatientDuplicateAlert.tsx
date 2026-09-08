'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, Loader2, ShieldAlert, ArrowRight, Hash } from 'lucide-react';
import { DuplicateCandidate, labelForField } from '../hooks/useDuplicateSearch';
import { PatientStatusBadge } from './PatientStatusBadge';
import { formatDate, fullName, initials } from '../utils/patientHelpers';
import { ROUTES } from '@/config/routes';

interface PatientDuplicateAlertProps {
    candidates: DuplicateCandidate[];
    hasExactMatch: boolean;
    isSearching: boolean;
    isArmed: boolean;
}

/**
 * Doublons potentiels détectés pendant la saisie.
 *
 * Deux niveaux volontairement distincts : une correspondance sur identifiant
 * unique est un doublon *certain* et se présente en `danger` ; une ressemblance
 * sur l'état civil est un *signal* et se présente en `warning`, sans jamais
 * empêcher la création — c'est l'agent d'accueil qui tranche, pas l'écran.
 */
export function PatientDuplicateAlert({
    candidates,
    hasExactMatch,
    isSearching,
    isArmed,
}: PatientDuplicateAlertProps) {
    if (!isArmed) {
        return (
            <p className="text-[11px] text-muted px-1">
                La recherche de doublons se déclenche dès qu’un nom d’au moins trois lettres ou un
                identifiant unique est saisi.
            </p>
        );
    }

    if (isSearching && candidates.length === 0) {
        return (
            <div className="flex items-center gap-2 text-[11px] text-muted px-1">
                <Loader2 size={12} className="animate-spin" />
                Recherche de dossiers existants…
            </div>
        );
    }

    if (candidates.length === 0) {
        return (
            <p className="text-[11px] text-success-text px-1">
                Aucun dossier existant ne correspond à cette saisie.
            </p>
        );
    }

    const tone = hasExactMatch
        ? { bg: 'bg-danger/10', border: 'border-danger/20', text: 'text-danger-text', Icon: ShieldAlert }
        : { bg: 'bg-warning/10', border: 'border-warning/20', text: 'text-warning-text', Icon: AlertTriangle };

    return (
        <div className={`rounded-2xl border ${tone.border} ${tone.bg} p-4 space-y-3`}>
            <div className={`flex items-start gap-2.5 ${tone.text}`}>
                <tone.Icon size={16} className="shrink-0 mt-0.5" />
                <div className="min-w-0">
                    <h4 className="text-xs font-bold leading-tight">
                        {hasExactMatch
                            ? 'Ce patient possède déjà un dossier'
                            : `${candidates.length} dossier${candidates.length > 1 ? 's' : ''} ressemblant${candidates.length > 1 ? 's' : ''}`}
                    </h4>
                    <p className="text-[11px] leading-relaxed mt-0.5 opacity-90">
                        {hasExactMatch
                            ? "Un identifiant unique saisi correspond exactement à un dossier existant. Créer un second dossier produirait un doublon à fusionner ensuite."
                            : "Vérifiez qu’il ne s’agit pas du même patient avant de poursuivre la création."}
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                {candidates.map(({ patient, matchedOn, score }) => (
                    <Link
                        key={patient.id}
                        href={ROUTES.PATIENT_DETAIL(patient.uniquePatientId)}
                        target="_blank"
                        className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border/8 hover:border-border/12 transition-all group"
                    >
                        <div className="w-9 h-9 rounded-xl bg-hover/6 text-surface-text border border-border/8 flex items-center justify-center font-bold text-[11px] shrink-0">
                            {initials(patient)}
                        </div>

                        <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-semibold text-surface-text truncate">
                                    {fullName(patient)}
                                </span>
                                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted">
                                    <Hash size={9} />
                                    {patient.uniquePatientId}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap text-[10px] text-muted">
                                <span>
                                    {patient.age} ans · {formatDate(patient.dateNaissance, 'né(e) date inconnue')}
                                </span>
                                <PatientStatusBadge patient={patient} />
                            </div>

                            {matchedOn.length > 0 && (
                                <div className="flex items-center gap-1 flex-wrap pt-0.5">
                                    <span className="text-[10px] text-muted">Identique sur :</span>
                                    {matchedOn.map((field) => (
                                        <span
                                            key={field}
                                            className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border ${
                                                score >= 100
                                                    ? 'bg-danger/10 text-danger-text border-danger/20'
                                                    : 'bg-warning/10 text-warning-text border-warning/20'
                                            }`}
                                        >
                                            {labelForField(field)}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <ArrowRight
                            size={14}
                            className="text-muted group-hover:text-surface-text transition-colors shrink-0"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PatientDuplicateAlert;
