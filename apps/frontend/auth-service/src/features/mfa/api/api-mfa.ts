import { apiClient } from "@/lib/api-client";
import { 
    type DisableMfaInput, 
    type EnableMfaInput, 
    type ResponseSetupMfa, 
    type ResponseVerifyMfa, 
    type VerifyMfaInput 
} from "../schema";

const BASE = "/api/auth/mfa";

// 1. Initialisation du secret TOTP (génère la clé et l'otpauth://)
export async function SetupMfa(): Promise<ResponseSetupMfa> {
    const response = await apiClient.post<ResponseSetupMfa>(`${BASE}/setup`);
    return response.data;
}

// 2. Activation définitive du MFA après saisie du 1er code
export async function EnableMfa(payload: EnableMfaInput): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(`${BASE}/enable`, payload);
    return response.data;
}

// 3. Validation TOTP lors du flux de login (Étape 2)
export async function VerifyMfa(payload: VerifyMfaInput): Promise<ResponseVerifyMfa> {
    const response = await apiClient.post<ResponseVerifyMfa>(`${BASE}/verify`, payload);
    return response.data;
}

// 4. Désactivation du MFA avec confirmation par mot de passe
export async function DisableMfa(payload: DisableMfaInput): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(`${BASE}/disable`, payload);
    return response.data;
}



