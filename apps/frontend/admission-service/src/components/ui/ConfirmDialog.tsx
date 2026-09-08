'use client';

import React from 'react';
import { AlertTriangle, LucideIcon } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { FormAlert } from './FormAlert';

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: React.ReactNode;
    confirmLabel?: string;
    tone?: 'danger' | 'warning' | 'primary';
    icon?: LucideIcon;
    isLoading?: boolean;
    error?: string | null;
}

export function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = 'Confirmer',
    tone = 'danger',
    icon = AlertTriangle,
    isLoading,
    error,
}: Props) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
            icon={icon}
            tone={tone}
            size="sm"
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={isLoading}>
                        Annuler
                    </Button>
                    <Button variant={tone === 'danger' ? 'danger' : 'primary'} onClick={onConfirm} isLoading={isLoading}>
                        {confirmLabel}
                    </Button>
                </>
            }
        >
            <div className="space-y-3 pb-2">
                <FormAlert variant="danger" message={error} />
                <div className="text-xs text-surface-text leading-relaxed">{message}</div>
            </div>
        </Modal>
    );
}

export default ConfirmDialog;
