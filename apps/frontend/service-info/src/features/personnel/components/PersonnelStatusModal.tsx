'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert } from 'lucide-react';
import { AgentUser } from '../schema';
import { StatusTransition, formatStatusLabel } from '../utils/personnelActions';
import { useStatusAgent } from '../hooks/useApiPeronnel';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FormAlert } from '@/components/ui/FormAlert';

interface PersonnelStatusModalProps {
    agent: AgentUser | null;
    transition: StatusTransition | null;
    onClose: () => void;
}

export function PersonnelStatusModal({ agent, transition, onClose }: PersonnelStatusModalProps) {
    const statusMutation = useStatusAgent();
    const [motif, setMotif] = useState('');
    const [motifError, setMotifError] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);

    const isOpen = Boolean(agent && transition);

    useEffect(() => {
        setMotif('');
        setMotifError(null);
        setServerError(null);
    }, [agent?.id, transition?.target]);

    const handleConfirm = async () => {
        if (!agent || !transition) return;

        if (transition.requiresMotif && !motif.trim()) {
            setMotifError('Un motif est requis pour tracer cette décision.');
            return;
        }

        setServerError(null);
        try {
            await statusMutation.mutateAsync({
                id: agent.id,
                status: transition.target,
                motif: motif.trim() || undefined,
            });
            onClose();
        } catch (err) {
            const response = (err as { response?: { data?: { message?: string } } }).response;
            setServerError(
                response?.data?.message ||
                    (err as Error).message ||
                    'Le changement de statut a échoué.'
            );
        }
    };

    return (
        <AnimatePresence>
            {isOpen && agent && transition && (
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
                                <div
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                                        transition.tone === 'danger'
                                            ? 'bg-warning/10 text-warning-text border-warning/20'
                                            : 'bg-success/10 text-success-text border-success/20'
                                    }`}
                                >
                                    <ShieldAlert size={24} />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-surface-text">
                                        {transition.label}
                                    </h3>
                                    <p className="text-xs text-muted">{transition.description}</p>
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
                                Agent :{' '}
                                <strong className="font-bold">
                                    {agent.nom.toUpperCase()} {agent.prenom}
                                </strong>{' '}
                                <span className="font-mono text-[11px] text-muted">
                                    ({agent.matricule})
                                </span>
                            </p>
                            <p className="text-muted">
                                Statut : <strong>{formatStatusLabel(agent.status)}</strong> →{' '}
                                <strong className="text-surface-text">
                                    {formatStatusLabel(transition.target)}
                                </strong>
                            </p>
                            {agent.isConnected && transition.target !== 'ACTIF' && (
                                <p className="text-[11px] text-warning-text">
                                    Cet agent a une session ouverte : elle sera interrompue.
                                </p>
                            )}
                        </div>

                        <Input
                            label="Motif"
                            required={transition.requiresMotif}
                            placeholder="ex: Départ de l'établissement, procédure disciplinaire..."
                            value={motif}
                            onChange={(e) => {
                                setMotif(e.target.value);
                                if (motifError) setMotifError(null);
                            }}
                            error={motifError || undefined}
                            helperText="Conservé dans le journal d'audit du compte."
                        />

                        <div className="flex items-center justify-end gap-2.5 pt-1">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onClose}
                                disabled={statusMutation.isPending}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="button"
                                variant={transition.tone === 'danger' ? 'danger' : 'primary'}
                                onClick={handleConfirm}
                                isLoading={statusMutation.isPending}
                            >
                                Confirmer
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default PersonnelStatusModal;
