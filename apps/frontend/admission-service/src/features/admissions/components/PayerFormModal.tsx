'use client';

import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FormAlert } from '@/components/ui/FormAlert';
import { useUser } from '@/hooks/useUser';
import { Admission, AdmissionPayer, AdmissionPayerType } from '../schema';
import { useAddPayer, useUpdatePayer } from '../hooks/useAdmissions';
import { PAYER_TYPE } from '../utils/admissionHelpers';
import { parseApiError } from '../utils/parseApiError';

interface Props {
    admission: Admission;
    payer?: AdmissionPayer | null;
    open: boolean;
    onClose: () => void;
}

export function PayerFormModal({ admission, payer, open, onClose }: Props) {
    const { data: user } = useUser();
    const addMutation = useAddPayer();
    const updateMutation = useUpdatePayer();
    const isEdit = Boolean(payer);

    const [form, setForm] = useState({
        name: payer?.name ?? '',
        payerType: (payer?.payerType ?? 'INSURANCE') as AdmissionPayerType,
        policyNumber: payer?.policyNumber ?? '',
        coveragePercentage: payer?.coveragePercentage ?? 100,
        coverageLimit: payer?.coverageLimit ?? 0,
        validUntil: payer?.validUntil ? payer.validUntil.slice(0, 10) : '',
    });
    const [error, setError] = useState<string | null>(null);

    const set = (patch: Partial<typeof form>) => setForm((prev) => ({ ...prev, ...patch }));
    const pending = addMutation.isPending || updateMutation.isPending;

    const submit = async () => {
        setError(null);
        if (!form.name || !form.policyNumber || !form.validUntil)
            return setError('Nom, n° de police et date de validité sont requis.');
        const body = {
            ...form,
            coveragePercentage: Number(form.coveragePercentage) || 0,
            coverageLimit: Number(form.coverageLimit) || 0,
        };
        try {
            if (isEdit && payer) {
                await updateMutation.mutateAsync({
                    payerId: payer.id,
                    admissionId: admission.id,
                    ...body,
                    updatedBy: user?.id ?? '',
                });
            } else {
                await addMutation.mutateAsync({
                    admissionId: admission.id,
                    numeroAdmission: admission.admissionNumber,
                    patientId: admission.patientId,
                    numeroPatient: admission.numeroPatient,
                    ...body,
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
            title={isEdit ? 'Modifier le payeur' : 'Ajouter un payeur'}
            icon={CreditCard}
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
                    <Input label="Nom / assurance" required value={form.name} onChange={(e) => set({ name: e.target.value })} />
                    <Select
                        label="Type de payeur"
                        value={form.payerType}
                        onChange={(e) => set({ payerType: e.target.value as AdmissionPayerType })}
                    >
                        {PAYER_TYPE.map((t) => (
                            <option key={t.value} value={t.value}>
                                {t.label}
                            </option>
                        ))}
                    </Select>
                    <Input label="N° de police" required value={form.policyNumber} onChange={(e) => set({ policyNumber: e.target.value })} />
                    <Input
                        label="Couverture (%)"
                        type="number"
                        min={0}
                        max={100}
                        value={form.coveragePercentage}
                        onChange={(e) => set({ coveragePercentage: Number(e.target.value) })}
                    />
                    <Input
                        label="Plafond de couverture"
                        type="number"
                        min={0}
                        value={form.coverageLimit}
                        onChange={(e) => set({ coverageLimit: Number(e.target.value) })}
                    />
                    <Input label="Valide jusqu'au" type="date" required value={form.validUntil} onChange={(e) => set({ validUntil: e.target.value })} />
                </div>
            </div>
        </Modal>
    );
}

export default PayerFormModal;
