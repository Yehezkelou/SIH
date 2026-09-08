// Contrat de données, types et constantes
export * from './schema';

// Clients d'API
export * from './api/api-patient';
export * from './api/api-dossier';

// Hooks TanStack Query
export * from './hooks/usePatients';

// Utilitaires
export * from './utils/parseApiError';
export * from './utils/patientHelpers';

// Composants
export * from './components/PatientStatusBadge';
export * from './components/PatientSearchView';
