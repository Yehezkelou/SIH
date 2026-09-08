'use client';

import React, { useState } from 'react';
import { Activity, DoorOpen, Eye, Trash2, XCircle } from 'lucide-react';
import { ActionMenu, ActionMenuItem } from '@/components/ui/ActionMenu';
import { Button } from '@/components/ui/Button';
import { usePermissions } from '@/hooks/usePermissions';
import { ROUTES } from '@/config/routes';
import { Admission } from '../schema';
import { ADMISSION_PERMISSIONS, allowedNextStatuses, canDischarge, isActive } from '../utils/admissionHelpers';
import { AdmissionStatusModal } from './AdmissionStatusModal';
import { AdmissionDischargeModal } from './AdmissionDischargeModal';
import { AdmissionCancelModal } from './AdmissionCancelModal';
import { AdmissionDeleteModal } from './AdmissionDeleteModal';

type ModalKind = 'status' | 'discharge' | 'cancel' | 'delete' | null;

interface Props {
    admission: Admission;
    variant?: 'menu' | 'buttons';
    onDeleted?: () => void;
}

export function AdmissionActions({ admission, variant = 'menu', onDeleted }: Props) {
    const { can } = usePermissions();
    const [modal, setModal] = useState<ModalKind>(null);
    const close = () => setModal(null);

    const canUpdate = can(ADMISSION_PERMISSIONS.UPDATE);
    const canDelete = can(ADMISSION_PERMISSIONS.DELETE);
    const active = isActive(admission);
    const statusChangeable = active && allowedNextStatuses(admission.admissionStatus).length > 0;
    const dischargeable = canUpdate && canDischarge(admission);

    const items: ActionMenuItem[] = [];
    if (variant === 'menu') {
        items.push({
            key: 'view',
            label: 'Voir le détail',
            icon: Eye,
            href: ROUTES.ADMISSION_DETAIL(admission.id, admission.admissionNumber),
        });
    }
    if (canUpdate && statusChangeable)
        items.push({ key: 'status', label: 'Changer le statut', icon: Activity, onSelect: () => setModal('status') });
    if (dischargeable)
        items.push({ key: 'discharge', label: 'Enregistrer la sortie', icon: DoorOpen, onSelect: () => setModal('discharge') });
    if (canUpdate && active)
        items.push({ key: 'cancel', label: "Annuler l'admission", icon: XCircle, tone: 'danger', onSelect: () => setModal('cancel') });
    if (canDelete)
        items.push({ key: 'delete', label: 'Supprimer', icon: Trash2, tone: 'danger', separatorBefore: items.length > 0, onSelect: () => setModal('delete') });

    return (
        <>
            {variant === 'menu' ? (
                <ActionMenu items={items} />
            ) : (
                <div className="flex items-center gap-2 flex-wrap">
                    {canUpdate && statusChangeable && (
                        <Button variant="secondary" size="sm" icon={Activity} onClick={() => setModal('status')}>
                            Statut
                        </Button>
                    )}
                    {dischargeable && (
                        <Button variant="primary" size="sm" icon={DoorOpen} onClick={() => setModal('discharge')}>
                            Sortie
                        </Button>
                    )}
                    {(canUpdate && active) || canDelete ? (
                        <ActionMenu
                            items={[
                                ...(canUpdate && active
                                    ? [{ key: 'cancel', label: "Annuler l'admission", icon: XCircle, tone: 'danger' as const, onSelect: () => setModal('cancel') }]
                                    : []),
                                ...(canDelete
                                    ? [{ key: 'delete', label: 'Supprimer', icon: Trash2, tone: 'danger' as const, separatorBefore: canUpdate && active, onSelect: () => setModal('delete') }]
                                    : []),
                            ]}
                            label="Plus"
                        />
                    ) : null}
                </div>
            )}

            {modal === 'status' && <AdmissionStatusModal admission={admission} open onClose={close} />}
            {modal === 'discharge' && <AdmissionDischargeModal admission={admission} open onClose={close} />}
            {modal === 'cancel' && <AdmissionCancelModal admission={admission} open onClose={close} />}
            {modal === 'delete' && (
                <AdmissionDeleteModal admission={admission} open onClose={close} onSuccess={onDeleted} />
            )}
        </>
    );
}

export default AdmissionActions;
