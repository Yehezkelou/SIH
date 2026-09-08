'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2, LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: LucideIcon;
    isLoading?: boolean;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-primary-text hover:opacity-90 shadow-xs border border-transparent',
    secondary: 'bg-surface text-surface-text hover:bg-hover/6 border border-border/8',
    outline: 'bg-transparent text-surface-text hover:bg-hover/6 border border-border/8',
    // `bg-danger` plein avec du texte blanc plafonne à 3,5:1, sous le seuil AA.
    // L'alerte passe par la teinte et la bordure, la lisibilité par `danger-text`.
    danger: 'bg-danger/10 text-danger-text hover:bg-danger/15 border border-danger/20',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-4 py-2.5 text-xs rounded-xl gap-2 font-semibold',
    lg: 'px-6 py-3 text-sm rounded-2xl gap-2.5 font-semibold',
};

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    isLoading = false,
    disabled,
    className = '',
    ...props
}: ButtonProps) {
    return (
        <motion.button
            whileHover={!disabled && !isLoading ? { scale: 1.015 } : undefined}
            whileTap={!disabled && !isLoading ? { scale: 0.97 } : undefined}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            disabled={disabled || isLoading}
            className={`inline-flex items-center justify-center cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
            {...props}
        >
            {isLoading ? (
                <Loader2 size={size === 'sm' ? 13 : 16} className="animate-spin" />
            ) : (
                Icon && <Icon size={size === 'sm' ? 13 : 16} className="shrink-0" />
            )}
            <span className="inline-flex items-center gap-1.5">{children}</span>
        </motion.button>
    );
}

export default Button;
