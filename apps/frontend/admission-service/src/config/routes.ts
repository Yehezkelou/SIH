
export const ROUTES = {
    /** Racine : redirige vers la recherche de dossiers. */
    HOME: '/',

    PATIENTS: '/patients',
    PATIENT_DETAIL: (uniquePatientId: string) => `/patients/${uniquePatientId}`,
    PATIENT_NEW: '/patients/nouveau',
    PATIENT_PROVISOIRE: '/patients/provisoire',

    DOUBLONS: '/doublons',

    ADMISSIONS: '/admissions',
    ADMISSION_NEW: '/admissions/nouveau',
    // Le détail exige le numéro d'admission : on le transporte en query.
    ADMISSION_DETAIL: (id: string, admissionNumber?: string) =>
        admissionNumber
            ? `/admissions/${id}?n=${encodeURIComponent(admissionNumber)}`
            : `/admissions/${id}`,
} as const;
