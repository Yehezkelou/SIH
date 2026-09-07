'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

export type AlertVariant = 'danger' | 'warning' | 'success' | 'info';

interface FormAlertProps {
    variant?: AlertVariant;
    title?: string;
    message?: string | null;
    onClose?: () => void;
    className?: string;
}

const VARIANT_CONFIG: Record<
    AlertVariant,
    { bg: string; border: string; text: string; icon: React.ElementType }
> = {
    danger: {
        bg: 'bg-danger/10',
        border: 'border-danger/20',
        text: 'text-danger-text',
        icon: AlertCircle,
    },
    warning: {
        bg: 'bg-warning/10',
        border: 'border-warning/20',
        text: 'text-warning-text',
        icon: AlertTriangle,
    },
    success: {
        bg: 'bg-success/10',
        border: 'border-success/20',
        text: 'text-success-text',
        icon: CheckCircle2,
    },
    info: {
        bg: 'bg-info/10',
        border: 'border-info/20',
        text: 'text-info-text',
        icon: Info,
    },
};

export function FormAlert({
    variant = 'danger',
    title,
    message,
    onClose,
    className = '',
}: FormAlertProps) {
    if (!message) return null;

    const config = VARIANT_CONFIG[variant];
    const Icon = config.icon;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={`p-4 rounded-2xl border ${config.bg} ${config.border} ${config.text} flex items-start gap-3 shadow-xs ${className}`}
            >
                <Icon size={18} className="shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                    {title && <h4 className="text-xs font-bold leading-tight mb-0.5">{title}</h4>}
                    <p className="text-xs leading-relaxed opacity-95">{message}</p>
                </div>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer shrink-0"
                    >
                        <X size={14} />
                    </button>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

export default FormAlert;
