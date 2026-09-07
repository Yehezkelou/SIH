/**
 * Registre des routes du module Informatique.
 *
 * Source unique de vérité : aucune URL ne doit être écrite en dur ailleurs.
 * Les URL sont à plat — le groupe `(dashboard)` porte le layout partagé sans
 * ajouter de segment, et l'application est servie à sa racine (pas de basePath).
 */
export const ROUTES = {
  /** Racine : redirige vers la liste du personnel, elle n'apparaît pas dans la nav. */
  HOME: '/',

  PERSONNEL: '/personnel',
  PERSONNEL_LIST: '/personnel/list',
  PERSONNEL_ADD: '/personnel/add',
  PERSONNEL_DETAIL: (id: string) => `/personnel/${id}`,

  ROLES: '/roles',
  PERMISSIONS: '/permissions',

  PATIENTS: '/patients',

  PARAMETRES: '/parametres',
} as const;
