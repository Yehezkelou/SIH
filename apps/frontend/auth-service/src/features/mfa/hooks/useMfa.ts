'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authStorage } from "@/lib/auth";
import { DisableMfa, EnableMfa, SetupMfa, VerifyMfa } from "../api/api-mfa";
import { DisableMfaInput, EnableMfaInput, VerifyMfaInput } from "../schema";

/**
 * 1. Validation TOTP lors du flux de connexion (Étape 2).
 * En cas de succès, stocke les tokens et redirige vers l'accueil.
 */
export function useVerifyMfa() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['verify-mfa'],
        mutationFn: (payload: VerifyMfaInput) => VerifyMfa(payload),
        onSuccess: (data) => {
            authStorage.setSession(data.accessToken, data.refreshToken);
            if (typeof window !== "undefined") {
                sessionStorage.removeItem("sih_mfa_token");
            }
            queryClient.invalidateQueries({ queryKey: ['me'] });
            window.location.href = "/";
        },
    });
}

/**
 * 2. Initialisation du secret TOTP pour configuration (génération de clé & QR Code).
 */
export function useSetupMfa() {
    return useMutation({
        mutationKey: ['setup-mfa'],
        mutationFn: SetupMfa,
    });
}

/**
 * 3. Activation définitive du MFA après saisie du premier code de vérification.
 */
export function useEnableMfa() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['enable-mfa'],
        mutationFn: (payload: EnableMfaInput) => EnableMfa(payload),
        onSuccess: () => {
            // Mise à jour instantanée du cache en temps réel pour tous les composants
            queryClient.setQueryData(['me'], (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    user: {
                        ...(oldData.user || {}),
                        mfaEnabled: true,
                    },
                };
            });
            queryClient.invalidateQueries({ queryKey: ['me'] });
        },
    });
}

/**
 * 4. Désactivation du MFA avec confirmation par mot de passe et code.
 */
export function useDisableMfa() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['disable-mfa'],
        mutationFn: (payload: DisableMfaInput) => DisableMfa(payload),
        onSuccess: () => {
            // Mise à jour instantanée du cache en temps réel pour tous les composants
            queryClient.setQueryData(['me'], (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    user: {
                        ...(oldData.user || {}),
                        mfaEnabled: false,
                    },
                };
            });
            queryClient.invalidateQueries({ queryKey: ['me'] });
        },
    });
}