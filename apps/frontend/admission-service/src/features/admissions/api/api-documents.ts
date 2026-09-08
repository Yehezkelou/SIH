import { apiClient } from '@/lib/api-client';
import { AddDocumentInput, AdmissionDocument, RemoveDocumentInput } from '../schema';

const BASE = '/api/admission';

export async function ListDocuments(admissionId: string): Promise<AdmissionDocument[]> {
    const { data } = await apiClient.get<{ documents: AdmissionDocument[] }>(
        `${BASE}/${admissionId}/document`
    );
    return data.documents ?? [];
}

// Upload multipart : le backend attend le fichier sous le champ « file ».
export async function AddDocument(payload: AddDocumentInput): Promise<AdmissionDocument> {
    const { file, ...meta } = payload;
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(meta).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, String(value));
    });

    const { data } = await apiClient.post<{ document: AdmissionDocument }>(
        `${BASE}/${payload.admissionId}/document`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data.document;
}

export async function RemoveDocument(payload: RemoveDocumentInput): Promise<{ message: string }> {
    const { data } = await apiClient.delete<{ message: string }>(
        `${BASE}/document/${payload.documentId}`,
        { data: payload }
    );
    return data;
}
