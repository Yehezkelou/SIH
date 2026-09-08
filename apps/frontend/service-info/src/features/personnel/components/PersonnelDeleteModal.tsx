'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { AgentUser } from '../schema';
import { useDeleteAgent } from '../hooks/useApiPeronnel';
import { Button } from '@/components/ui/Button';
import { FormAlert } from '@/components/ui/FormAlert';
import { ROUTES } from '@/config/routes';

interface PersonnelDeleteModalProps {
    agent: AgentUser | null;
    onClose: () => void;
    /** Depuis la fiche, on ne peut pas rester sur un agent supprimé. */
    redirectOnSuccess?: boolean;
}

export function PersonnelDeleteModal({
    agent,
    onClose,
    redirectOnSuccess = false,
}: PersonnelDeleteModalProps) {
    const router = useRouter();
    const deleteMutation = useDeleteAgent();
    const [serverError, setServerError] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!agent) return;
        setServerError(null);
        try {
            await deleteMutation.mutateAsync(agent.id);
            onClose();
            if (redirectOnSuccess) router.push(ROUTES.PERSONNEL_LIST);
        } catch (err) {
            const response = (err as { response?: { data?: { message?: string } } }).response;
            setServerError(
                response?.data?.message ||
                    (err as Error).message ||
                    'Impossible de supprimer ce compte agent.'
            );
        }
    };

    return (
        <AnimatePresence>
            {agent && (
                <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-md bg-surface border border-border/8 rounded-3xl p-6 shadow-2xl space-y-5"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-danger/10 text-danger-text border border-danger/20 flex items-center justify-center shrink-0">
                                    <AlertTriangle size={24} />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-surface-text">
                                        Supprimer le compte agent
                                    </h3>
                                    <p className="text-xs text-muted">
                                        Retrait de l'annuaire du personnel
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                className="p-1.5 rounded-xl text-muted hover:text-surface-text hover:bg-hover/6 transition-colors cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <FormAlert
                            variant="danger"
                            message={serverError}
                            onClose={() => setServerError(null)}
                        />

                        <div className="p-4 rounded-2xl bg-page border border-border/8 space-y-2 text-xs">
                            <p className="text-surface-text">
                                Confirmez-vous la suppression du compte de{' '}
                                <strong className="font-bold">
                                    {agent.nom.toUpperCase()} {agent.prenom}
                                </strong>{' '}
                                <span className="font-mono text-[11px] text-muted">
                                    ({agent.matricule})
                                </span>{' '}
                                ?
                            </p>
                            <p className="text-muted">
                                Le service applique une suppression douce : le compte est retiré de
                                l'annuaire et perd tout accès, mais son historique reste conservé
                                pour l'audit.
                            </p>
                            {agent.isConnected && (
                                <div className="p-2.5 rounded-xl bg-warning/10 border border-warning/20 text-warning-text text-[11px]">
                                    Cet agent est actuellement connecté. Sa session sera
                                    interrompue.
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-2.5 pt-1">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onClose}
                                disabled={deleteMutation.isPending}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="button"
                                variant="danger"
                                icon={Trash2}
                                onClick={handleDelete}
                                isLoading={deleteMutation.isPending}
                            >
                                Confirmer la suppression
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default PersonnelDeleteModal;
