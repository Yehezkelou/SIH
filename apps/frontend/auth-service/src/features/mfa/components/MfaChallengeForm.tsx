'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, ArrowLeft, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { MfaPinInput } from "./MfaPinInput";
import { useVerifyMfa } from "../hooks/useMfa";

interface MfaChallengeFormProps {
    mfaToken: string;
}

export function MfaChallengeForm({ mfaToken }: MfaChallengeFormProps) {
    const [code, setCode] = useState("");
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes en secondes
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const verifyMfa = useVerifyMfa();

    // Compte à rebours de 3 minutes correspondant à la validité du mfaToken backend
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleSubmit = async (submitCode = code) => {
        if (submitCode.length !== 6 || timeLeft <= 0 || verifyMfa.isPending) return;
        setErrorMessage("");

        try {
            await verifyMfa.mutateAsync({
                mfaToken,
                code: submitCode,
            });
        } catch (err: any) {
            const serverMsg = err.response?.data?.message;
            if (err.response?.status === 401) {
                setErrorMessage(serverMsg || "Code de vérification invalide ou expiré.");
            } else {
                setErrorMessage("Une erreur est survenue lors de la validation du code.");
            }
        }
    };

    const handlePinComplete = (completedCode: string) => {
        handleSubmit(completedCode);
    };

    const isExpired = timeLeft <= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-surface/90 backdrop-blur-xl border border-border/8 shadow-2xl flex flex-col items-center text-center"
        >
            {/* En-tête avec icône bouclier sécurisé */}
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-xs">
                <ShieldCheck size={28} />
            </div>

            <h1 className="text-xl font-bold text-surface-text tracking-tight">
                Authentification à deux facteurs
            </h1>

            <p className="text-xs text-muted mt-1.5 max-w-xs leading-relaxed">
                Ouvrez votre application d'authentification (Google Authenticator, Microsoft Authenticator) et saisissez le code à 6 chiffres.
            </p>

            {/* Compte à rebours */}
            <div className={`flex items-center gap-1.5 mt-3 text-xs font-mono font-semibold px-3 py-1 rounded-full border transition-colors ${
                isExpired
                    ? 'bg-danger/10 border-danger/20 text-danger-text'
                    : timeLeft < 30
                    ? 'bg-warning/10 border-warning/20 text-warning-text'
                    : 'bg-hover/6 border-border/8 text-muted'
            }`}>
                <Clock size={13} />
                <span>
                    {isExpired ? "Session expirée" : `Temps restant : ${formatTime(timeLeft)}`}
                </span>
            </div>

            {/* Message d'erreur */}
            {errorMessage && (
                <div className="w-full mt-4 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger-text text-xs flex items-center gap-2 text-left">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* Champ de saisie PIN 6 chiffres */}
            <div className="w-full my-6">
                <MfaPinInput
                    value={code}
                    onChange={(val) => {
                        setCode(val);
                        if (errorMessage) setErrorMessage("");
                    }}
                    onComplete={handlePinComplete}
                    disabled={isExpired || verifyMfa.isPending}
                    error={Boolean(errorMessage)}
                />
            </div>

            {/* Bouton de confirmation manuel si pas d'auto-submit */}
            <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={code.length !== 6 || isExpired || verifyMfa.isPending}
                className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-text font-semibold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {verifyMfa.isPending ? (
                    <>
                        <div className="w-4 h-4 border-2 border-primary-text border-t-transparent rounded-full animate-spin" />
                        <span>Validation en cours...</span>
                    </>
                ) : (
                    <span>Valider et se connecter</span>
                )}
            </button>

            {/* Lien de retour au login */}
            <button
                type="button"
                onClick={() => router.push('/login')}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted hover:text-surface-text transition-colors cursor-pointer"
            >
                <ArrowLeft size={14} />
                <span>Retour à la connexion</span>
            </button>
        </motion.div>
    );
}
