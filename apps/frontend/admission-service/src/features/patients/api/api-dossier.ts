import { apiClient } from '@/lib/api-client';
import {
    ArchivDossier,
    DeleteDossierInput,
    FindOnlyDossierInput,
    PatientEnvelope,
    ReplaceDossierInput,
} from '../schema';

const BASE = '/api/dossier';

export type ResponseDossier = PatientEnvelope<ArchivDossier>;

/**
 * Recherche ou consultation d'une pièce d'archive spécifique — `GET /api/dossier`.
 */
export async function GetDossier(query: FindOnlyDossierInput): Promise<ResponseDossier> {
    const response = await apiClient.get<ResponseDossier>(BASE, {
        params: query,
    });
    return response.data;
}

/**
 * Remplacement d'une pièce d'archive ou mise à jour de ses métadonnées — `PUT /api/dossier`.
 * Si un fichier physique est fourni, la requête est transmise en multipart/form-data.
 */
export async function ReplaceDossier(
    payload: ReplaceDossierInput,
    file?: File
): Promise<ResponseDossier> {
    if (file) {
        const formData = new FormData();
        formData.append('dossier', file);
        for (const [key, value] of Object.entries(payload)) {
            if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        }
        const response = await apiClient.put<ResponseDossier>(BASE, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    }

    const response = await apiClient.put<ResponseDossier>(BASE, payload);
    return response.data;
}

/**
 * Suppression douce d'une pièce d'archive — `DELETE /api/dossier`.
 */
export async function DeleteDossier(payload: DeleteDossierInput): Promise<ResponseDossier> {
    const response = await apiClient.delete<ResponseDossier>(BASE, {
        data: payload,
    });
    return response.data;
}
