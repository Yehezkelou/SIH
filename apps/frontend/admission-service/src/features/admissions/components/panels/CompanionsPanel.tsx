'use client';

import React, { useState } from 'react';
import { Users, Plus, Pencil, Trash2, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { usePermissions } from '@/hooks/usePermissions';
import { useUser } from '@/hooks/useUser';
import { Admission, AdmissionCompanion } from '../../schema';
import { useCompanions, useRemoveCompanion } from '../../hooks/useAdmissions';
import { ADMISSION_PERMISSIONS, isClosed, relationshipLabel } from '../../utils/admissionHelpers';
import { parseApiError } from '../../utils/parseApiError';
import { CompanionFormModal } from '../CompanionFormModal';

export function CompanionsPanel({ admission }: { admission: Admission }) {
    const { can } = usePermissions();
    const { data: user } = useUser();
    const { data: companions } = useCompanions(admission.id);
    const removeMutation = useRemoveCompanion();

    const [editing, setEditing] = useState<AdmissionCompanion | null | 'new'>(null);
    const [toRemove, setToRemove] = useState<AdmissionCompanion | null>(null);
    const [error, setError] = useState<string | null>(null);

    const list = companions ?? admission.companions ?? [];
    const editable = can(ADMISSION_PERMISSIONS.UPDATE) && !isClosed(admission);

    const confirmRemove = async () => {
        if (!toRemove) return;
        setError(null);
        try {
            await removeMutation.mutateAsync({
                companionId: toRemove.id,
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
                <p className="text-xs text-muted">{list.length} accompagnant{list.length > 1 ? 's' : ''}</p>
                {editable && (
                    <Button variant="secondary" size="sm" icon={Plus} onClick={() => setEditing('new')}>
                        Ajouter
                    </Button>
                )}
            </div>

            {list.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/12 p-8 text-center">
                    <Users size={22} className="mx-auto text-muted mb-2" />
                    <p className="text-xs text-muted">Aucun accompagnant déclaré.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {list.map((c) => (
                        <div key={c.id} className="rounded-2xl border border-border/8 bg-page/40 p-4 flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-primary/8 border border-border/8 flex items-center justify-center font-bold text-[10px] text-surface-text shrink-0">
                                {(c.firstName?.[0] ?? '') + (c.lastName?.[0] ?? '')}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-surface-text truncate">
                                    {c.firstName} {c.lastName}
                                </p>
                                <p className="text-[11px] text-muted">{relationshipLabel(c.relationship)}</p>
                                <div className="mt-1.5 space-y-0.5 text-[11px] text-muted">
                                    <p className="flex items-center gap-1.5"><Phone size={11} /> {c.phoneNumber || '—'}</p>
                                    <p className="flex items-center gap-1.5"><MapPin size={11} /> {c.address || '—'}</p>
                                </div>
                            </div>
                            {editable && (
                                <div className="flex flex-col gap-1 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setEditing(c)}
                                        className="p-1.5 rounded-lg text-muted hover:text-surface-text hover:bg-hover/6 transition-colors cursor-pointer"
                                    >
                                        <Pencil size={13} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setToRemove(c)}
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
                <CompanionFormModal
                    admission={admission}
                    companion={editing === 'new' ? null : editing}
                    open
                    onClose={() => setEditing(null)}
                />
            )}

            <ConfirmDialog
                open={Boolean(toRemove)}
                onClose={() => setToRemove(null)}
                onConfirm={confirmRemove}
                title="Retirer l'accompagnant"
                message={`Confirmez-vous le retrait de ${toRemove?.firstName ?? ''} ${toRemove?.lastName ?? ''} ?`}
                confirmLabel="Retirer"
                isLoading={removeMutation.isPending}
                error={error}
            />
        </div>
    );
}

export default CompanionsPanel;
