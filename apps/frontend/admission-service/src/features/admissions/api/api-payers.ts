import { apiClient } from '@/lib/api-client';
import { AddPayerInput, AdmissionPayer, RemovePayerInput, UpdatePayerInput } from '../schema';

const BASE = '/api/admission';

export async function ListPayers(admissionId: string): Promise<AdmissionPayer[]> {
    const { data } = await apiClient.get<{ payers: AdmissionPayer[] }>(`${BASE}/${admissionId}/payer`);
    return data.payers ?? [];
}

export async function AddPayer(payload: AddPayerInput): Promise<AdmissionPayer> {
    const { data } = await apiClient.post<{ payer: AdmissionPayer }>(
        `${BASE}/${payload.admissionId}/payer`,
        payload
    );
    return data.payer;
}

export async function UpdatePayer(payload: UpdatePayerInput): Promise<AdmissionPayer> {
    const { data } = await apiClient.put<{ payer: AdmissionPayer }>(
        `${BASE}/payer/${payload.payerId}`,
        payload
    );
    return data.payer;
}

export async function RemovePayer(payload: RemovePayerInput): Promise<{ message: string }> {
    const { data } = await apiClient.delete<{ message: string }>(`${BASE}/payer/${payload.payerId}`, {
        data: payload,
    });
    return data;
}
