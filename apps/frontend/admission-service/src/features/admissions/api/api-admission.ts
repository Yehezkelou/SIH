import axios from 'axios';
import { apiClient } from '@/lib/api-client';
import {
    Admission,
    AdmissionQueryParams,
    AdmissionSearchOutcome,
    AdmissionSearchResponse,
    CancelAdmissionInput,
    CreateAdmissionInput,
    DischargePatientInput,
    SoftDeleteAdmissionInput,
    UpdateAdmissionStatusInput,
} from '../schema';

const BASE = '/api/admission';

const EMPTY: AdmissionSearchOutcome = {
    admissions: [],
    meta: { total: 0, page: 1, limit: 10, totalPages: 1, hasNextPage: false, hasPreviousPage: false },
};

export async function SearchAdmissions(
    params: AdmissionQueryParams = {}
): Promise<AdmissionSearchOutcome> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;

    try {
        const { data } = await apiClient.get<AdmissionSearchResponse>(`${BASE}/search`, {
            params: { ...params, page, limit },
        });
        return { admissions: data.data ?? [], meta: data.meta };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return { ...EMPTY, meta: { ...EMPTY.meta, page, limit } };
        }
        throw error;
    }
}

// Détail complet (relations incluses). Sans numéro d'admission, on retombe sur
// la recherche — qui charge déjà les mêmes relations — pour retrouver la venue.
export async function GetAdmissionById(
    admissionId: string,
    admissionNumber?: string
): Promise<Admission | null> {
    if (admissionNumber) {
        const { data } = await apiClient.get<{ admission: Admission }>(`${BASE}/${admissionId}`, {
            params: { admissionNumber },
        });
        return data.admission ?? null;
    }

    const { admissions } = await SearchAdmissions({ limit: 100 });
    return admissions.find((a) => a.id === admissionId) ?? null;
}

export async function GetActiveAdmissionByPatient(
    patientId: string,
    numeroPatient?: string
): Promise<Admission | null> {
    try {
        const { data } = await apiClient.get<{ admission: Admission }>(`${BASE}/active/${patientId}`, {
            params: { numeroPatient },
        });
        return data.admission ?? null;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) return null;
        throw error;
    }
}

export async function CreateAdmission(payload: CreateAdmissionInput): Promise<Admission> {
    const { data } = await apiClient.post<{ admission: Admission }>(BASE, payload);
    return data.admission;
}

export async function UpdateAdmissionStatus(payload: UpdateAdmissionStatusInput): Promise<Admission> {
    const { data } = await apiClient.patch<{ admission: Admission }>(
        `${BASE}/${payload.admissionId}/status`,
        payload
    );
    return data.admission;
}

export async function DischargePatient(payload: DischargePatientInput): Promise<Admission> {
    const { data } = await apiClient.put<{ admission: Admission }>(
        `${BASE}/${payload.admissionId}/discharge`,
        payload
    );
    return data.admission;
}

export async function CancelAdmission(payload: CancelAdmissionInput): Promise<Admission> {
    const { data } = await apiClient.patch<{ admission: Admission }>(
        `${BASE}/${payload.admissionId}/cancel`,
        payload
    );
    return data.admission;
}

export async function SoftDeleteAdmission(
    payload: SoftDeleteAdmissionInput
): Promise<{ message: string }> {
    const { data } = await apiClient.delete<{ message: string }>(`${BASE}/${payload.admissionId}`, {
        data: payload,
    });
    return data;
}
