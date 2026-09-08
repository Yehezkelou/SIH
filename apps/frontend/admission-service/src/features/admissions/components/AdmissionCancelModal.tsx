'use client';

import React, { useState } from 'react';
import { XCircle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { FormAlert } from '@/components/ui/FormAlert';
import { useUser } from '@/hooks/useUser';
import { Admission } from '../schema';
import { useCancelAdmission } from '../hooks/useAdmissions';
import { parseApiError } from '../utils/parseApiError';

interface Props {
    admission: Admission;
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function AdmissionCancelModal({ admission, open, onClose, onSuccess }: Props) {
    const { data: user } = useUser();
    const mutation = useCancelAdmission();
    const [reason, setReason] = useState('');
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        setError(null);
        if (!reason.trim()) return setError("Le motif d'annulation est requis.");
        try {
            await mutation.mutateAsync({
                admissionId: admission.id,
                numeroAdmission: admission.admissionNumber,
                patientId: admission.patientId,
                numeroPatient: admission.numeroPatient,
                reason: reason.trim(),
                cancelledBy: user?.id ?? '',
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
            title="Annuler l'admission"
            description={`Admission ${admission.admissionNumber}`}
            icon={XCircle}
            tone="danger"
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={mutation.isPending}>
                        Retour
                    </Button>
                    <Button variant="danger" onClick={submit} isLoading={mutation.isPending}>
                        Annuler l'admission
                    </Button>
                </>
            }
        >
            <div className="space-y-4 pb-2">
                <FormAlert variant="danger" message={error} onClose={() => setError(null)} />
                <p className="text-xs text-muted">
                    L'annulation est une action métier tracée. Elle reste visible dans l'historique.
                </p>
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-surface-text">
                        Motif d'annulation <span className="text-danger">*</span>
                    </label>
                    <textarea
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Ex : erreur de saisie, admission en doublon, patient non venu…"
                        className="w-full py-2.5 px-3.5 text-xs bg-page rounded-xl text-surface-text placeholder:text-muted/70 border border-border/8 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                    />
                </div>
            </div>
        </Modal>
    );
}

export default AdmissionCancelModal;
