'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LucideIcon } from 'lucide-react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    icon?: LucideIcon;
    tone?: 'primary' | 'danger' | 'warning';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const SIZES = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
};

const TONES = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    danger: 'bg-danger/10 text-danger-text border-danger/20',
    warning: 'bg-warning/10 text-warning-text border-warning/20',
};

export function Modal({
    open,
    onClose,
    title,
    description,
    icon: Icon,
    tone = 'primary',
    size = 'md',
    children,
    footer,
}: ModalProps) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    onMouseDown={onClose}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto"
                >
                    <motion.div
                        key="panel"
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        onMouseDown={(e) => e.stopPropagation()}
                        className={`w-full ${SIZES[size]} bg-surface border border-border/8 rounded-3xl shadow-2xl my-8 max-h-[92vh] flex flex-col`}
                    >
                        <div className="flex items-start gap-3 p-6 pb-4">
                            {Icon && (
                                <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 ${TONES[tone]}`}>
                                    <Icon size={20} />
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <h2 className="text-base font-bold text-surface-text leading-tight">{title}</h2>
                                {description && <p className="text-xs text-muted mt-0.5">{description}</p>}
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Fermer"
                                className="p-1.5 rounded-lg text-muted hover:text-surface-text hover:bg-hover/6 transition-colors cursor-pointer shrink-0"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="px-6 overflow-y-auto flex-1">{children}</div>

                        {footer && (
                            <div className="flex items-center justify-end gap-2 p-6 pt-4 border-t border-border/8 mt-2">
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Modal;
