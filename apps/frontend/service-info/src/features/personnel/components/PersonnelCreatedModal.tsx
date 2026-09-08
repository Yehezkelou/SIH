'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Copy, Check, UserPlus, ShieldAlert, ArrowRight, FileCheck } from 'lucide-react';
import { AgentUser } from '../schema';
import { ROUTES } from '@/config/routes';
import { Button } from '@/components/ui/Button';

interface PersonnelCreatedModalProps {
    agent: AgentUser | null;
    temporaryPassword?: string;
    documentsCount?: number;
    isOpen: boolean;
    onResetForm: () => void;
}

export function PersonnelCreatedModal({
    agent,
    temporaryPassword,
    documentsCount,
    isOpen,
    onResetForm,
}: PersonnelCreatedModalProps) {
    const [copied, setCopied] = useState(false);

    if (!isOpen || !agent) return null;

    const handleCopy = () => {
        if (temporaryPassword) {
            navigator.clipboard.writeText(temporaryPassword);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="w-full max-w-md bg-surface border border-border/8 rounded-3xl p-6 shadow-2xl space-y-5"
                >
                    {/* En-tête succès */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-success/15 text-success-text flex items-center justify-center shrink-0 border border-success/20">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-surface-text">Agent créé avec succès</h3>
                            <p className="text-xs text-muted">Le compte hospitalier est en attente d'activation</p>
                        </div>
                    </div>

                    {/* Fiche récapitulative */}
                    <div className="p-4 rounded-2xl bg-page border border-border/8 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                            <span className="text-muted">Agent</span>
                            <span className="font-semibold text-surface-text">
                                {agent.nom.toUpperCase()} {agent.prenom}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted">Matricule RH</span>
                            <span className="font-mono font-bold text-primary">{agent.matricule}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted">Email de connexion</span>
                            <span className="font-medium text-surface-text">{agent.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted">Corps de métier</span>
                            <span className="px-2 py-0.5 rounded-md bg-hover/6 font-medium text-surface-text">
                                {agent.personnelType}
                            </span>
                        </div>
                        {documentsCount !== undefined && documentsCount > 0 && (
                            <div className="flex items-center justify-between pt-1 border-t border-border/8">
                                <span className="text-muted flex items-center gap-1.5">
                                    <FileCheck size={14} className="text-success" />
                                    Justificatifs rattachés
                                </span>
                                <span className="font-semibold text-primary">
                                    {documentsCount} {documentsCount > 1 ? 'fichiers' : 'fichier'}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Mot de passe temporaire à copier */}
                    {temporaryPassword && (
                        <div className="p-4 rounded-2xl bg-primary/5 border border-border/12 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-surface-text flex items-center gap-1.5">
                                    Mot de passe temporaire
                                </span>
                                <span className="text-[10px] uppercase font-bold text-warning-text bg-warning/10 px-2 py-0.5 rounded-md">
                                    À usage unique
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-surface border border-border/8">
                                <code className="font-mono font-bold text-xs text-primary tracking-wider select-all">
                                    {temporaryPassword}
                                </code>
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-hover/6 hover:bg-hover/12 text-surface-text transition-colors cursor-pointer"
                                >
                                    {copied ? (
                                        <>
                                            <Check size={12} className="text-success-text" />
                                            <span className="text-success-text text-[11px]">Copié !</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={12} />
                                            <span className="text-[11px]">Copier</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            <p className="text-[11px] text-muted flex items-start gap-1 leading-relaxed">
                                <ShieldAlert size={12} className="shrink-0 mt-0.5 text-warning-text" />
                                <span>
                                    Communiquez ce mot de passe à l'agent. Il devra obligatoirement le changer dès sa première connexion.
                                </span>
                            </p>
                        </div>
                    )}

                    {/* Actions de navigation */}
                    <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                        <Button
                            variant="secondary"
                            size="md"
                            icon={UserPlus}
                            onClick={onResetForm}
                            className="flex-1"
                        >
                            Créer un autre agent
                        </Button>

                        <Link
                            href={ROUTES.PERSONNEL_LIST}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-primary text-primary-text hover:opacity-90 transition-all shadow-xs"
                        >
                            <span>Voir la liste</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

export default PersonnelCreatedModal;
