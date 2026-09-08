'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, ShieldCheck, QrCode, ArrowRight, AlertCircle } from "lucide-react";
import { useSetupMfa, useEnableMfa } from "../hooks/useMfa";
import { MfaPinInput } from "./MfaPinInput";

interface MfaSetupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function MfaSetupModal({ isOpen, onClose, onSuccess }: MfaSetupModalProps) {
    const [step, setStep] = useState<"qr" | "verify" | "success">("qr");
    const [setupData, setSetupData] = useState<{ secret: string; otpAuthUrl: string } | null>(null);
    const [code, setCode] = useState("");
    const [copied, setCopied] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const setupMutation = useSetupMfa();
    const enableMutation = useEnableMfa();

    // Initialisation du setup dès l'ouverture de la modale
    useEffect(() => {
        if (isOpen) {
            setStep("qr");
            setCode("");
            setErrorMessage("");
            setCopied(false);
            setupMutation.mutate(undefined, {
                onSuccess: (data) => {
                    setSetupData(data);
                },
                onError: () => {
                    setErrorMessage("Impossible d'initialiser la double authentification. Veuillez réessayer.");
                },
            });
        }
    }, [isOpen]);

    const handleCopySecret = () => {
        if (!setupData?.secret) return;
        navigator.clipboard.writeText(setupData.secret);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleEnableSubmit = async (verifyCode = code) => {
        if (verifyCode.length !== 6 || enableMutation.isPending) return;
        setErrorMessage("");

        try {
            await enableMutation.mutateAsync({ code: verifyCode });
            setStep("success");
            onSuccess?.();
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err: any) {
            const serverMsg = err.response?.data?.message;
            setErrorMessage(serverMsg || "Code invalide. Vérifiez l'heure de votre appareil et réessayez.");
        }
    };

    if (!isOpen) return null;

    // URL du QR code généré de manière sécurisée via l'otpauth:// standard
    const qrCodeUrl = setupData?.otpAuthUrl
        ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=0&data=${encodeURIComponent(setupData.otpAuthUrl)}`
        : null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Fond d'écran assombri et flouté */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
                />

                {/* Conteneur de la modale */}
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
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-surface-text">
                                Activer la double authentification (MFA)
                            </h2>
                            <p className="text-xs text-muted">
                                Sécurisez votre compte hospitalier avec TOTP
                            </p>
                        </div>
                    </div>

                    {/* Erreur globale */}
                    {errorMessage && (
                        <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger-text text-xs flex items-center gap-2">
                            <AlertCircle size={15} className="shrink-0" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    {/* Étape 1 : Affichage du QR Code et de la clé secrète */}
                    {step === "qr" && (
                        <div className="flex flex-col items-center">
                            {setupMutation.isPending || !setupData ? (
                                <div className="h-48 w-48 rounded-2xl bg-hover/6 animate-pulse flex items-center justify-center text-xs text-muted">
                                    Génération du secret...
                                </div>
                            ) : (
                                <>
                                    <div className="p-3 bg-white rounded-2xl shadow-inner border border-slate-200">
                                        {qrCodeUrl ? (
                                            <img
                                                src={qrCodeUrl}
                                                alt="QR Code MFA"
                                                className="w-40 h-40 object-contain rounded-lg"
                                            />
                                        ) : (
                                            <QrCode size={160} className="text-slate-800" />
                                        )}
                                    </div>

                                    <p className="text-xs text-muted text-center mt-3 max-w-xs">
                                        Scannez ce QR Code avec <strong>Google Authenticator</strong> ou <strong>Microsoft Authenticator</strong>.
                                    </p>

                                    {/* Clé secrète manuelle */}
                                    <div className="w-full mt-3 p-2.5 rounded-xl bg-hover/6 border border-border/8 flex items-center justify-between gap-2 text-xs">
                                        <div className="truncate">
                                            <span className="text-[10px] text-muted block">Clé de configuration manuelle :</span>
                                            <span className="font-mono font-bold text-surface-text select-all">
                                                {setupData.secret}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleCopySecret}
                                            className="px-2.5 py-1 rounded-lg bg-surface text-surface-text border border-border/8 hover:bg-hover/6 transition-colors shrink-0 flex items-center gap-1 font-medium text-xs cursor-pointer"
                                        >
                                            {copied ? <Check size={12} className="text-success" /> : <Copy size={12} />}
                                            <span>{copied ? "Copié" : "Copier"}</span>
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setStep("verify")}
                                        className="w-full mt-5 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-text font-semibold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                                    >
                                        <span>J'ai scanné le QR Code</span>
                                        <ArrowRight size={14} />
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    {/* Étape 2 : Saisie du premier code à 6 chiffres */}
                    {step === "verify" && (
                        <div className="flex flex-col items-center">
                            <p className="text-xs text-muted text-center mb-4">
                                Entrez le code à 6 chiffres généré par votre application pour confirmer la liaison.
                            </p>

                            <MfaPinInput
                                value={code}
                                onChange={(val) => {
                                    setCode(val);
                                    if (errorMessage) setErrorMessage("");
                                }}
                                onComplete={handleEnableSubmit}
                                disabled={enableMutation.isPending}
                                error={Boolean(errorMessage)}
                            />

                            <div className="flex items-center gap-3 w-full mt-6">
                                <button
                                    type="button"
                                    onClick={() => setStep("qr")}
                                    className="w-1/3 py-2.5 px-3 rounded-xl border border-border/8 text-surface-text hover:bg-hover/6 font-medium text-xs transition-colors cursor-pointer"
                                >
                                    Retour
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleEnableSubmit()}
                                    disabled={code.length !== 6 || enableMutation.isPending}
                                    className="w-2/3 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-text font-semibold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {enableMutation.isPending ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-primary-text border-t-transparent rounded-full animate-spin" />
                                            <span>Activation...</span>
                                        </>
                                    ) : (
                                        <span>Activer le MFA</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Étape 3 : Confirmation de succès */}
                    {step === "success" && (
                        <div className="flex flex-col items-center py-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-success/15 text-success flex items-center justify-center mb-3">
                                <Check size={24} />
                            </div>
                            <h3 className="text-base font-bold text-surface-text">
                                Double authentification activée !
                            </h3>
                            <p className="text-xs text-muted mt-1 max-w-xs">
                                Votre compte est désormais protégé. Ce code sera demandé lors de chaque nouvelle connexion.
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
