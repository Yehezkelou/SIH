import axios from 'axios';
import { apiClient } from '@/lib/api-client';
import {
    CreatePatientInput,
    CreatePatientPayload,
    CreatePatientProvisoirInput,
    FindOnePatientInput,
    MergePatientInput,
    Patient,
    PatientSearchOutcome,
    RegularizationPatientInput,
    ResponsePatient,
    ResponsePatientSearch,
    SearchPatientParams,
    SoftDeletePatientInput,
    UpdatePatientInput,
} from '../schema';

const BASE = '/api/patient';


export async function SearchPatients(
    params: SearchPatientParams = {}
): Promise<PatientSearchOutcome> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;

    try {
        const response = await apiClient.get<ResponsePatientSearch>(`${BASE}/search`, {
            params: { ...params, page, limit },
        });
        const result = response.data.data;

        return {
            total: result.total,
            exactMatch: result.exactMatch,
            patients: result.patients ?? [],
            page,
            limit,
            totalPages: Math.max(1, Math.ceil(result.total / limit)),
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return { total: 0, exactMatch: false, patients: [], page, limit, totalPages: 1 };
        }
        throw error;
    }
}


export async function GetPatientByUniqueId(uniquePatientId: string): Promise<Patient | null> {
    const result = await SearchPatients({ uniquePatientId, limit: 5 });
    return result.patients.find((p) => p.uniquePatientId === uniquePatientId) ?? result.patients[0] ?? null;
}

/** Recherche d'un dossier patient par son identifiant interne UUID. */
export async function GetPatientById(patientId: string): Promise<Patient | null> {
    const result = await SearchPatients({ limit: 50 });
    return result.patients.find((p) => p.id === patientId) ?? null;
}


export async function CreatePatient(
    payload: CreatePatientInput | CreatePatientPayload
): Promise<ResponsePatient> {
    const isWrapped = 'patient' in payload;
    const patientData = isWrapped ? payload.patient : payload;
    const dossierData = isWrapped ? payload.dossier : undefined;
    const files = isWrapped ? payload.files : undefined;

    if (files && files.length > 0) {
        const formData = new FormData();
        files.forEach((file: File) => formData.append('dossiers', file));
        formData.append('patient', JSON.stringify(patientData));
        if (dossierData) {
            formData.append('dossier', JSON.stringify(dossierData));
        }

        const response = await apiClient.post(`${BASE}/create`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    }

    // Le backend attend { patient: ..., dossier?: ... }
    const requestBody = {
        patient: patientData,
        dossier: dossierData ?? {},
    };

    const response = await apiClient.post(`${BASE}/create`, requestBody);
    return response.data;
}


export async function CreatePatientProvisoire(
    payload: CreatePatientProvisoirInput
): Promise<ResponsePatient> {
    const response = await apiClient.post(`${BASE}/provisoir`, payload);
    return response.data;
}

/** Régularisation d'un dossier provisoire — `PUT /api/patient/regularisation`. */
export async function RegularisePatient(
    payload: RegularizationPatientInput
): Promise<ResponsePatient> {
    const response = await apiClient.put(`${BASE}/regularisation`, payload);
    return response.data;
}

/** Mise à jour d'un dossier — `PUT /api/patient/update`. */
export async function UpdatePatient(payload: UpdatePatientInput): Promise<ResponsePatient> {
    const response = await apiClient.put(`${BASE}/update`, payload);
    return response.data;
}


export async function DeletePatient(payload: SoftDeletePatientInput): Promise<ResponsePatient> {
    const response = await apiClient.delete(`${BASE}/delete`, { data: payload });
    return response.data;
}

/** Fusion de deux dossiers en doublon — `POST /api/patient/fusion`. */
export async function MergePatients(payload: MergePatientInput): Promise<ResponsePatient> {
    const response = await apiClient.post(`${BASE}/fusion`, payload);
    return response.data;
}

/** Réexporté pour l'écran de recherche, qui manipule le type d'entrée brut. */
export type { FindOnePatientInput };

export * from './api-dossier';
