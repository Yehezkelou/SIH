import { Patient } from '../schema';

/**
 * Rapprochement de dossiers patients.
 *
 * Le service déclare bien une table `patient_similarity_alert` (score, niveau,
 * champs concordants, statut de revue) mais **aucun endpoint ne l'expose** :
 * la détection est donc faite ici, sur les résultats de recherche rapportés au
 * navigateur. C'est un filet, pas un balayage exhaustif de l'index.
 */

export type NiveauSimilarite = 'FORTE' | 'MODEREE';

/** Champs qui identifient formellement une personne. */
const CHAMPS_UNIQUES = [
    'numIdentityNational',
    'numSecuSocial',
    'numeroPassport',
    'numCMU',
] as const;

export interface ChampCompare {
    key: string;
    label: string;
    /** Bloc de `ChampsAConserver` auquel le champ appartient. */
    group: 'identity' | 'famille' | 'contact' | 'uniqueIdentity';
    valueA?: string | number | null;
    valueB?: string | number | null;
    identical: boolean;
    /** Une seule des deux fiches renseigne ce champ : la fusion l'enrichit. */
    complementary: boolean;
}

export interface DuplicatePair {
    id: string;
    a: Patient;
    b: Patient;
    score: number;
    niveau: NiveauSimilarite;
    matchedFields: string[];
    /** Champs renseignés d'un seul côté : bénéfice net de la fusion. */
    complementaryCount: number;
}

const CHAMPS: { key: keyof Patient; label: string; group: ChampCompare['group'] }[] = [
    { key: 'nom', label: 'Nom', group: 'identity' },
    { key: 'prenom', label: 'Prénom', group: 'identity' },
    { key: 'dateNaissance', label: 'Date de naissance', group: 'identity' },
    { key: 'age', label: 'Âge', group: 'identity' },
    { key: 'genre', label: 'Genre', group: 'identity' },
    { key: 'lieuNaissance', label: 'Lieu de naissance', group: 'identity' },
    { key: 'nomPere', label: 'Nom du père', group: 'famille' },
    { key: 'nomMere', label: 'Nom de la mère', group: 'famille' },
    { key: 'tuteur', label: 'Tuteur', group: 'famille' },
    { key: 'numeroPere', label: 'Tél. du père', group: 'famille' },
    { key: 'numeroMere', label: 'Tél. de la mère', group: 'famille' },
    { key: 'numeroTuteur', label: 'Tél. du tuteur', group: 'famille' },
    { key: 'email', label: 'Email', group: 'contact' },
    { key: 'numero', label: 'Téléphone', group: 'contact' },
    { key: 'numeroSecondaire', label: 'Tél. secondaire', group: 'contact' },
    { key: 'contactUrgence', label: 'Contact d’urgence', group: 'contact' },
    { key: 'numSecuSocial', label: 'N° sécurité sociale', group: 'uniqueIdentity' },
    { key: 'numIdentityNational', label: 'N° identité nationale', group: 'uniqueIdentity' },
    { key: 'numeroPassport', label: 'N° passeport', group: 'uniqueIdentity' },
    { key: 'numCMU', label: 'N° CMU', group: 'uniqueIdentity' },
];

function normalise(value: unknown): string {
    if (value == null) return '';
    return String(value)
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .trim()
        .toLowerCase();
}

function sameDate(a?: string | null, b?: string | null): boolean {
    if (!a || !b) return false;
    const da = new Date(a).toDateString();
    const db = new Date(b).toDateString();
    return da !== 'Invalid Date' && da === db;
}

/** Comparaison détaillée, champ par champ, de deux dossiers. */
export function comparePatients(a: Patient, b: Patient): ChampCompare[] {
    return CHAMPS.map(({ key, label, group }) => {
        const valueA = a[key] as string | number | null | undefined;
        const valueB = b[key] as string | number | null | undefined;

        const identical =
            key === 'dateNaissance'
                ? sameDate(valueA as string, valueB as string)
                : Boolean(normalise(valueA)) && normalise(valueA) === normalise(valueB);

        const filledA = Boolean(normalise(valueA));
        const filledB = Boolean(normalise(valueB));

        return {
            key: String(key),
            label,
            group,
            valueA,
            valueB,
            identical,
            complementary: filledA !== filledB,
        };
    });
}

/**
 * Score de ressemblance entre deux dossiers.
 *
 * Ce n'est pas une probabilité, mais un ordre de tri assumé : un identifiant
 * unique commun vaut à lui seul une certitude ; nom + prénom + date de
 * naissance constituent une présomption forte ; le reste appuie sans trancher.
 */
export function scorePair(a: Patient, b: Patient): { score: number; matchedFields: string[] } {
    const matchedFields: string[] = [];
    let score = 0;

    for (const field of CHAMPS_UNIQUES) {
        if (normalise(a[field]) && normalise(a[field]) === normalise(b[field])) {
            matchedFields.push(field);
            score += 100;
        }
    }

    if (normalise(a.nom) && normalise(a.nom) === normalise(b.nom)) {
        matchedFields.push('nom');
        score += 25;
    }
    if (normalise(a.prenom) && normalise(a.prenom) === normalise(b.prenom)) {
        matchedFields.push('prenom');
        score += 20;
    }
    if (sameDate(a.dateNaissance, b.dateNaissance)) {
        matchedFields.push('dateNaissance');
        score += 30;
    }
    if (normalise(a.numero) && normalise(a.numero) === normalise(b.numero)) {
        matchedFields.push('numero');
        score += 15;
    }
    if (normalise(a.email) && normalise(a.email) === normalise(b.email)) {
        matchedFields.push('email');
        score += 15;
    }
    if (normalise(a.nomMere) && normalise(a.nomMere) === normalise(b.nomMere)) {
        matchedFields.push('nomMere');
        score += 10;
    }

    return { score: Math.min(100, score), matchedFields };
}

/**
 * Construit les paires suspectes à partir d'un lot de dossiers.
 *
 * Les dossiers déjà absorbés par une fusion (`mergeIntoPatientId`) sont exclus :
 * les reproposer ferait boucler l'opérateur sur un doublon déjà traité.
 */
export function buildDuplicatePairs(patients: Patient[], seuil = 45): DuplicatePair[] {
    const actifs = patients.filter((p) => !p.mergeIntoPatientId && !p.deletedAt);
    const pairs: DuplicatePair[] = [];

    for (let i = 0; i < actifs.length; i++) {
        for (let j = i + 1; j < actifs.length; j++) {
            const a = actifs[i];
            const b = actifs[j];
            const { score, matchedFields } = scorePair(a, b);
            if (score < seuil) continue;

            const complementaryCount = comparePatients(a, b).filter((c) => c.complementary).length;

            pairs.push({
                id: `${a.id}|${b.id}`,
                a,
                b,
                score,
                niveau: score >= 70 ? 'FORTE' : 'MODEREE',
                matchedFields,
                complementaryCount,
            });
        }
    }

    return pairs.sort((x, y) => y.score - x.score);
}

export const CHAMP_LABELS: Record<string, string> = Object.fromEntries(
    CHAMPS.map(({ key, label }) => [String(key), label])
);
