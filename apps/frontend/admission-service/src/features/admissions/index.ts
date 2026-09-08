// Contrat de données et types
export * from './schema';

// Clients d'API
export * from './api/api-admission';
export * from './api/api-companions';
export * from './api/api-payers';
export * from './api/api-documents';
export * from './api/api-movements';

// Hooks TanStack Query
export * from './hooks/useAdmissions';

// Utilitaires
export * from './utils/admissionHelpers';
export * from './utils/parseApiError';

// Composants
export * from './components/AdmissionStatusBadge';
export * from './components/AdmissionSearchView';
export * from './components/AdmissionDetailView';
export * from './components/AdmissionForm';
export * from './components/AdmissionActions';
