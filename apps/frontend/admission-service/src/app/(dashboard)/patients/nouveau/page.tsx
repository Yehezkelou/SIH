'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FilePlus2 } from 'lucide-react';
import { PatientForm } from '@/features/patients/components/PatientForm';
import { ROUTES } from '@/config/routes';

export default function PatientNouveauPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            <Link
                href={ROUTES.PATIENTS}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-surface-text transition-colors"
            >
                <ArrowLeft size={14} />
                <span>Retour à l’index patient</span>
            </Link>

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary border border-border/8 flex items-center justify-center shrink-0">
                    <FilePlus2 size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-surface-text">Nouveau dossier patient</h1>
                    <p className="text-xs text-muted">
                        Les dossiers ressemblants apparaissent à droite au fil de la saisie
                    </p>
                </div>
            </div>

            <PatientForm />
        </div>
    );
}
