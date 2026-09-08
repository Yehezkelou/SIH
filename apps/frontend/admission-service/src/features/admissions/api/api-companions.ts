import { apiClient } from '@/lib/api-client';
import {
    AddCompanionInput,
    AdmissionCompanion,
    RemoveCompanionInput,
    UpdateCompanionInput,
} from '../schema';

const BASE = '/api/admission';

export async function ListCompanions(admissionId: string): Promise<AdmissionCompanion[]> {
    const { data } = await apiClient.get<{ companions: AdmissionCompanion[] }>(
        `${BASE}/${admissionId}/companion`
    );
    return data.companions ?? [];
}

export async function AddCompanion(payload: AddCompanionInput): Promise<AdmissionCompanion> {
    const { data } = await apiClient.post<{ companion: AdmissionCompanion }>(
        `${BASE}/${payload.admissionId}/companion`,
        payload
    );
    return data.companion;
}

export async function UpdateCompanion(payload: UpdateCompanionInput): Promise<AdmissionCompanion> {
    const { data } = await apiClient.put<{ companion: AdmissionCompanion }>(
        `${BASE}/companion/${payload.companionId}`,
        payload
    );
    return data.companion;
}

export async function RemoveCompanion(payload: RemoveCompanionInput): Promise<{ message: string }> {
    const { data } = await apiClient.delete<{ message: string }>(
        `${BASE}/companion/${payload.companionId}`,
        { data: payload }
    );
    return data;
}
