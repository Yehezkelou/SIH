import { ROUTES } from './routes';
import type { IconName } from '@/components/layout/icons';

export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
  /** Permission requise pour afficher l'entrée (RBAC côté UI). */
  permission?: string;
}

/** Entrées principales de la sidebar. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Vue d'ensemble", href: ROUTES.DASHBOARD, icon: 'dashboard' },
  { label: 'Personnel', href: ROUTES.PERSONNEL, icon: 'users', permission: 'personnel:read' },
  { label: 'Patients', href: ROUTES.PATIENTS, icon: 'patient', permission: 'patient:read' },
  { label: 'Admissions', href: ROUTES.ADMISSIONS, icon: 'admission', permission: 'admission:read' },
  { label: 'Urgences', href: ROUTES.URGENCES, icon: 'urgency', permission: 'urgency:read' },
  { label: 'Statistiques', href: ROUTES.STATISTIQUES, icon: 'stats' },
  { label: 'Rôles & permissions', href: ROUTES.ROLES, icon: 'shield', permission: 'role:manage' },
];

/** Entrée(s) bas de sidebar. */
export const NAV_FOOTER: NavItem[] = [
  { label: 'Paramètres', href: ROUTES.PARAMETRES, icon: 'settings' },
];

/** Titre de page dérivé du chemin courant (pour la topbar). */
export function titleFromPath(pathname: string): string {
  const all = [...NAV_ITEMS, ...NAV_FOOTER];
  const match = all
    .filter((i) => pathname === i.href || pathname.startsWith(i.href + '/'))
    .sort((a, b) => b.href.length - a.href.length)[0];
  return match?.label ?? 'Panel Admin';
}
