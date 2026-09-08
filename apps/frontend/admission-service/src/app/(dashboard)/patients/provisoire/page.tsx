'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Siren } from 'lucide-react';
import { PatientProvisoireForm } from '@/features/patients/components/PatientProvisoireForm';
import { ROUTES } from '@/config/routes';

export default function PatientProvisoirePage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-12">
            <Link
                href={ROUTES.PATIENTS}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-surface-text transition-colors"
            >
                <ArrowLeft size={14} />
                <span>Retour à l’index patient</span>
            </Link>

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-warning/10 text-warning-text border border-warning/20 flex items-center justify-center shrink-0">
                    <Siren size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-surface-text">Dossier provisoire</h1>
                    <p className="text-xs text-muted">
                        Ouverture d’un dossier en urgence, avant établissement de l’identité
                    </p>
                </div>
            </div>

            <PatientProvisoireForm />
        </div>
    );
}
