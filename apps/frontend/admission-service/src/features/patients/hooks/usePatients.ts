import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    CreatePatient,
    CreatePatientProvisoire,
    DeleteDossier,
    DeletePatient,
    GetDossier,
    GetPatientById,
    GetPatientByUniqueId,
    MergePatients,
    RegularisePatient,
    ReplaceDossier,
    SearchPatients,
    UpdatePatient,
} from '../api/api-patient';
import {
    DeleteDossierInput,
    FindOnlyDossierInput,
    ReplaceDossierInput,
    SearchPatientParams,
} from '../schema';

const PATIENTS_KEY = 'Patients';
const PATIENT_KEY = 'Patient';
const DOSSIER_KEY = 'Dossier';

/** Recherche paginée. Un « aucun résultat » revient en liste vide, pas en erreur. */
export const useSearchPatients = (params: SearchPatientParams = {}) => {
    return useQuery({
        queryKey: [PATIENTS_KEY, params],
        queryFn: () => SearchPatients(params),
        staleTime: 60 * 1000,
        // La pagination garde l'ancienne page affichée pendant le chargement
        // de la suivante, au lieu de vider le tableau à chaque changement.
        placeholderData: (previous) => previous,
    });
};

/** Dossier unique par NDPU (identifiant métier). */
export const useGetPatient = (uniquePatientId: string) => {
    return useQuery({
        queryKey: [PATIENT_KEY, uniquePatientId],
        queryFn: () => GetPatientByUniqueId(uniquePatientId),
        enabled: Boolean(uniquePatientId),
        staleTime: 60 * 1000,
    });
};

/** Dossier unique par son identifiant technique UUID. */
export const useGetPatientById = (patientId: string) => {
    return useQuery({
        queryKey: [PATIENT_KEY, 'byId', patientId],
        queryFn: () => GetPatientById(patientId),
        enabled: Boolean(patientId),
        staleTime: 60 * 1000,
    });
};

/** Consultation d'un document ou d'une pièce d'archive. */
export const useGetDossier = (query: FindOnlyDossierInput) => {
    return useQuery({
        queryKey: [DOSSIER_KEY, query],
        queryFn: () => GetDossier(query),
        enabled: Boolean(query.dossierId || query.patientId),
        staleTime: 60 * 1000,
    });
};

/** Invalide les listes et, si connu, le dossier concerné. */
function useInvalidatePatients() {
    const queryClient = useQueryClient();
    return (uniquePatientId?: string, patientId?: string) => {
        queryClient.invalidateQueries({ queryKey: [PATIENTS_KEY] });
        if (uniquePatientId) {
            queryClient.invalidateQueries({ queryKey: [PATIENT_KEY, uniquePatientId] });
        }
        if (patientId) {
            queryClient.invalidateQueries({ queryKey: [PATIENT_KEY, 'byId', patientId] });
            queryClient.invalidateQueries({ queryKey: [DOSSIER_KEY] });
        }
    };
}

export const useCreatePatient = () => {
    const invalidate = useInvalidatePatients();
    return useMutation({
        mutationKey: ['create-patient'],
        mutationFn: CreatePatient,
        onSuccess: (response) => invalidate(response.data?.uniquePatientId, response.data?.id),
    });
};

export const useCreatePatientProvisoire = () => {
    const invalidate = useInvalidatePatients();
    return useMutation({
        mutationKey: ['create-patient-provisoire'],
        mutationFn: CreatePatientProvisoire,
        onSuccess: (response) => invalidate(response.data?.uniquePatientId, response.data?.id),
    });
};

export const useRegularisePatient = () => {
    const invalidate = useInvalidatePatients();
    return useMutation({
        mutationKey: ['regularise-patient'],
        mutationFn: RegularisePatient,
        onSuccess: (response) => invalidate(response.data?.uniquePatientId, response.data?.id),
    });
};

export const useUpdatePatient = () => {
    const invalidate = useInvalidatePatients();
    return useMutation({
        mutationKey: ['update-patient'],
        mutationFn: UpdatePatient,
        onSuccess: (response) => invalidate(response.data?.uniquePatientId, response.data?.id),
    });
};

export const useDeletePatient = () => {
    const invalidate = useInvalidatePatients();
    return useMutation({
        mutationKey: ['delete-patient'],
        mutationFn: DeletePatient,
        onSuccess: () => invalidate(),
    });
};

/** Fusion de doublons : les deux dossiers changent, on invalide tout. */
export const useMergePatients = () => {
    const invalidate = useInvalidatePatients();
    return useMutation({
        mutationKey: ['merge-patients'],
        mutationFn: MergePatients,
        onSuccess: () => invalidate(),
    });
};

/** Remplacement ou mise à jour de document archivé. */
export const useReplaceDossier = () => {
    const invalidate = useInvalidatePatients();
    return useMutation({
        mutationKey: ['replace-dossier'],
        mutationFn: ({ payload, file }: { payload: ReplaceDossierInput; file?: File }) =>
            ReplaceDossier(payload, file),
        onSuccess: () => invalidate(),
    });
};

/** Suppression douce d'une pièce justificative archivée. */
export const useDeleteDossier = () => {
    const invalidate = useInvalidatePatients();
    return useMutation({
        mutationKey: ['delete-dossier'],
        mutationFn: (payload: DeleteDossierInput) => DeleteDossier(payload),
        onSuccess: () => invalidate(),
    });
};
