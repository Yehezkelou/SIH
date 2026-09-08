import { MOTIFS_DOSSIER_PROVISOIRE, MotifDossierProvisoire, Patient } from '../schema';


export const PATIENT_PERMISSIONS = {
    READ: 'patient:READ',
    CREATE: 'patient:CREATE',
    UPDATE: 'patient:UPDATE',
    DELETE: 'patient:DELETE',
    EXPORT: 'patient:EXPORT',
} as const;

export function formatMotifProvisoire(motif?: MotifDossierProvisoire | null): string {
    if (!motif) return '—';
    return MOTIFS_DOSSIER_PROVISOIRE.find((m) => m.value === motif)?.label ?? motif;
}

export function fullName(patient: Patient): string {
    return `${patient.nom?.toUpperCase() ?? ''} ${patient.prenom ?? ''}`.trim();
}

export function initials(patient: Patient): string {
    return `${patient.nom?.[0] ?? ''}${patient.prenom?.[0] ?? ''}`.toUpperCase() || 'PA';
}

export function formatDate(value?: string | null, fallback = 'Non renseignée'): string {
    if (!value) return fallback;
    try {
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(new Date(value));
    } catch {
        return 'Date invalide';
    }
}

export function formatDateTime(value?: string | null, fallback = '—'): string {
    if (!value) return fallback;
    try {
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(value));
    } catch {
        return 'Date invalide';
    }
}

/**
 * Un dossier provisoire doit être régularisé avant `dateLimiteRegulation`.
 * Renvoie le nombre d'heures restantes, négatif si le délai est dépassé.
 */
export function hoursUntilRegularisation(patient: Patient): number | null {
    if (patient.statusDossier !== 'PROVISOIRE' || !patient.dateLimiteRegulation) return null;
    const deadline = new Date(patient.dateLimiteRegulation).getTime();
    if (Number.isNaN(deadline)) return null;
    return Math.round((deadline - Date.now()) / (1000 * 60 * 60));
}
