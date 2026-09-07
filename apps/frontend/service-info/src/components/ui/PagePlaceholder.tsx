import React from 'react';
import { Construction, type LucideIcon } from 'lucide-react';

interface PagePlaceholderProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
}

/**
 * Écran d'attente pour une route déclarée dans la navigation mais pas encore
 * implémentée. Évite qu'un lien de la sidebar renvoie un 404.
 */
export function PagePlaceholder({
    title,
    description,
    icon: Icon = Construction,
}: PagePlaceholderProps) {
    return (
        <div className="bg-surface border border-border/8 rounded-2xl p-10 text-center shadow-xs flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-hover/6 text-muted flex items-center justify-center mb-4">
                <Icon size={26} />
            </div>
            <h3 className="text-sm font-semibold text-surface-text">{title}</h3>
            <p className="text-xs text-muted mt-1.5 max-w-md mx-auto leading-relaxed">
                {description ?? 'Cette section est en cours de développement.'}
            </p>
        </div>
    );
}

export default PagePlaceholder;
