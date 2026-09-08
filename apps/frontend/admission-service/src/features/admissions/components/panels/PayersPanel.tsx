'use client';

import React, { useState } from 'react';
import { CreditCard, Plus, Pencil, Trash2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { usePermissions } from '@/hooks/usePermissions';
import { useUser } from '@/hooks/useUser';
import { Admission, AdmissionPayer } from '../../schema';
import { usePayers, useRemovePayer } from '../../hooks/useAdmissions';
import { ADMISSION_PERMISSIONS, formatDate, isClosed, payerTypeLabel } from '../../utils/admissionHelpers';
import { parseApiError } from '../../utils/parseApiError';
import { PayerFormModal } from '../PayerFormModal';

export function PayersPanel({ admission }: { admission: Admission }) {
    const { can } = usePermissions();
    const { data: user } = useUser();
    const { data: payers } = usePayers(admission.id);
    const removeMutation = useRemovePayer();

    const [editing, setEditing] = useState<AdmissionPayer | null | 'new'>(null);
    const [toRemove, setToRemove] = useState<AdmissionPayer | null>(null);
    const [error, setError] = useState<string | null>(null);

    const list = payers ?? admission.payers ?? [];
    const editable = can(ADMISSION_PERMISSIONS.UPDATE) && !isClosed(admission);

    const confirmRemove = async () => {
        if (!toRemove) return;
        setError(null);
        try {
            await removeMutation.mutateAsync({
                payerId: toRemove.id,
                admissionId: admission.id,
                deletedBy: user?.id ?? '',
            });
            setToRemove(null);
        } catch (e) {
            setError(parseApiError(e).globalMessage);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-xs text-muted">{list.length} payeur{list.length > 1 ? 's' : ''}</p>
                {editable && (
                    <Button variant="secondary" size="sm" icon={Plus} onClick={() => setEditing('new')}>
                        Ajouter
                    </Button>
                )}
            </div>

            {list.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/12 p-8 text-center">
                    <CreditCard size={22} className="mx-auto text-muted mb-2" />
                    <p className="text-xs text-muted">Aucun payeur ni prise en charge déclarés.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {list.map((p) => (
                        <div key={p.id} className="rounded-2xl border border-border/8 bg-page/40 p-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-info/10 text-info-text border border-info/20 flex items-center justify-center shrink-0">
                                <ShieldCheck size={18} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-surface-text truncate">{p.name}</p>
                                <div className="flex items-center gap-3 flex-wrap text-[11px] text-muted mt-0.5">
                                    <span>{payerTypeLabel(p.payerType)}</span>
                                    <span className="font-mono">N° {p.policyNumber}</span>
                                    <span>Couv. {p.coveragePercentage ?? 0}%</span>
                                    {p.validUntil && <span>Valide au {formatDate(p.validUntil)}</span>}
                                </div>
                            </div>
                            {editable && (
                                <div className="flex items-center gap-1 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setEditing(p)}
                                        className="p-1.5 rounded-lg text-muted hover:text-surface-text hover:bg-hover/6 transition-colors cursor-pointer"
                                    >
                                        <Pencil size={13} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setToRemove(p)}
                                        className="p-1.5 rounded-lg text-muted hover:text-danger-text hover:bg-danger/10 transition-colors cursor-pointer"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {editing && (
                <PayerFormModal
                    admission={admission}
                    payer={editing === 'new' ? null : editing}
                    open
                    onClose={() => setEditing(null)}
                />
            )}

            <ConfirmDialog
                open={Boolean(toRemove)}
                onClose={() => setToRemove(null)}
                onConfirm={confirmRemove}
                title="Retirer le payeur"
                message={`Confirmez-vous le retrait de « ${toRemove?.name ?? ''} » ?`}
                confirmLabel="Retirer"
                isLoading={removeMutation.isPending}
                error={error}
            />
        </div>
    );
}

export default PayersPanel;
