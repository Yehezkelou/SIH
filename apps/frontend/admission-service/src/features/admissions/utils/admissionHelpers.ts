import {
    Admission,
    AdmissionDocumentType,
    AdmissionPayerType,
    AdmissionStatus,
    AdmissionType,
    EncounterStatus,
    MovementType,
    Relationship,
} from '../schema';

export const ADMISSION_PERMISSIONS = {
    READ: 'admission:READ',
    CREATE: 'admission:CREATE',
    UPDATE: 'admission:UPDATE',
    DELETE: 'admission:DELETE',
} as const;

export type StatusTone = 'success' | 'info' | 'warning' | 'danger' | 'neutral';

interface Labelled<T extends string> {
    value: T;
    label: string;
    tone?: StatusTone;
}

export const ADMISSION_STATUS: Labelled<AdmissionStatus>[] = [
    { value: 'PENDING', label: 'En cours', tone: 'neutral' },
    { value: 'PRE_ADMITTED', label: 'Pré-admis', tone: 'info' },
    { value: 'REGISTERED', label: 'Enregistré', tone: 'info' },
    { value: 'ADMITTED', label: 'Admis', tone: 'success' },
    { value: 'DISCHARGED_PENDING', label: 'Sortie validée', tone: 'warning' },
    { value: 'DISCHARGED', label: 'Sorti', tone: 'neutral' },
    { value: 'TRANSFERED', label: 'Transféré', tone: 'info' },
    { value: 'CANCELLED', label: 'Annulé', tone: 'danger' },
    { value: 'CLOSED', label: 'Clôturé', tone: 'neutral' },
];

export const ADMISSION_TYPE: Labelled<AdmissionType>[] = [
    { value: 'INPATIENT', label: 'Hospitalisation' },
    { value: 'OUTPATIENT', label: 'Consultation externe' },
    { value: 'EMERGENCY', label: 'Urgence' },
];

export const PAYER_TYPE: Labelled<AdmissionPayerType>[] = [
    { value: 'PATIENT', label: 'Patient (auto-payeur)' },
    { value: 'INSURANCE', label: 'Assurance' },
    { value: 'COMPANY', label: 'Entreprise' },
];

export const DOCUMENT_TYPE: Labelled<AdmissionDocumentType>[] = [
    { value: 'PIECE_IDENTIE', label: "Pièce d'identité" },
    { value: 'CARTE_ASSURANCE', label: "Carte d'assurance" },
    { value: 'ORDONNANCE', label: 'Ordonnance' },
    { value: 'AUTRE', label: 'Autre document' },
];

export const RELATIONSHIP: Labelled<Relationship>[] = [
    { value: 'FATHER', label: 'Père' },
    { value: 'MOTHER', label: 'Mère' },
    { value: 'SON', label: 'Fils' },
    { value: 'DAUTHER', label: 'Fille' },
    { value: 'HUSBAND', label: 'Époux' },
    { value: 'WIFE', label: 'Épouse' },
    { value: 'BROTHER', label: 'Frère' },
    { value: 'SISTER', label: 'Sœur' },
    { value: 'OTHER', label: 'Autre' },
];

export const MOVEMENT_TYPE: Labelled<MovementType>[] = [
    { value: 'ADMISSION', label: 'Admission' },
    { value: 'TRANSFER', label: 'Transfert' },
    { value: 'DISCHARGE', label: 'Sortie' },
];

export const ENCOUNTER_STATUS: Labelled<EncounterStatus>[] = [
    { value: 'ENCOUNTER_PENDING', label: 'En attente' },
    { value: 'ENCOUNTER_REGISTERED', label: 'Enregistré' },
    { value: 'ENCOUNTER_PRE_ADMITTED', label: 'Pré-admis' },
    { value: 'ENCOUNTER_ADMITTED', label: 'Admis (lit occupé)' },
    { value: 'ENCOUNTER_TRANSFERED', label: 'Transféré' },
    { value: 'ENCOUNTER_DISCHARGED_PENDING', label: 'Sortie validée' },
    { value: 'ENCOUNTER_DISCHARGED', label: 'Sorti' },
    { value: 'ENCOUNTER_CLOSED', label: 'Clôturé' },
    { value: 'ENCOUNTER_CANCELLED', label: 'Annulé' },
];

function makeLookup<T extends string>(list: Labelled<T>[]) {
    const map = new Map(list.map((i) => [i.value, i]));
    return (value?: T | string | null) =>
        (value && map.get(value as T)) || undefined;
}

const statusLookup = makeLookup(ADMISSION_STATUS);
const typeLookup = makeLookup(ADMISSION_TYPE);
const payerLookup = makeLookup(PAYER_TYPE);
const docLookup = makeLookup(DOCUMENT_TYPE);
const relationLookup = makeLookup(RELATIONSHIP);
const movementLookup = makeLookup(MOVEMENT_TYPE);

export const statusLabel = (v?: string | null) => statusLookup(v)?.label ?? v ?? '—';
export const statusTone = (v?: string | null): StatusTone => statusLookup(v)?.tone ?? 'neutral';
export const typeLabel = (v?: string | null) => typeLookup(v)?.label ?? v ?? '—';
export const payerTypeLabel = (v?: string | null) => payerLookup(v)?.label ?? v ?? '—';
export const documentTypeLabel = (v?: string | null) => docLookup(v)?.label ?? v ?? '—';
export const relationshipLabel = (v?: string | null) => relationLookup(v)?.label ?? v ?? '—';
export const movementTypeLabel = (v?: string | null) => movementLookup(v)?.label ?? v ?? '—';

// Transitions de statut autorisées côté interface (miroir de la logique métier).
const NEXT_STATUSES: Record<AdmissionStatus, AdmissionStatus[]> = {
    PENDING: ['PRE_ADMITTED', 'REGISTERED', 'ADMITTED', 'CANCELLED'],
    PRE_ADMITTED: ['REGISTERED', 'ADMITTED', 'CANCELLED'],
    REGISTERED: ['ADMITTED', 'CANCELLED'],
    ADMITTED: ['TRANSFERED', 'DISCHARGED_PENDING', 'DISCHARGED'],
    DISCHARGED_PENDING: ['DISCHARGED'],
    TRANSFERED: ['ADMITTED', 'DISCHARGED_PENDING', 'DISCHARGED'],
    DISCHARGED: ['CLOSED'],
    CANCELLED: [],
    CLOSED: [],
};

export function allowedNextStatuses(current?: AdmissionStatus): AdmissionStatus[] {
    return current ? NEXT_STATUSES[current] ?? [] : [];
}

const CLOSED_STATUSES: AdmissionStatus[] = ['DISCHARGED', 'CANCELLED', 'CLOSED'];
export const isClosed = (a?: Pick<Admission, 'admissionStatus'>) =>
    !!a && CLOSED_STATUSES.includes(a.admissionStatus);
export const isActive = (a?: Pick<Admission, 'admissionStatus'>) =>
    !!a && !CLOSED_STATUSES.includes(a.admissionStatus);
export const canDischarge = (a?: Pick<Admission, 'admissionStatus'>) =>
    !!a && ['ADMITTED', 'TRANSFERED', 'DISCHARGED_PENDING'].includes(a.admissionStatus);

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

// <input type="datetime-local"> -> ISO ; renvoie undefined si vide.
export function toIso(value?: string): string | undefined {
    if (!value) return undefined;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

export function formatSize(bytes?: number): string {
    if (!bytes || bytes <= 0) return '—';
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}
