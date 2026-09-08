'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Lock, Check, Save } from 'lucide-react';
import { AgentUser } from '../schema';
import { useGetRoles, userAssignRole, useRemoveRole } from '../hooks/useApiPeronnel';
import { Button } from '@/components/ui/Button';
import { FormAlert } from '@/components/ui/FormAlert';

interface PersonnelRolesModalProps {
    agent: AgentUser | null;
    onClose: () => void;
}

/**
 * Attribution et révocation des rôles d'un agent.
 *
 * L'API n'expose pas de « remplacement » atomique : POST /users/:id/roles
 * ajoute, DELETE /users/:id/roles/:roleId retire. On calcule donc le delta
 * entre la sélection et l'état initial, puis on joue les deux opérations.
 */
export function PersonnelRolesModal({ agent, onClose }: PersonnelRolesModalProps) {
    const { data: rolesData, isLoading: isLoadingRoles } = useGetRoles();
    const assignMutation = userAssignRole();
    const removeMutation = useRemoveRole();

    const allRoles = rolesData?.data || [];
    const initialRoleIds = (agent?.userRoles || [])
        .map((ur) => ur.roleId || ur.role?.id)
        .filter(Boolean) as string[];

    const [selected, setSelected] = useState<string[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        setSelected(initialRoleIds);
        setServerError(null);
        // Se resynchronise sur l'agent, pas sur le tableau recalculé à chaque rendu.
    }, [agent?.id, agent?.userRoles?.length]);

    const toggle = (roleId: string) => {
        setSelected((prev) =>
            prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId]
        );
    };

    const toAdd = selected.filter((id) => !initialRoleIds.includes(id));
    const toRemove = initialRoleIds.filter((id) => !selected.includes(id));
    const hasChanges = toAdd.length > 0 || toRemove.length > 0;
    const isPending = assignMutation.isPending || removeMutation.isPending;

    const handleSubmit = async () => {
        if (!agent || !hasChanges) return;
        setServerError(null);

        try {
            // Les révocations d'abord : si l'ajout échoue, l'agent n'a pas
            // conservé un droit qu'on venait de lui retirer à l'écran.
            for (const roleId of toRemove) {
                await removeMutation.mutateAsync({ id: agent.id, roleId });
            }
            if (toAdd.length > 0) {
                await assignMutation.mutateAsync({ id: agent.id, roleIds: toAdd });
            }
            onClose();
        } catch (err) {
            const response = (err as { response?: { data?: { message?: string } } }).response;
            setServerError(
                response?.data?.message ||
                    (err as Error).message ||
                    "La mise à jour des rôles a échoué. Certaines modifications ont pu être appliquées : rouvrez la fiche pour voir l'état réel."
            );
        }
    };

    return (
        <AnimatePresence>
            {agent && (
                <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 12 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-lg bg-surface border border-border/8 rounded-3xl p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] flex flex-col"
                    >
                        <div className="flex items-start justify-between gap-3 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-surface-text">
                                        Rôles de {agent.prenom} {agent.nom.toUpperCase()}
                                    </h3>
                                    <p className="text-xs text-muted">
                                        {selected.length} rôle{selected.length > 1 ? 's' : ''}{' '}
                                        sélectionné{selected.length > 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                className="p-1.5 rounded-xl text-muted hover:text-surface-text hover:bg-hover/6 transition-colors cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <FormAlert
                            variant="danger"
                            message={serverError}
                            onClose={() => setServerError(null)}
                        />

                        <div className="space-y-2 overflow-y-auto pr-1 flex-1">
                            {isLoadingRoles ? (
                                [1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="h-14 rounded-xl bg-hover/6 animate-pulse"
                                    />
                                ))
                            ) : allRoles.length === 0 ? (
                                <p className="text-xs text-muted text-center py-6">
                                    Aucun rôle n'est disponible dans le système.
                                </p>
                            ) : (
                                allRoles.map((role) => {
                                    const isChecked = selected.includes(role.id);
                                    return (
                                        <button
                                            key={role.id}
                                            type="button"
                                            role="checkbox"
                                            aria-checked={isChecked}
                                            onClick={() => toggle(role.id)}
                                            className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                                                isChecked
                                                    ? 'bg-surface border-primary/40 shadow-xs'
                                                    : 'bg-page border-border/8 hover:border-border/12'
                                            }`}
                                        >
                                            <span
                                                className={`w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center shrink-0 ${
                                                    isChecked
                                                        ? 'bg-primary border-primary text-primary-text'
                                                        : 'border-border/12 bg-page'
                                                }`}
                                            >
                                                {isChecked && <Check size={11} strokeWidth={3} />}
                                            </span>

                                            <span className="min-w-0 flex-1">
                                                <span className="flex items-center gap-1.5 flex-wrap">
                                                    <span className="text-xs font-semibold text-surface-text">
                                                        {role.libelle}
                                                    </span>
                                                    {role.isSystem && (
                                                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-warning/10 text-warning-text border border-warning/20">
                                                            <Lock size={9} /> Système
                                                        </span>
                                                    )}
                                                </span>
                                                <span className="block font-mono text-[10px] text-muted mt-0.5">
                                                    {role.code}
                                                </span>
                                                {role.description && (
                                                    <span className="block text-[11px] text-muted leading-tight mt-1">
                                                        {role.description}
                                                    </span>
                                                )}
                                            </span>
                                        </button>
                                    );
                                })
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/8 shrink-0">
                            <p className="text-[11px] text-muted">
                                {hasChanges
                                    ? `${toAdd.length} ajout${toAdd.length > 1 ? 's' : ''}, ${toRemove.length} retrait${toRemove.length > 1 ? 's' : ''}`
                                    : 'Aucune modification'}
                            </p>
                            <div className="flex items-center gap-2.5">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={onClose}
                                    disabled={isPending}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    type="button"
                                    variant="primary"
                                    icon={Save}
                                    onClick={handleSubmit}
                                    disabled={!hasChanges}
                                    isLoading={isPending}
                                >
                                    Enregistrer
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default PersonnelRolesModal;
