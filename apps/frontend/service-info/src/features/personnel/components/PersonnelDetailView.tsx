'use client';

import React from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Mail,
    Phone,
    Building2,
    Stethoscope,
    Hash,
    BadgeCheck,
    CalendarPlus,
    RefreshCw,
    IdCard,
} from 'lucide-react';
import { useGetAgent } from '../hooks/useApiPeronnel';
import { PersonnelStatusBadge } from './PersonnelStatusBadge';
import { PersonnelStateCard } from './PersonnelStateCard';
import { PersonnelActionsMenu } from './PersonnelActionsMenu';
import { PersonnelSecurityPanel } from './PersonnelSecurityPanel';
import { PersonnelRolesPanel } from './PersonnelRolesPanel';
import { PersonnelDocumentsPanel } from './PersonnelDocumentsPanel';
import { PERSONNEL_PERMISSIONS, formatDateTime, formatPersonnelType } from '../utils/personnelActions';
import { usePermissions } from '@/hooks/usePermissions';
import { ROUTES } from '@/config/routes';

interface PersonnelDetailViewProps {
    agentId: string;
}

function InfoField({
    icon: Icon,
    label,
    value,
    mono = false,
}: {
    icon: React.ElementType;
    label: string;
    value?: string | null;
    mono?: boolean;
}) {
    return (
        <div className="space-y-1">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-muted uppercase tracking-wider">
                <Icon size={11} />
                {label}
            </span>
            <p
                className={`text-xs text-surface-text break-words ${mono ? 'font-mono' : ''} ${
                    value ? 'font-medium' : 'text-muted italic'
                }`}
            >
                {value || 'Non renseigné'}
            </p>
        </div>
    );
}

export function PersonnelDetailView({ agentId }: PersonnelDetailViewProps) {
    const { data, isLoading, isError, error, refetch, isFetching } = useGetAgent(agentId);
    const { can } = usePermissions();

    const agent = data?.user;

    const backLink = (
        <Link
            href={ROUTES.PERSONNEL_LIST}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-surface-text transition-colors"
        >
            <ArrowLeft size={14} />
            <span>Retour à la liste des agents</span>
        </Link>
    );

    if (isLoading) {
        return (
            <div className="space-y-6 max-w-7xl mx-auto pb-12">
                {backLink}
                <div className="h-32 rounded-2xl bg-surface border border-border/8 animate-pulse" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-64 rounded-2xl bg-surface border border-border/8 animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (isError || !agent) {
        return (
            <div className="space-y-6 max-w-7xl mx-auto pb-12">
                {backLink}
                <PersonnelStateCard
                    variant={isError ? 'error' : 'not-found'}
                    title={isError ? 'Impossible de charger la fiche' : 'Agent introuvable'}
                    description={
                        isError
                            ? error instanceof Error
                                ? error.message
                                : "Une erreur est survenue lors de la communication avec le service d'authentification."
                            : `Aucun agent ne correspond à l'identifiant ${agentId}. Il a pu être supprimé de l'annuaire.`
                    }
                    action={
                        isError
                            ? { label: 'Réessayer', onClick: () => refetch() }
                            : { label: 'Revenir à la liste', href: ROUTES.PERSONNEL_LIST }
                    }
                />
            </div>
        );
    }

    const initials =
        `${agent.nom?.[0] || ''}${agent.prenom?.[0] || ''}`.toUpperCase() || 'AG';

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            {backLink}

            {/* En-tête d'identité */}
            <div className="bg-surface border border-border/8 rounded-2xl p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="w-16 h-16 rounded-2xl bg-primary/8 text-surface-text border border-border/8 flex items-center justify-center font-bold text-lg shrink-0">
                            {initials}
                        </div>

                        <div className="min-w-0 space-y-1.5">
                            <h1 className="text-xl font-bold text-surface-text truncate">
                                {agent.nom.toUpperCase()} {agent.prenom}
                            </h1>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-hover/6 text-surface-text border border-border/8">
                                    {formatPersonnelType(agent.personnelType)}
                                </span>
                                <PersonnelStatusBadge
                                    status={agent.status}
                                    isConnected={agent.isConnected}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={() => refetch()}
                            disabled={isFetching}
                            title="Actualiser la fiche"
                            className="p-2.5 rounded-xl border border-border/8 bg-surface hover:bg-hover/6 text-muted hover:text-surface-text transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            <RefreshCw size={15} className={isFetching ? 'animate-spin' : ''} />
                        </button>

                        {/* Toutes les actions possibles sur cet agent, en un point unique */}
                        <PersonnelActionsMenu
                            agent={agent}
                            showViewAction={false}
                            redirectAfterDelete
                        />
                    </div>
                </div>

                {/* Informations administratives */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 pt-5 border-t border-border/8">
                    <InfoField icon={Hash} label="Matricule" value={agent.matricule} mono />
                    <InfoField icon={Mail} label="Email" value={agent.email} />
                    <InfoField icon={Phone} label="Téléphone" value={agent.telephone} />
                    <InfoField
                        icon={Building2}
                        label="Service"
                        value={agent.serviceAffectation}
                    />
                    <InfoField icon={Stethoscope} label="Spécialité" value={agent.specialite} />
                    <InfoField
                        icon={BadgeCheck}
                        label="N° d'ordre"
                        value={agent.numeroOrdre}
                        mono
                    />
                    <InfoField
                        icon={IdCard}
                        label="Genre"
                        value={agent.genre === 'M' ? 'Masculin' : agent.genre === 'F' ? 'Féminin' : undefined}
                    />
                    <InfoField
                        icon={CalendarPlus}
                        label="Créé le"
                        value={formatDateTime(agent.createdAt, '—')}
                    />
                </div>
            </div>

            {/* Rôles, sécurité et documents */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <PersonnelRolesPanel agent={agent} />
                <PersonnelSecurityPanel agent={agent} />
            </div>

            <PersonnelDocumentsPanel
                userId={agent.id}
                canManage={can(PERSONNEL_PERMISSIONS.UPDATE)}
            />
        </div>
    );
}

export default PersonnelDetailView;
