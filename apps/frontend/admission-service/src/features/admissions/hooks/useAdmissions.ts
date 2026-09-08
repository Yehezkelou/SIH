import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    CancelAdmission,
    CreateAdmission,
    DischargePatient,
    GetActiveAdmissionByPatient,
    GetAdmissionById,
    SearchAdmissions,
    SoftDeleteAdmission,
    UpdateAdmissionStatus,
} from '../api/api-admission';
import { AddCompanion, ListCompanions, RemoveCompanion, UpdateCompanion } from '../api/api-companions';
import { AddPayer, ListPayers, RemovePayer, UpdatePayer } from '../api/api-payers';
import { AddDocument, ListDocuments, RemoveDocument } from '../api/api-documents';
import { CreateMovement, ListMovements } from '../api/api-movements';
import { AdmissionQueryParams } from '../schema';

const ADMISSIONS = 'Admissions';
const ADMISSION = 'Admission';
const COMPANIONS = 'Companions';
const PAYERS = 'Payers';
const DOCUMENTS = 'Documents';
const MOVEMENTS = 'Movements';

// ===== Lectures =====

export const useSearchAdmissions = (params: AdmissionQueryParams = {}) =>
    useQuery({
        queryKey: [ADMISSIONS, params],
        queryFn: () => SearchAdmissions(params),
        staleTime: 30 * 1000,
        placeholderData: (previous) => previous,
    });

export const useAdmission = (admissionId: string, admissionNumber?: string) =>
    useQuery({
        queryKey: [ADMISSION, admissionId, admissionNumber ?? null],
        queryFn: () => GetAdmissionById(admissionId, admissionNumber),
        enabled: Boolean(admissionId),
        staleTime: 30 * 1000,
    });

export const useActiveAdmission = (patientId?: string, numeroPatient?: string) =>
    useQuery({
        queryKey: [ADMISSION, 'active', patientId ?? null],
        queryFn: () => GetActiveAdmissionByPatient(patientId!, numeroPatient),
        enabled: Boolean(patientId),
        staleTime: 30 * 1000,
    });

export const useCompanions = (admissionId?: string) =>
    useQuery({
        queryKey: [COMPANIONS, admissionId],
        queryFn: () => ListCompanions(admissionId!),
        enabled: Boolean(admissionId),
    });

export const usePayers = (admissionId?: string) =>
    useQuery({
        queryKey: [PAYERS, admissionId],
        queryFn: () => ListPayers(admissionId!),
        enabled: Boolean(admissionId),
    });

export const useDocuments = (admissionId?: string) =>
    useQuery({
        queryKey: [DOCUMENTS, admissionId],
        queryFn: () => ListDocuments(admissionId!),
        enabled: Boolean(admissionId),
    });

export const useMovements = (encounterId?: string, numeroEncounter?: string) =>
    useQuery({
        queryKey: [MOVEMENTS, encounterId],
        queryFn: () => ListMovements(encounterId!, numeroEncounter),
        enabled: Boolean(encounterId),
    });

// ===== Écritures =====

function useInvalidate() {
    const qc = useQueryClient();
    return (admissionId?: string) => {
        qc.invalidateQueries({ queryKey: [ADMISSIONS] });
        if (admissionId) qc.invalidateQueries({ queryKey: [ADMISSION, admissionId] });
    };
}

export const useCreateAdmission = () => {
    const invalidate = useInvalidate();
    return useMutation({ mutationFn: CreateAdmission, onSuccess: (a) => invalidate(a?.id) });
};

export const useUpdateAdmissionStatus = () => {
    const invalidate = useInvalidate();
    return useMutation({ mutationFn: UpdateAdmissionStatus, onSuccess: (a) => invalidate(a?.id) });
};

export const useDischargePatient = () => {
    const invalidate = useInvalidate();
    return useMutation({ mutationFn: DischargePatient, onSuccess: (a) => invalidate(a?.id) });
};

export const useCancelAdmission = () => {
    const invalidate = useInvalidate();
    return useMutation({ mutationFn: CancelAdmission, onSuccess: (a) => invalidate(a?.id) });
};

export const useDeleteAdmission = () => {
    const invalidate = useInvalidate();
    return useMutation({ mutationFn: SoftDeleteAdmission, onSuccess: () => invalidate() });
};

function useInvalidateChild(key: string) {
    const qc = useQueryClient();
    return (admissionId: string) => {
        qc.invalidateQueries({ queryKey: [key, admissionId] });
        qc.invalidateQueries({ queryKey: [ADMISSION, admissionId] });
    };
}

export const useAddCompanion = () => {
    const invalidate = useInvalidateChild(COMPANIONS);
    return useMutation({ mutationFn: AddCompanion, onSuccess: (_d, v) => invalidate(v.admissionId) });
};

export const useUpdateCompanion = () => {
    const invalidate = useInvalidateChild(COMPANIONS);
    return useMutation({ mutationFn: UpdateCompanion, onSuccess: (_d, v) => invalidate(v.admissionId) });
};

export const useRemoveCompanion = () => {
    const invalidate = useInvalidateChild(COMPANIONS);
    return useMutation({ mutationFn: RemoveCompanion, onSuccess: (_d, v) => invalidate(v.admissionId) });
};

export const useAddPayer = () => {
    const invalidate = useInvalidateChild(PAYERS);
    return useMutation({ mutationFn: AddPayer, onSuccess: (_d, v) => invalidate(v.admissionId) });
};

export const useUpdatePayer = () => {
    const invalidate = useInvalidateChild(PAYERS);
    return useMutation({ mutationFn: UpdatePayer, onSuccess: (_d, v) => invalidate(v.admissionId) });
};

export const useRemovePayer = () => {
    const invalidate = useInvalidateChild(PAYERS);
    return useMutation({ mutationFn: RemovePayer, onSuccess: (_d, v) => invalidate(v.admissionId) });
};

export const useAddDocument = () => {
    const invalidate = useInvalidateChild(DOCUMENTS);
    return useMutation({ mutationFn: AddDocument, onSuccess: (_d, v) => invalidate(v.admissionId) });
};

export const useRemoveDocument = () => {
    const invalidate = useInvalidateChild(DOCUMENTS);
    return useMutation({ mutationFn: RemoveDocument, onSuccess: (_d, v) => invalidate(v.admissionId) });
};

export const useCreateMovement = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: CreateMovement,
        onSuccess: (_d, v) => {
            qc.invalidateQueries({ queryKey: [MOVEMENTS, v.encounterId] });
            qc.invalidateQueries({ queryKey: [ADMISSION, v.admissionId] });
        },
    });
};
