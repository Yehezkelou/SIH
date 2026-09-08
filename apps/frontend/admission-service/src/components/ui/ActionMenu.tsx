'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, LucideIcon } from 'lucide-react';

const MENU_WIDTH = 240;
const VIEWPORT_MARGIN = 8;

export interface ActionMenuItem {
    /** Identifiant stable, utilisé comme clé React. */
    key: string;
    label: string;
    icon?: LucideIcon;
    /** Navigation. Exclusif avec `onSelect`. */
    href?: string;
    onSelect?: () => void;
    /** `danger` teinte l'entrée en rouge (suppression, révocation). */
    tone?: 'default' | 'danger';
    disabled?: boolean;
    /** Affiché sous le libellé quand l'entrée est désactivée : dire pourquoi. */
    disabledReason?: string;
    /** Trace un séparateur au-dessus de l'entrée. */
    separatorBefore?: boolean;
}

interface ActionMenuProps {
    items: ActionMenuItem[];
    label?: string;
    align?: 'left' | 'right';
    /** Message affiché si aucune action n'est disponible pour cet utilisateur. */
    emptyLabel?: string;
}

/**
 * Menu d'actions contextuel.
 *
 * Les entrées sont fournies déjà filtrées par le droit de l'utilisateur : ce
 * composant n'a aucune connaissance du RBAC, il se contente de rendre ce qu'on
 * lui donne. Une liste vide affiche un déclencheur désactivé plutôt que rien,
 * pour que la colonne « Actions » ne paraisse pas cassée.
 */
export function ActionMenu({
    items,
    label = 'Actions',
    align = 'right',
    emptyLabel = 'Aucune action disponible',
}: ActionMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    /**
     * Position calculée depuis le déclencheur.
     *
     * Le menu est rendu dans un portail sur `document.body` : dans un tableau,
     * l'ancêtre `overflow-x-auto` établit un contexte de rognage qui couperait
     * un menu simplement `absolute`, d'autant plus sur les dernières lignes.
     */
    const updatePosition = useCallback(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        const rect = trigger.getBoundingClientRect();
        const menuHeight = menuRef.current?.offsetHeight ?? 0;

        // Bascule au-dessus du déclencheur s'il n'y a pas la place en dessous.
        const spaceBelow = window.innerHeight - rect.bottom;
        const openUpward = menuHeight > 0 && spaceBelow < menuHeight + VIEWPORT_MARGIN;

        const left =
            align === 'right'
                ? Math.max(VIEWPORT_MARGIN, rect.right - MENU_WIDTH)
                : Math.min(rect.left, window.innerWidth - MENU_WIDTH - VIEWPORT_MARGIN);

        setPosition({
            top: openUpward ? rect.top - menuHeight - 6 : rect.bottom + 6,
            left,
        });
    }, [align]);

    useLayoutEffect(() => {
        if (isOpen) updatePosition();
    }, [isOpen, updatePosition, items.length]);

    // Fermeture au clic extérieur et à la touche Échap ; suivi du défilement.
    useEffect(() => {
        if (!isOpen) return;

        const onPointerDown = (event: MouseEvent) => {
            const target = event.target as Node;
            const insideTrigger = containerRef.current?.contains(target);
            const insideMenu = menuRef.current?.contains(target);
            if (!insideTrigger && !insideMenu) setIsOpen(false);
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                triggerRef.current?.focus();
            }
        };
        // `capture` pour suivre aussi le défilement des conteneurs internes.
        const onReflow = () => updatePosition();

        document.addEventListener('mousedown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        window.addEventListener('scroll', onReflow, true);
        window.addEventListener('resize', onReflow);
        return () => {
            document.removeEventListener('mousedown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('scroll', onReflow, true);
            window.removeEventListener('resize', onReflow);
        };
    }, [isOpen, updatePosition]);

    const hasItems = items.length > 0;

    const itemClasses = (item: ActionMenuItem) =>
        `w-full text-left flex items-start gap-2.5 px-3 py-2 text-xs transition-colors ${
            item.disabled
                ? 'text-muted/60 cursor-not-allowed'
                : item.tone === 'danger'
                  ? 'text-danger-text hover:bg-danger/10 cursor-pointer'
                  : 'text-surface-text hover:bg-hover/6 cursor-pointer'
        }`;

    const itemBody = (item: ActionMenuItem) => (
        <>
            {item.icon && <item.icon size={14} className="shrink-0 mt-0.5" />}
            <span className="flex-1 min-w-0">
                <span className="block font-medium">{item.label}</span>
                {item.disabled && item.disabledReason && (
                    <span className="block text-[10px] text-muted leading-tight mt-0.5">
                        {item.disabledReason}
                    </span>
                )}
            </span>
        </>
    );

    return (
        <div className="relative inline-block" ref={containerRef}>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                disabled={!hasItems}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-label={label}
                title={hasItems ? label : emptyLabel}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium
                text-surface-text bg-hover/6 border border-border/8 hover:bg-hover/12 transition-colors
                disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
                <MoreHorizontal size={14} />
                <span className="hidden md:inline">{label}</span>
            </button>

            {typeof document !== 'undefined' &&
                createPortal(
                    <AnimatePresence>
                        {isOpen && hasItems && (
                            <motion.div
                                ref={menuRef}
                                role="menu"
                                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                                transition={{ duration: 0.14, ease: 'easeOut' }}
                                style={{
                                    top: position?.top ?? 0,
                                    left: position?.left ?? 0,
                                    width: MENU_WIDTH,
                                    // Tant que la position n'est pas mesurée, le menu
                                    // reste invisible pour éviter un saut visuel.
                                    visibility: position ? 'visible' : 'hidden',
                                }}
                                className="fixed z-50 py-1 rounded-xl bg-surface border border-border/8
                                shadow-xl overflow-hidden"
                            >
                        {items.map((item) => (
                            <div key={item.key}>
                                {item.separatorBefore && (
                                    <div className="my-1 border-t border-border/8" />
                                )}

                                {item.href && !item.disabled ? (
                                    <Link
                                        role="menuitem"
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={itemClasses(item)}
                                    >
                                        {itemBody(item)}
                                    </Link>
                                ) : (
                                    <button
                                        role="menuitem"
                                        type="button"
                                        disabled={item.disabled}
                                        onClick={() => {
                                            setIsOpen(false);
                                            item.onSelect?.();
                                        }}
                                        className={itemClasses(item)}
                                    >
                                        {itemBody(item)}
                                    </button>
                                )}
                            </div>
                        ))}
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </div>
    );
}

export default ActionMenu;
