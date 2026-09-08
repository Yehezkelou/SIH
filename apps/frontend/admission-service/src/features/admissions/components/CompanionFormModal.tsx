'use client';

import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FormAlert } from '@/components/ui/FormAlert';
import { useUser } from '@/hooks/useUser';
import { Admission, AdmissionCompanion, Relationship } from '../schema';
import { useAddCompanion, useUpdateCompanion } from '../hooks/useAdmissions';
import { RELATIONSHIP } from '../utils/admissionHelpers';
import { parseApiError } from '../utils/parseApiError';

interface Props {
    admission: Admission;
    companion?: AdmissionCompanion | null;
    open: boolean;
    onClose: () => void;
}

export function CompanionFormModal({ admission, companion, open, onClose }: Props) {
    const { data: user } = useUser();
    const addMutation = useAddCompanion();
    const updateMutation = useUpdateCompanion();
    const isEdit = Boolean(companion);

    const [form, setForm] = useState({
        firstName: companion?.firstName ?? '',
        lastName: companion?.lastName ?? '',
        phoneNumber: companion?.phoneNumber ?? '',
        relationship: (companion?.relationship ?? 'OTHER') as Relationship,
        address: companion?.address ?? '',
    });
    const [error, setError] = useState<string | null>(null);

    const set = (patch: Partial<typeof form>) => setForm((prev) => ({ ...prev, ...patch }));
    const pending = addMutation.isPending || updateMutation.isPending;

    const submit = async () => {
        setError(null);
        if (!form.firstName || !form.lastName || !form.phoneNumber || !form.address)
            return setError('Tous les champs sont requis.');
        try {
            if (isEdit && companion) {
                await updateMutation.mutateAsync({
                    companionId: companion.id,
                    admissionId: admission.id,
                    ...form,
                    updatedBy: user?.id ?? '',
                });
            } else {
                await addMutation.mutateAsync({
                    admissionId: admission.id,
                    numeroAdmission: admission.admissionNumber,
                    patientId: admission.patientId,
                    numeroPatient: admission.numeroPatient,
                    ...form,
                    createdBy: user?.id ?? '',
                });
            }
            onClose();
        } catch (e) {
            setError(parseApiError(e).globalMessage);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={isEdit ? "Modifier l'accompagnant" : 'Ajouter un accompagnant'}
            icon={Users}
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={pending}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={submit} isLoading={pending}>
                        {isEdit ? 'Enregistrer' : 'Ajouter'}
                    </Button>
                </>
            }
        >
            <div className="space-y-4 pb-2">
                <FormAlert variant="danger" message={error} onClose={() => setError(null)} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Prénom" required value={form.firstName} onChange={(e) => set({ firstName: e.target.value })} />
                    <Input label="Nom" required value={form.lastName} onChange={(e) => set({ lastName: e.target.value })} />
                    <Input label="Téléphone" required value={form.phoneNumber} onChange={(e) => set({ phoneNumber: e.target.value })} />
                    <Select
                        label="Lien de parenté"
                        value={form.relationship}
                        onChange={(e) => set({ relationship: e.target.value as Relationship })}
                    >
                        {RELATIONSHIP.map((r) => (
                            <option key={r.value} value={r.value}>
                                {r.label}
                            </option>
                        ))}
                    </Select>
                    <div className="sm:col-span-2">
                        <Input label="Adresse" required value={form.address} onChange={(e) => set({ address: e.target.value })} />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default CompanionFormModal;
