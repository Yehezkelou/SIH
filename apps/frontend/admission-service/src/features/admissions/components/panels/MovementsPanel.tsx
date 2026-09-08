'use client';

import React, { useState } from 'react';
import { ArrowRightLeft, Plus, MapPin, DoorOpen, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { usePermissions } from '@/hooks/usePermissions';
import { Admission } from '../../schema';
import { useMovements } from '../../hooks/useAdmissions';
import {
    ADMISSION_PERMISSIONS,
    formatDateTime,
    isClosed,
    movementTypeLabel,
} from '../../utils/admissionHelpers';
import { MovementFormModal } from '../MovementFormModal';

const MOVEMENT_ICON = { ADMISSION: LogIn, TRANSFER: ArrowRightLeft, DISCHARGE: DoorOpen } as const;

export function MovementsPanel({ admission }: { admission: Admission }) {
    const { can } = usePermissions();
    const encounter = admission.encounters ?? null;
    const { data: movements } = useMovements(encounter?.id, encounter?.encounterNumber ?? undefined);
    const [open, setOpen] = useState(false);

    if (!encounter) {
        return (
            <div className="rounded-2xl border border-dashed border-border/12 p-8 text-center">
                <MapPin size={22} className="mx-auto text-muted mb-2" />
                <p className="text-xs text-muted">
                    Aucun séjour ouvert. Les mouvements sont disponibles une fois le patient admis ou enregistré.
                </p>
            </div>
        );
    }

    const list = movements ?? encounter.movements ?? [];
    const editable = can(ADMISSION_PERMISSIONS.UPDATE) && !isClosed(admission);

    const loc = (dep?: string, room?: string, bed?: string) =>
        [dep, room, bed].filter(Boolean).map((v) => v!.slice(0, 8)).join(' · ') || '—';

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-xs text-muted">
                    Séjour <span className="font-mono text-surface-text">{encounter.encounterNumber ?? encounter.id.slice(0, 8)}</span> ·{' '}
                    {list.length} mouvement{list.length > 1 ? 's' : ''}
                </p>
                {editable && (
                    <Button variant="secondary" size="sm" icon={Plus} onClick={() => setOpen(true)}>
                        Nouveau mouvement
                    </Button>
                )}
            </div>

            {list.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/12 p-8 text-center">
                    <ArrowRightLeft size={22} className="mx-auto text-muted mb-2" />
                    <p className="text-xs text-muted">Aucun mouvement enregistré pour ce séjour.</p>
                </div>
            ) : (
                <ol className="relative border-l-2 border-border/8 ml-3 space-y-4">
                    {list.map((m) => {
                        const Icon = MOVEMENT_ICON[m.movementType] ?? ArrowRightLeft;
                        return (
                            <li key={m.id} className="ml-5">
                                <span className="absolute -left-[13px] w-6 h-6 rounded-full bg-surface border border-border/8 flex items-center justify-center text-surface-text">
                                    <Icon size={12} />
                                </span>
                                <div className="rounded-2xl border border-border/8 bg-page/40 p-3.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-xs font-semibold text-surface-text">
                                            {movementTypeLabel(m.movementType)}
                                        </span>
                                        <span className="text-[11px] text-muted">{formatDateTime(m.movementDate ?? m.createdAt)}</span>
                                    </div>
                                    <p className="text-[11px] text-muted mt-1 flex items-center gap-1.5">
                                        <MapPin size={11} />
                                        {loc(m.fromDepartmentId, m.fromRoomId, m.fromBedId)} →{' '}
                                        {loc(m.toDepartmentId, m.toRoomId, m.toBedId)}
                                    </p>
                                    {m.reason && <p className="text-[11px] text-muted mt-1">{m.reason}</p>}
                                </div>
                            </li>
                        );
                    })}
                </ol>
            )}

            {open && <MovementFormModal admission={admission} encounter={encounter} open onClose={() => setOpen(false)} />}
        </div>
    );
}

export default MovementsPanel;
