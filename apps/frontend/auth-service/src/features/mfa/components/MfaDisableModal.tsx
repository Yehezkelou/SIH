'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, ShieldOff, AlertCircle } from "lucide-react";
import { useDisableMfa } from "../hooks/useMfa";
import { MfaPinInput } from "./MfaPinInput";

interface MfaDisableModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function MfaDisableModal({ isOpen, onClose, onSuccess }: MfaDisableModalProps) {
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const disableMutation = useDisableMfa();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password || code.length !== 6 || disableMutation.isPending) return;
        setErrorMessage("");

        try {
            await disableMutation.mutateAsync({
                password,
                code,
            });
            onSuccess?.();
            onClose();
        } catch (err: any) {
            const serverMsg = err.response?.data?.message;
            setErrorMessage(serverMsg || "Mot de passe ou code incorrect.");
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-md p-6 rounded-3xl bg-surface border border-border/8 shadow-2xl z-10 text-left overflow-hidden flex flex-col"
                >
                    {/* Bouton Fermer */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full text-muted hover:text-surface-text hover:bg-hover/6 transition-colors cursor-pointer"
                    >
                        <X size={18} />
                    </button>

                    {/* En-tête */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-danger/10 text-danger-text flex items-center justify-center shrink-0">
                            <ShieldOff size={20} />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-surface-text">
                                Désactiver la double authentification
                            </h2>
                            <p className="text-xs text-muted">
                                Confirmez votre identité pour désactiver le MFA
                            </p>
                        </div>
                    </div>

                    {/* Avertissement de sécurité */}
                    <div className="mb-4 p-3 rounded-xl bg-warning/10 border border-warning/20 text-warning-text text-xs flex items-start gap-2">
                        <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                            Attention : la désactivation réduira le niveau de sécurité de votre compte hospitalier.
                        </span>
                    </div>

                    {/* Message d'erreur */}
                    {errorMessage && (
                        <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger-text text-xs flex items-center gap-2">
                            <AlertCircle size={15} className="shrink-0" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Mot de passe */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-surface-text">
                                Mot de passe du compte :
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Saisissez votre mot de passe actuel"
                                required
                                className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border/8 text-surface-text text-xs focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted"
                            />
                        </div>

                        {/* Code TOTP actuel */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-surface-text">
                                Code de sécurité actuel (6 chiffres) :
                            </label>
                            <MfaPinInput
                                value={code}
                                onChange={setCode}
                                disabled={disableMutation.isPending}
                            />
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex items-center gap-3 mt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-1/3 py-2.5 px-3 rounded-xl border border-border/8 text-surface-text hover:bg-hover/6 font-medium text-xs transition-colors cursor-pointer"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={!password || code.length !== 6 || disableMutation.isPending}
                                className="w-2/3 py-2.5 px-4 rounded-xl bg-danger text-danger-text hover:bg-danger/80 font-semibold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {disableMutation.isPending ? (
                                    <>
                                        <div className="w-3.5 h-3.5 border-2 border-danger-text border-t-transparent rounded-full animate-spin" />
                                        <span>Désactivation...</span>
                                    </>
                                ) : (
                                    <span>Confirmer la désactivation</span>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
