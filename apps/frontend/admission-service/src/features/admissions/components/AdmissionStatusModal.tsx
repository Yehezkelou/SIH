'use client';

import React, { useMemo, useState } from 'react';
import { Activity } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { FormAlert } from '@/components/ui/FormAlert';
import { useUser } from '@/hooks/useUser';
import { Admission, AdmissionStatus } from '../schema';
import { useUpdateAdmissionStatus } from '../hooks/useAdmissions';
import { allowedNextStatuses, statusLabel } from '../utils/admissionHelpers';
import { parseApiError } from '../utils/parseApiError';

interface Props {
    admission: Admission;
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function AdmissionStatusModal({ admission, open, onClose, onSuccess }: Props) {
    const { data: user } = useUser();
    const mutation = useUpdateAdmissionStatus();

    const options = useMemo(() => allowedNextStatuses(admission.admissionStatus), [admission.admissionStatus]);
    const [newStatus, setNewStatus] = useState<AdmissionStatus | ''>('');
    const [reason, setReason] = useState('');
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        setError(null);
        if (!newStatus) return setError('Sélectionnez le nouveau statut.');
        try {
            await mutation.mutateAsync({
                admissionId: admission.id,
                numeroAdmission: admission.admissionNumber,
                patientId: admission.patientId,
                numeroPatient: admission.numeroPatient,
                newStatus,
                reason: reason.trim() || undefined,
                updatedBy: user?.id ?? '',
            });
            onSuccess?.();
            onClose();
        } catch (e) {
            setError(parseApiError(e).globalMessage);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Changer le statut"
            description={`Admission ${admission.admissionNumber}`}
            icon={Activity}
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={mutation.isPending}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={submit} isLoading={mutation.isPending}>
                        Confirmer
                    </Button>
                </>
            }
        >
            <div className="space-y-4 pb-2">
                <FormAlert variant="danger" message={error} onClose={() => setError(null)} />

                <div className="text-xs text-muted">
                    Statut actuel :{' '}
                    <span className="font-semibold text-surface-text">{statusLabel(admission.admissionStatus)}</span>
                </div>

                {options.length === 0 ? (
                    <p className="text-xs text-muted bg-hover/6 border border-border/8 rounded-xl p-3">
                        Aucune transition de statut n'est possible depuis l'état actuel.
                    </p>
                ) : (
                    <Select
                        label="Nouveau statut"
                        required
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as AdmissionStatus)}
                    >
                        <option value="">Sélectionner…</option>
                        {options.map((s) => (
                            <option key={s} value={s}>
                                {statusLabel(s)}
                            </option>
                        ))}
                    </Select>
                )}

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-surface-text">Motif / commentaire</label>
                    <textarea
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Précisez le motif du changement (optionnel)…"
                        className="w-full py-2.5 px-3.5 text-xs bg-page rounded-xl text-surface-text placeholder:text-muted/70 border border-border/8 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                    />
                </div>
            </div>
        </Modal>
    );
}

export default AdmissionStatusModal;
