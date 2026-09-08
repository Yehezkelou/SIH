
export type Genre = 'M' | 'F';

export type StatusDossier = 'PROVISOIRE' | 'DEFINITIF';

/** Raison pour laquelle un dossier a été ouvert sans identité complète. */
export type MotifDossierProvisoire =
    | 'URGENCE_VITAL'
    | 'PATIENT_INCONSCIENT'
    | 'IDENTITE_INCONNUE'
    | 'MINEUR_NON_ACCOMPAGNE'
    | 'PANNE_SYSTEME'
    | 'AUTRE';

export const MOTIFS_DOSSIER_PROVISOIRE: { value: MotifDossierProvisoire; label: string }[] = [
    { value: 'URGENCE_VITAL', label: 'Urgence vitale' },
    { value: 'PATIENT_INCONSCIENT', label: 'Patient inconscient' },
    { value: 'IDENTITE_INCONNUE', label: 'Identité inconnue' },
    { value: 'MINEUR_NON_ACCOMPAGNE', label: 'Mineur non accompagné' },
    { value: 'PANNE_SYSTEME', label: 'Panne système' },
    { value: 'AUTRE', label: 'Autre motif' },
];

export type MotifFusion =
    | 'DOUBLON_REGULARISATION'
    | 'DOUBLON_DETECTE_SIMILARITE'
    | 'DOUBLON_MANUEL';

export type TypeDocument = 'CNI' | 'PASSPORT' | 'ATTESTATION' | 'ACTE_NAISSANCE' | 'AUTRE';

export const TYPES_DOCUMENT: { value: TypeDocument; label: string }[] = [
    { value: 'CNI', label: "Carte Nationale d'Identité" },
    { value: 'PASSPORT', label: 'Passeport' },
    { value: 'ATTESTATION', label: 'Attestation' },
    { value: 'ACTE_NAISSANCE', label: 'Acte de naissance' },
    { value: 'AUTRE', label: 'Autre document' },
];

