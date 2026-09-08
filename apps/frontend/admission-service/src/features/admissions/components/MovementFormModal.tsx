'use client';

import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FormAlert } from '@/components/ui/FormAlert';
import { useUser } from '@/hooks/useUser';
import { Admission, Encounter, MovementType } from '../schema';
import { useCreateMovement } from '../hooks/useAdmissions';
import { MOVEMENT_TYPE } from '../utils/admissionHelpers';
import { parseApiError } from '../utils/parseApiError';

interface Props {
    admission: Admission;
    encounter: Encounter;
    open: boolean;
    onClose: () => void;
}

export function MovementFormModal({ admission, encounter, open, onClose }: Props) {
    const { data: user } = useUser();
    const mutation = useCreateMovement();

    const [movementType, setMovementType] = useState<MovementType>('TRANSFER');
    const [toDepartmentId, setToDepartmentId] = useState('');
    const [toRoomId, setToRoomId] = useState('');
    const [toBedId, setToBedId] = useState('');
    const [reason, setReason] = useState('');
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        setError(null);
        try {
            await mutation.mutateAsync({
                encounterId: encounter.id,
                encounterNumber: encounter.encounterNumber ?? '',
                admissionId: admission.id,
                admissionNumber: admission.admissionNumber,
                patientId: admission.patientId,
                numeroPatient: admission.numeroPatient,
                movementType,
                toDepartmentId: toDepartmentId.trim() || undefined,
                toRoomId: toRoomId.trim() || undefined,
                toBedId: toBedId.trim() || undefined,
                reason: reason.trim() || undefined,
                movementBy: user?.id ?? '',
            });
            onClose();
        } catch (e) {
            setError(parseApiError(e).globalMessage);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Enregistrer un mouvement"
            description={`Séjour ${encounter.encounterNumber ?? encounter.id.slice(0, 8)}`}
            icon={ArrowRightLeft}
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={mutation.isPending}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={submit} isLoading={mutation.isPending}>
                        Enregistrer
                    </Button>
                </>
            }
        >
            <div className="space-y-4 pb-2">
                <FormAlert variant="danger" message={error} onClose={() => setError(null)} />
                <Select
                    label="Type de mouvement"
                    value={movementType}
                    onChange={(e) => setMovementType(e.target.value as MovementType)}
                >
                    {MOVEMENT_TYPE.map((t) => (
                        <option key={t.value} value={t.value}>
                            {t.label}
                        </option>
                    ))}
                </Select>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input label="Département dest." placeholder="UUID" value={toDepartmentId} onChange={(e) => setToDepartmentId(e.target.value)} />
                    <Input label="Chambre dest." placeholder="UUID" value={toRoomId} onChange={(e) => setToRoomId(e.target.value)} />
                    <Input label="Lit dest." placeholder="UUID" value={toBedId} onChange={(e) => setToBedId(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-surface-text">Motif</label>
                    <textarea
                        rows={2}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Raison du mouvement (optionnel)…"
                        className="w-full py-2.5 px-3.5 text-xs bg-page rounded-xl text-surface-text placeholder:text-muted/70 border border-border/8 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                    />
                </div>
            </div>
        </Modal>
    );
}

export default MovementFormModal;
