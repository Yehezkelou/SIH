import { apiClient } from '@/lib/api-client';
import { CreateMovementInput, EncounterMovement } from '../schema';

const BASE = '/api/admission/encounter';

export async function ListMovements(
    encounterId: string,
    numeroEncounter?: string
): Promise<EncounterMovement[]> {
    const { data } = await apiClient.get<{ movements: EncounterMovement[] }>(
        `${BASE}/${encounterId}/movement`,
        { params: { numeroEncounter } }
    );
    return data.movements ?? [];
}

export async function CreateMovement(payload: CreateMovementInput): Promise<EncounterMovement> {
    const { data } = await apiClient.post<{ movement: EncounterMovement }>(
        `${BASE}/${payload.encounterId}/movement`,
        payload
    );
    return data.movement;
}
