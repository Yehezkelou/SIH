'use client';

import React from 'react';
import Link from 'next/link';
import {
    UserX,
    AlertTriangle,
    FileQuestion,
    ShieldAlert,
    RotateCcw,
    LucideIcon,
} from 'lucide-react';

export type StateVariant = 'empty' | 'error' | 'not-found' | 'forbidden';

interface StateAction {
    label: string;
    onClick?: () => void;
    href?: string;
    icon?: LucideIcon;
}

interface PersonnelStateCardProps {
    variant?: StateVariant;
    title: string;
    description?: string;
    icon?: LucideIcon;
    action?: StateAction;
    className?: string;
}

const VARIANT_CONFIG: Record<
    StateVariant,
    { defaultIcon: LucideIcon; iconBg: string; iconColor: string; borderColor: string }
> = {
    empty: {
        defaultIcon: UserX,
        iconBg: 'bg-hover/6',
        iconColor: 'text-muted',
        borderColor: 'border-border/8',
    },
    error: {
        defaultIcon: AlertTriangle,
        iconBg: 'bg-danger/10',
        iconColor: 'text-danger-text',
        borderColor: 'border-danger/20',
    },
    'not-found': {
        defaultIcon: FileQuestion,
        iconBg: 'bg-info/10',
        iconColor: 'text-info-text',
        borderColor: 'border-info/20',
    },
    forbidden: {
        defaultIcon: ShieldAlert,
        iconBg: 'bg-warning/10',
        iconColor: 'text-warning-text',
        borderColor: 'border-warning/20',
    },
};

export function PersonnelStateCard({
    variant = 'empty',
    title,
    description,
    icon,
    action,
    className = '',
}: PersonnelStateCardProps) {
    const config = VARIANT_CONFIG[variant];
    const IconComponent = icon || config.defaultIcon;
    const ActionIcon = action?.icon || (variant === 'error' ? RotateCcw : undefined);

    const actionButtonContent = (
        <>
            {ActionIcon && <ActionIcon size={14} className="shrink-0" />}
            <span>{action?.label}</span>
        </>
    );

    // Un bouton plein en `danger` ne monte qu'à 3,5:1 avec du texte blanc, sous
    // le seuil AA : la couleur d'alerte reste portée par l'icône et la bordure,
    // et l'action garde le style primaire commun à toutes les CTA.
    const buttonClasses = `inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold
        transition-all shadow-xs bg-primary text-primary-text hover:opacity-90`;

    return (
        <div
            className={`bg-surface border ${config.borderColor} rounded-2xl p-10 text-center shadow-xs flex flex-col items-center justify-center ${className}`}
        >
            {/* Conteneur d'icône avec halo thématique */}
            <div
                className={`w-14 h-14 rounded-2xl ${config.iconBg} ${config.iconColor} flex items-center justify-center mb-4 transition-transform hover:scale-105`}
            >
                <IconComponent size={26} />
            </div>

            {/* Titre et description */}
            <h3 className="text-sm font-semibold text-surface-text">{title}</h3>
            {description && (
                <p className="text-xs text-muted mt-1.5 max-w-md mx-auto leading-relaxed">
                    {description}
                </p>
            )}

            {/* Bouton d'action optionnel */}
            {action && (
                <div className="mt-5">
                    {action.href ? (
                        <Link href={action.href} className={buttonClasses}>
                            {actionButtonContent}
                        </Link>
                    ) : (
                        <button
                            type="button"
                            onClick={action.onClick}
                            className={buttonClasses}
                        >
                            {actionButtonContent}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default PersonnelStateCard;
