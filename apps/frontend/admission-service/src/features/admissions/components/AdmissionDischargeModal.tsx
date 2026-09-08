'use client';

import React, { useState } from 'react';
import { DoorOpen } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { FormAlert } from '@/components/ui/FormAlert';
import { useUser } from '@/hooks/useUser';
import { Admission } from '../schema';
import { useDischargePatient } from '../hooks/useAdmissions';
import { parseApiError } from '../utils/parseApiError';

interface Props {
    admission: Admission;
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function AdmissionDischargeModal({ admission, open, onClose, onSuccess }: Props) {
    const { data: user } = useUser();
    const mutation = useDischargePatient();
    const [reason, setReason] = useState('');
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        setError(null);
        try {
            await mutation.mutateAsync({
                admissionId: admission.id,
                numeroAdmission: admission.admissionNumber,
                patientId: admission.patientId,
                numeroPatient: admission.numeroPatient,
                encounterId: admission.encounters?.id,
                encounterNumber: admission.encounters?.encounterNumber ?? undefined,
                reason: reason.trim() || undefined,
                dischargedBy: user?.id ?? '',
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
            title="Enregistrer la sortie"
            description={`Admission ${admission.admissionNumber}`}
            icon={DoorOpen}
            tone="warning"
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={mutation.isPending}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={submit} isLoading={mutation.isPending}>
                        Confirmer la sortie
                    </Button>
                </>
            }
        >
            <div className="space-y-4 pb-2">
                <FormAlert variant="danger" message={error} onClose={() => setError(null)} />
                <p className="text-xs text-muted bg-warning/10 border border-warning/20 text-warning-text rounded-xl p-3">
                    La sortie clôture le séjour du patient. Le statut passe à « Sorti ».
                </p>
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-surface-text">Compte rendu de sortie</label>
                    <textarea
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Motif ou observations de sortie (optionnel)…"
                        className="w-full py-2.5 px-3.5 text-xs bg-page rounded-xl text-surface-text placeholder:text-muted/70 border border-border/8 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                    />
                </div>
            </div>
        </Modal>
    );
}

export default AdmissionDischargeModal;