/** Pièce archivée rattachée au dossier patient. */
export interface ArchivDossier {
    id: string;
    dossierId?: string;
    typeDoc?: TypeDocument | string;
    name?: string;
    taille?: string;
    extension?: string;
    date?: string;
    url?: string;
    description?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface Patient {
    id: string;
    /** NDPU : identifiant métier montré aux utilisateurs. */
    uniquePatientId: string;
    /** Renseigné lorsque ce dossier a été absorbé par une fusion. */
    mergeIntoPatientId?: string | null;

    // Identité civile
    nom: string;
    prenom: string;
    age: number;
    genre: Genre;
    dateNaissance?: string | null;
    lieuNaissance?: string | null;

    // Filiation
    nomPere?: string | null;
    nomMere?: string | null;
    tuteur?: string | null;
    numeroPere?: string | null;
    numeroMere?: string | null;
    numeroTuteur?: string | null;

    // Contact
    email?: string | null;
    numero?: string | null;
    numeroSecondaire?: string | null;
    contactUrgence?: string | null;

    // Identifiants uniques
    numSecuSocial?: string | null;
    numIdentityNational?: string | null;
    numeroPassport?: string | null;
    numCMU?: string | null;

    // Cycle de vie du dossier
    statusDossier: StatusDossier;
    motifDossierProvisoire?: MotifDossierProvisoire | null;
    serviceCreation?: string | null;
    signalement?: string | null;
    dateLimiteRegulation?: string | null;
    regularisAt?: string | null;
    regularisBy?: string | null;

    archivDossier?: ArchivDossier[];

    createdAt: string;
    updatedAt: string;
    createdBy?: string | null;
    updatedBy?: string | null;
    deletedAt?: string | null;
    deletedBy?: string | null;
}

// ===== Entrées =====
export interface PatientIdentityInput {
    nom: string;
    prenom: string;
    age: number;
    genre: Genre;
    dateNaissance: string;
    lieuNaissance?: string;
}

export interface PatientContactInput {
    email?: string;
    numero?: string;
    numeroSecondaire?: string;
    /**
     * Orthographe volontaire : `CreatePatientSchema` déclare `conctactUrgence`
     * (coquille côté serveur) et le repository lit exactement cette clé.
     * Envoyer `contactUrgence` perdrait la valeur en silence. Le schéma du
     * dossier provisoire, lui, l'orthographie correctement.
     */
    conctactUrgence?: string;
}

export interface PatientUniqueIdentityInput {
    numSecuSocial?: string;
    numIdentityNational?: string;
    numeroPassport?: string;
    /** Le schéma d'entrée attend `numeroCMU` ; la colonne s'appelle `numCMU`. */
    numeroCMU?: string;
}

export interface PatientFamilleInput {
    nomPere?: string;
    nomMere?: string;
    tuteur?: string;
    numeroPere?: string;
    numeroMere?: string;
    numeroTuteur?: string;
}

/**
 * Le service attend un objet groupé (identity / contact / uniqueIdentity /
 * famille) et non un objet plat — cf. `CreatePatientSchema`.
 */
export interface CreatePatientInput {
    identity: PatientIdentityInput;
    contact: PatientContactInput;
    uniqueIdentity: PatientUniqueIdentityInput;
    famille: PatientFamilleInput;
    /** Le repository lit `data.CreatedBy.createdBy` : c'est bien un objet. */
    CreatedBy: { createdBy?: string };
}

/** Contact du dossier provisoire — clé correctement orthographiée ici. */
export interface PatientProvisoireContactInput {
    email?: string;
    numero?: string;
    contactUrgence?: string;
}

/**
 * `POST /api/patient/provisoir`. Le motif, le service d'origine et le
 * signalement sont regroupés sous `urgence` (et la clé est `motifProvisoir`,
 * pas `motifDossierProvisoire` comme en base). `createdBy` est exigé à la
 * racine, et non dans un objet comme pour la création définitive.
 */
export interface CreatePatientProvisoirInput {
    identity: {
        nom?: string;
        prenom?: string;
        age?: number;
        genre?: Genre;
        dateNaissance?: string;
        lieuNaissance?: string;
    };
    urgence: {
        motifProvisoir?: MotifDossierProvisoire;
        serviceCreation?: string;
        signalement?: string;
    };
    contact?: PatientProvisoireContactInput;
    numeroDossier?: string;
    createdBy: string;
}

export interface UpdatePatientInput {
    patientId: string;
    numeroDossier: string;
    updatedBy: string;
    identity?: Partial<PatientIdentityInput>;
    contact?: PatientContactInput;
    uniqueIdentity?: PatientUniqueIdentityInput;
    famille?: PatientFamilleInput;
}

/** La régularisation exige les blocs complets, contrairement à la mise à jour. */
export interface RegularizationPatientInput extends UpdatePatientInput {
    identity: PatientIdentityInput;
    contact: PatientContactInput;
    uniqueIdentity: PatientUniqueIdentityInput;
}

export interface FindOnePatientInput {
    patientId: string;
    numeroDossier: string;
}

export interface SoftDeletePatientInput extends FindOnePatientInput {
    deletedBy: string;
}

export interface CreatePatientPayload {
    patient: CreatePatientInput;
    dossier?: Partial<CreateArchivDossierInput>;
    files?: File[];
}

export interface CreateArchivDossierInput {
    patientId?: string;
    createdBy?: string;
    typeDoc?: TypeDocument;
    name?: string;
    taille?: string;
    extension?: string;
    date?: string;
    url?: string;
    description?: string;
}

export interface ReplaceDossierInput {
    dossierId: string;
    updatedBy?: string;
    typeDoc?: TypeDocument;
    name?: string;
    taille?: string;
    extension?: string;
    date?: string;
    url?: string;
    description?: string;
}

export interface FindOnlyDossierInput {
    dossierId?: string;
    patientId?: string;
    typeDoc?: TypeDocument;
}

export interface DeleteDossierInput {
    dossierId?: string;
    patientId?: string;
    deletedBy?: string;
}

/**
 * Arbitrage champ par champ de la fusion.
 *
 * Chaque bloc est facultatif, mais s'il est fourni le serveur en lit tous les
 * champs : `identity` sans `dateNaissance` faisait planter la fusion avant
 * correction, et un bloc partiel écrase quand même par la valeur retenue.
 * Le formulaire envoie donc des blocs complets ou rien.
 */
export interface MergeFieldsToKeep {
    identity?: PatientIdentityInput;
    famille?: PatientFamilleInput;
    contact?: PatientContactInput;
    uniqueIdentity?: PatientUniqueIdentityInput;
}

/**
 * `POST /api/patient/fusion`.
 *
 * La **cible** survit et absorbe la source ; la source est marquée
 * `mergeIntoPatientId` puis archivée en suppression douce. Les deux
 * identifiants doivent différer, et aucun des deux ne doit avoir déjà été
 * fusionné.
 */
export interface MergePatientInput {
    sourcePatientId: string;
    targetPatientId: string;
    mergeBy?: string;
    motifFusion: MotifFusion;
    ChampsAConserver?: MergeFieldsToKeep;
}

export type { ParsedApiError } from './utils/parseApiError';

/** Critères de `GET /patient/search` — le seul endpoint de lecture filtrable. */
export interface SearchPatientParams {
    nom?: string;
    prenom?: string;
    age?: number;
    genre?: Genre;
    dateNaissance?: string;

    nomPere?: string;
    nomMere?: string;
    tuteur?: string;
    numeroPere?: string;
    numeroMere?: string;
    numeroTuteur?: string;

    email?: string;
    numero?: string;

    numSecuSocial?: string;
    numIdentityNational?: string;
    numeroPassport?: string;
    numCMU?: string;
    uniquePatientId?: string;

    /** Attention : le backend attend `PROVISOIR`, sans le E final. */
    statusDossier?: 'DEFINITIF' | 'PROVISOIR';

    page?: number;
    limit?: number;
    sort?: 'asc' | 'desc';
}

// ===== Réponses =====

/** Enveloppe commune à toutes les réponses du service. */
export interface PatientEnvelope<T> {
    message: string;
    data: T;
    timestamp: string;
}

/**
 * Charge utile des lectures de liste.
 *
 * `exactMatch` vaut `true` quand la recherche a porté sur un identifiant unique
 * (NDPU, n° de sécurité sociale, passeport…) : le service court-circuite alors
 * la recherche floue et renvoie exactement un dossier.
 */
export interface PatientSearchResult {
    total: number;
    exactMatch?: boolean;
    patients: Patient[];
}

export type ResponsePatient = PatientEnvelope<Patient>;
export type ResponsePatientSearch = PatientEnvelope<PatientSearchResult>;

/** Résultat normalisé côté client : un « aucun résultat » n'est pas une erreur. */
export interface PatientSearchOutcome extends PatientSearchResult {
    page: number;
    limit: number;
    totalPages: number;
}
