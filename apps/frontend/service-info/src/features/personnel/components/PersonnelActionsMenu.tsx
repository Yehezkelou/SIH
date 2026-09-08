'use client';

import React, { useState } from 'react';
import { Eye, Shield, ShieldAlert, Trash2, UserCheck, UserMinus } from 'lucide-react';
import { AgentUser } from '../schema';
import {
    PERSONNEL_PERMISSIONS,
    StatusTransition,
    getStatusTransitions,
} from '../utils/personnelActions';
import { PersonnelStatusModal } from './PersonnelStatusModal';
import { PersonnelRolesModal } from './PersonnelRolesModal';
import { PersonnelDeleteModal } from './PersonnelDeleteModal';
import { ActionMenu, ActionMenuItem } from '@/components/ui/ActionMenu';
import { usePermissions } from '@/hooks/usePermissions';
import { ROUTES } from '@/config/routes';

interface PersonnelActionsMenuProps {
    agent: AgentUser;
    /** Sur la fiche elle-même, l'entrée « Consulter » n'a pas de sens. */
    showViewAction?: boolean;
    /** Après suppression depuis la fiche, il faut quitter la page. */
    redirectAfterDelete?: boolean;
}

const TRANSITION_ICONS: Record<string, typeof UserCheck> = {
    ACTIF: UserCheck,
    SUSPENDU: ShieldAlert,
    INACTIF: UserMinus,
};

/**
 * Toutes les actions réalisables sur un agent, réunies dans un seul menu.
 *
 * Les entrées sont filtrées par les permissions réelles de l'utilisateur : une
 * action qu'il ne peut pas exécuter n'apparaît pas, plutôt que de mener à un
 * 403. Les impossibilités liées à l'état de l'agent (et non à ses droits)
 * restent visibles mais désactivées, avec le motif — c'est une information
 * utile, pas un manque de droit.
 */
export function PersonnelActionsMenu({
    agent,
    showViewAction = true,
    redirectAfterDelete = false,
}: PersonnelActionsMenuProps) {
    const { can } = usePermissions();

    const [statusTransition, setStatusTransition] = useState<StatusTransition | null>(null);
    const [isRolesOpen, setIsRolesOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const items: ActionMenuItem[] = [];

    if (showViewAction) {
        items.push({
            key: 'view',
            label: 'Consulter la fiche',
            icon: Eye,
            href: ROUTES.PERSONNEL_DETAIL(agent.id),
        });
    }

    // Changements de statut — PATCH /users/:id/status
    if (can(PERSONNEL_PERMISSIONS.STATUS)) {
        const transitions = getStatusTransitions(agent.status);
        transitions.forEach((transition, index) => {
            items.push({
                key: `status-${transition.target}`,
                label: transition.label,
                icon: TRANSITION_ICONS[transition.target],
                tone: transition.tone,
                separatorBefore: index === 0 && items.length > 0,
                onSelect: () => setStatusTransition(transition),
            });
        });
    }

    // Gestion des rôles — POST / DELETE /users/:id/roles
    if (can(PERSONNEL_PERMISSIONS.MANAGE_ROLES)) {
        items.push({
            key: 'roles',
            label: 'Gérer les rôles',
            icon: Shield,
            separatorBefore: true,
            onSelect: () => setIsRolesOpen(true),
        });
    }

    // Suppression douce — DELETE /users/:id
    if (can(PERSONNEL_PERMISSIONS.DELETE)) {
        items.push({
            key: 'delete',
            label: 'Supprimer le compte',
            icon: Trash2,
            tone: 'danger',
            separatorBefore: true,
            disabled: agent.personnelType === 'SUPER_ADMIN',
            disabledReason:
                agent.personnelType === 'SUPER_ADMIN'
                    ? 'Un compte super administrateur ne peut pas être supprimé.'
                    : undefined,
            onSelect: () => setIsDeleteOpen(true),
        });
    }

    return (
        <>
            <ActionMenu
                items={items}
                emptyLabel="Vous ne disposez d'aucun droit d'action sur cet agent"
            />

            <PersonnelStatusModal
                agent={statusTransition ? agent : null}
                transition={statusTransition}
                onClose={() => setStatusTransition(null)}
            />

            <PersonnelRolesModal
                agent={isRolesOpen ? agent : null}
                onClose={() => setIsRolesOpen(false)}
            />

            <PersonnelDeleteModal
                agent={isDeleteOpen ? agent : null}
                onClose={() => setIsDeleteOpen(false)}
                redirectOnSuccess={redirectAfterDelete}
            />
        </>
    );
}

export default PersonnelActionsMenu;
