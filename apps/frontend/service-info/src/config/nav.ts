import {
  List,
  Plus,
  Settings,
  User,
  UserKey,
  Users,
  UserShield,
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

export const NAV: NavItem[] = [
  {
    label: 'Personnel',
    desc: 'Gestion des agents et du personnel',
    icon: User,
    path: ROUTES.PERSONNEL,
    children: [
      {
        label: 'Listes',
        desc: 'Liste de tous les agents',
        icon: List,
        path: ROUTES.PERSONNEL_LIST,
      },
      {
        label: 'Ajouter un agent',
        desc: 'Ajouter un nouvel agent',
        icon: Plus,
        path: ROUTES.PERSONNEL_ADD,
      },
      {
        label: 'Role',
        desc: 'Gestion des rôles',
        icon: UserShield,
        path: ROUTES.ROLES,
      },
      {
        label: 'Permission',
        desc: 'Gestion des permissions',
        icon: UserKey,
        path: ROUTES.PERMISSIONS,
      },
    ],
  },
  {
    label: 'Patient',
    desc: 'Gestion des patients',
    icon: Users,
    path: ROUTES.PATIENTS,
  },
  {
    label: 'Paramètres',
    desc: 'Paramètres du module',
    icon: Settings,
    path: ROUTES.PARAMETRES,
  },
];

/** Aplatit la navigation (parents + enfants) pour les recherches par chemin. */
const FLAT_NAV: NavItem[] = NAV.flatMap((item) => [item, ...(item.children ?? [])]);

/**
 * Titre de page dérivé du chemin courant. Retient la correspondance la plus
 * spécifique, pour que `/personnel/list` l'emporte sur `/personnel`.
 */
export function titleFromPath(pathname: string): string {
  const match = FLAT_NAV.filter(
    (item) => pathname === item.path || pathname.startsWith(item.path + '/')
  ).sort((a, b) => b.path.length - a.path.length)[0];

  return match?.desc ?? 'Module Informatique';
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
