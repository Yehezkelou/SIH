export const ROUTES = {
  DASHBOARD: '/dashboard',
  PERSONNEL: '/personnel',
  PERSONNEL_DETAIL: (id: string) => `/personnel/${id}`,
  ROLES: '/roles',
  PATIENTS: '/patients',
  PATIENT_DETAIL: (id: string) => `/patients/${id}`,
  ADMISSIONS: '/admissions',
  URGENCES: '/urgences',
  STATISTIQUES: '/statistiques',
  PARAMETRES: '/parametres',
} as const;
