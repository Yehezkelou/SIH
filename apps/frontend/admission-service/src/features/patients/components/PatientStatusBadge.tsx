'use client';

import React from 'react';
import { FileCheck2, Siren, Clock } from 'lucide-react';
import { Patient } from '../schema';
import { hoursUntilRegularisation } from '../utils/patientHelpers';

/**
 * Statut du dossier, et — pour un dossier provisoire — l'urgence de sa
 * régularisation. Un délai dépassé passe en `danger` : c'est l'information
 * qui doit sauter aux yeux dans une liste.
 */
export function PatientStatusBadge({ patient }: { patient: Patient }) {
    if (patient.statusDossier === 'DEFINITIF') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success/10 text-success-text border border-success/20">
                <FileCheck2 size={12} />
                Définitif
            </span>
        );
    }

    const hoursLeft = hoursUntilRegularisation(patient);
    const isOverdue = hoursLeft !== null && hoursLeft < 0;

    return (
        <div className="flex items-center gap-2 flex-wrap">
            <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                    isOverdue
                        ? 'bg-danger/10 text-danger-text border-danger/20'
                        : 'bg-warning/10 text-warning-text border-warning/20'
                }`}
            >
                <Siren size={12} />
                Provisoire
            </span>

            {hoursLeft !== null && (
                <span
                    className={`inline-flex items-center gap-1 text-[11px] ${
                        isOverdue ? 'text-danger-text font-semibold' : 'text-muted'
                    }`}
                >
                    <Clock size={11} />
                    {isOverdue
                        ? `Régularisation en retard de ${Math.abs(hoursLeft)} h`
                        : `À régulariser sous ${hoursLeft} h`}
                </span>
            )}
        </div>
    );
}

export default PatientStatusBadge;
