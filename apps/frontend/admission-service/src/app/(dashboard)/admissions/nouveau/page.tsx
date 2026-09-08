'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BedDouble } from 'lucide-react';
import { AdmissionForm } from '@/features/admissions/components/AdmissionForm';
import { ROUTES } from '@/config/routes';

export default function AdmissionNouveauPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-12">
            <Link
                href={ROUTES.ADMISSIONS}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-surface-text transition-colors"
            >
                <ArrowLeft size={14} />
                <span>Retour aux admissions</span>
            </Link>

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary border border-border/8 flex items-center justify-center shrink-0">
                    <BedDouble size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-surface-text">Nouvelle admission</h1>
                    <p className="text-xs text-muted">Admettre un patient et ouvrir un séjour</p>
                </div>
            </div>

            <AdmissionForm />
        </div>
    );
}
