'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Role } from '../schema';
import { useDeleteRole } from '../hooks/useRoles';
import { Button } from '@/components/ui/Button';
import { FormAlert } from '@/components/ui/FormAlert';

interface RoleDeleteModalProps {
    role: Role | null;
    isOpen: boolean;
    onClose: () => void;
}

export function RoleDeleteModal({ role, isOpen, onClose }: RoleDeleteModalProps) {
    const deleteMutation = useDeleteRole();
    const [serverError, setServerError] = useState<string | null>(null);

    const agentCount = role?.userRoles?.length || 0;
    const canDelete = Boolean(role) && !role?.isSystem && agentCount === 0;

    const handleDelete = async () => {
        if (!role) return;
        setServerError(null);
        try {
            await deleteMutation.mutateAsync(role.id);
            onClose();
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.message ||
                'Impossible de supprimer ce rôle.';
            setServerError(msg);
        }
    };

    // `AnimatePresence` reste monté : c'est lui qui joue la sortie. Un
    // `return null` au-dessus le démontait avec son enfant, et l'`exit`
    // n'était jamais visible.
    return (
        <AnimatePresence>
            {isOpen && role && (
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
                    {/* En-tête */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-danger/10 text-danger flex items-center justify-center shrink-0 border border-danger/20">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-surface-text">
                                    Supprimer le rôle
                                </h3>
                                <p className="text-xs text-muted">
                                    Confirmation de retrait définitif
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

                    {/* Contenu explicatif */}
                    <div className="p-4 rounded-2xl bg-page border border-border/8 space-y-2 text-xs">
                        <p className="text-surface-text">
                            Êtes-vous sûr de vouloir supprimer le rôle{' '}
                            <strong className="text-primary font-bold">{role.libelle}</strong> (
                            <span className="font-mono text-[11px]">{role.code}</span>) ?
                        </p>

                        {agentCount > 0 && (
                            <div className="p-2.5 rounded-xl bg-warning/10 border border-warning/20 text-warning-text text-[11px] space-y-1">
                                <p className="font-semibold">Action bloquée :</p>
                                <p>
                                    Ce rôle est actuellement attribué à{' '}
                                    <strong>{agentCount} collaborateur(s)</strong>. Vous devez réassigner
                                    leurs rôles avant de pouvoir le supprimer.
                                </p>
                            </div>
                        )}

                        {role.isSystem && (
                            <div className="p-2.5 rounded-xl bg-danger/10 border border-danger/20 text-danger text-[11px]">
                                Ce rôle est un rôle système fondamental et ne peut pas être supprimé.
                            </div>
                        )}
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex items-center justify-end gap-2.5 pt-2">
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
                            disabled={!canDelete}
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

export default RoleDeleteModal;
