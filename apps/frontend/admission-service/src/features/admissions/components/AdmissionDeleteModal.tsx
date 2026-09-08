'use client';

import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { FormAlert } from '@/components/ui/FormAlert';
import { useUser } from '@/hooks/useUser';
import { Admission } from '../schema';
import { useDeleteAdmission } from '../hooks/useAdmissions';
import { parseApiError } from '../utils/parseApiError';

interface Props {
    admission: Admission;
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function AdmissionDeleteModal({ admission, open, onClose, onSuccess }: Props) {
    const { data: user } = useUser();
    const mutation = useDeleteAdmission();
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        setError(null);
        try {
            await mutation.mutateAsync({
                admissionId: admission.id,
                numeroAdmission: admission.admissionNumber,
                patientId: admission.patientId,
                numeroPatient: admission.numeroPatient,
                deletedBy: user?.id ?? '',
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
            title="Supprimer l'admission"
            description={`Admission ${admission.admissionNumber}`}
            icon={Trash2}
            tone="danger"
            size="sm"
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={mutation.isPending}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={submit} isLoading={mutation.isPending}>
                        Supprimer
                    </Button>
                </>
            }
        >
            <div className="space-y-4 pb-2">
                <FormAlert variant="danger" message={error} onClose={() => setError(null)} />
                <p className="text-xs text-surface-text">
                    Cette admission sera archivée (suppression douce). Confirmez-vous la suppression de{' '}
                    <span className="font-semibold">{admission.admissionNumber}</span> ?
                </p>
            </div>
        </Modal>
    );
}

export default AdmissionDeleteModal;
