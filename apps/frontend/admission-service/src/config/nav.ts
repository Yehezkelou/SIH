import {
    BedDouble,
    ClipboardList,
    CopyCheck,
    FilePlus2,
    Plus,
    Siren,
    Users,
    type LucideIcon,
} from 'lucide-react';
import { ROUTES } from './routes';

export interface NavItem {
    label: string;
    /** Titre affiché dans la TopBar lorsque la route est active. */
    desc: string;
    icon: LucideIcon;
    path: string;
    children?: NavItem[];
}

/**
 * Navigation du module Patient (MPI).
 *
 * Le périmètre se limite à l'identité : création, recherche, régularisation
 * des dossiers provisoires et fusion des doublons. Admissions, urgences et
 * facturation relèvent des modules Hospitalisation et BAFS.
 */
export const NAV: NavItem[] = [
    {
        label: 'Dossiers patients',
        desc: 'Recherche et consultation des dossiers patients',
        icon: Users,
        path: ROUTES.PATIENTS,
        children: [
            {
                label: 'Rechercher',
                desc: 'Recherche dans l’index patient',
                icon: Users,
                path: ROUTES.PATIENTS,
            },
            {
                label: 'Nouveau dossier',
                desc: 'Création d’un dossier patient définitif',
                icon: FilePlus2,
                path: ROUTES.PATIENT_NEW,
            },
            {
                label: 'Dossier provisoire',
                desc: 'Ouverture d’un dossier provisoire en urgence',
                icon: Siren,
                path: ROUTES.PATIENT_PROVISOIRE,
            },
        ],
    },
    {
        label: 'Doublons',
        desc: 'Détection et fusion des dossiers en doublon',
        icon: CopyCheck,
        path: ROUTES.DOUBLONS,
    },
    {
        label: 'Admissions',
        desc: 'Gestion des admissions et séjours',
        icon: BedDouble,
        path: ROUTES.ADMISSIONS,
        children: [
            {
                label: 'Venues',
                desc: 'Recherche et suivi des admissions',
                icon: ClipboardList,
                path: ROUTES.ADMISSIONS,
            },
            {
                label: 'Nouvelle admission',
                desc: 'Admettre un patient',
                icon: Plus,
                path: ROUTES.ADMISSION_NEW,
            },
        ],
    },
];

/** Aplatit la navigation (parents + enfants) pour les recherches par chemin. */
const FLAT_NAV: NavItem[] = NAV.flatMap((item) => [item, ...(item.children ?? [])]);

/**
 * Titre de page dérivé du chemin courant. Retient la correspondance la plus
 * spécifique, pour que `/patients/nouveau` l'emporte sur `/patients`.
 */
export function titleFromPath(pathname: string): string {
    const match = FLAT_NAV.filter(
        (item) => pathname === item.path || pathname.startsWith(item.path + '/')
    ).sort((a, b) => b.path.length - a.path.length)[0];

    return match?.desc ?? 'Module Patient';
}

/** Section de premier niveau contenant le chemin courant, s'il y en a une. */
export function sectionFromPath(pathname: string): NavItem | undefined {
    return NAV.find(
        (item) =>
            item.children?.some(
                (child) => pathname === child.path || pathname.startsWith(child.path + '/')
            ) ?? false
    );
}
