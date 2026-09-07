'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { PersonnelForm } from '@/features/personnel/components/PersonnelForm';

export default function PersonnelAddPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            {/* Bouton retour vers la liste */}
            <div>
                <Link
                    href={ROUTES.PERSONNEL_LIST}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-surface-text transition-colors"
                >
                    <ArrowLeft size={14} />
                    <span>Retour à la liste des agents</span>
                </Link>
            </div>

            {/* En-tête de la page */}
            <div className="flex items-center gap-3 pb-2">
                <div className="w-10 h-10 rounded-2xl bg-primary/8 text-primary-text flex items-center justify-center border border-border/8 shrink-0">
                    <UserPlus size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-surface-text">Nouveau collaborateur</h1>
                    <p className="text-xs text-muted">
                        Créez un compte agent, définissez son affectation et ses rôles d'accès hospitaliers.
                    </p>
                </div>
            </div>

            {/* Formulaire complet */}
            <PersonnelForm />
        </div>
    );
}
