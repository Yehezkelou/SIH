'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface RoleStateCardProps {
    variant?: 'empty' | 'error';
    title: string;
    description?: string;
    onAction?: () => void;
    actionLabel?: string;
}

export function RoleStateCard({
    variant = 'empty',
    title,
    description,
    onAction,
    actionLabel,
}: RoleStateCardProps) {
    const isError = variant === 'error';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl border border-border/8 bg-surface shadow-xs space-y-4 my-4"
        >
            <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    isError
                        ? 'bg-danger/10 text-danger border border-danger/20'
                        : 'bg-primary/10 text-primary border border-primary/20'
                }`}
            >
                {isError ? <AlertCircle size={28} /> : <Shield size={28} />}
            </div>

            <div className="max-w-md space-y-1">
                <h3 className="text-base font-bold text-surface-text">{title}</h3>
                {description && <p className="text-xs text-muted leading-relaxed">{description}</p>}
            </div>

            {onAction && actionLabel && (
                <Button
                    type="button"
                    variant={isError ? 'secondary' : 'primary'}
                    icon={isError ? undefined : Plus}
                    onClick={onAction}
                >
                    {actionLabel}
                </Button>
            )}
        </motion.div>
    );
}

export default RoleStateCard;
