'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, X, Save, Plus, Sparkles } from 'lucide-react';
import { Role, Permission, CreateRoleInput, UpdateRoleInput } from '../schema';
import { useCreateRole, useUpdateRole } from '../hooks/useRoles';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FormAlert } from '@/components/ui/FormAlert';
import { RolePermissionsMatrix } from './RolePermissionsMatrix';

/**
 * Génère automatiquement un code technique conventionné (ex: ROLE_MEDECIN_URGENTISTE)
 * à partir du libellé saisi par l'utilisateur.
 */
function slugifyRoleCode(text: string): string {
    const clean = text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Retrait des accents
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, '_')     // Espaces et caractères spéciaux -> underscore
        .replace(/^_+|_+$/g, '');        // Nettoyage des underscores aux extrémités

    return clean ? `ROLE_${clean}` : 'ROLE_';
}

/**
 * Formate en direct la saisie de l'utilisateur :
 * - Majuscules et suppression des accents
 * - Remplacement automatique des espaces et tirets par des underscores
 * - Ajout automatique de l'underscore '_' dès que l'utilisateur tape ou colle 'ROLE'
 */
function formatRoleCodeInput(inputVal: string, previousVal: string): string {
    const isDeleting = inputVal.length < previousVal.length;

    let cleaned = inputVal
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
        .replace(/[\s-]+/g, '_')
        .replace(/[^A-Z0-9_]/g, '');

    if (!isDeleting) {
        // Dès que l'utilisateur tape "ROLE", on insère automatiquement l'underscore "_"
        if (cleaned === 'ROLE') {
            cleaned = 'ROLE_';
        } else if (/^ROLE[A-Z0-9]/.test(cleaned) && !cleaned.startsWith('ROLE_')) {
            // Si l'utilisateur saisit sans underscore (ex: "ROLEM..."), on l'intercale automatiquement
            cleaned = 'ROLE_' + cleaned.slice(4);
        }
    }

    // Réduction des underscores multiples consécutifs
    cleaned = cleaned.replace(/__+/g, '_');

    return cleaned;
}

interface RoleFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingRole?: Role | null;
    allPermissions: Permission[];
    /**
     * Droit d'écrire (`role:CREATE` en création, `role:UPDATE` en édition).
     * Sans lui la modale s'ouvre en consultation : proposer « Enregistrer »
     * reviendrait à promettre une action que l'API refusera par un 403.
     */
    canSubmit?: boolean;
}

export function RoleFormModal({
    isOpen,
    onClose,
    editingRole,
    allPermissions,
    canSubmit = false,
}: RoleFormModalProps) {
    const isEditMode = Boolean(editingRole);
    const isSystemRole = Boolean(editingRole?.isSystem);
    // Un rôle système, ou un droit manquant, aboutissent au même écran : lecture seule.
    const isReadOnly = isSystemRole || !canSubmit;

    const createMutation = useCreateRole();
    const updateMutation = useUpdateRole();

    const [libelle, setLibelle] = useState('');
    const [code, setCode] = useState('');
    const [isCodeManuallyEdited, setIsCodeManuallyEdited] = useState(false);
    const [description, setDescription] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        if (editingRole) {
            setLibelle(editingRole.libelle || '');
            setCode(editingRole.code || '');
            setDescription(editingRole.description || '');
            setIsCodeManuallyEdited(true);
            const existingPermIds =
                editingRole.rolePermissions?.map((rp) => rp.permissionId || rp.permission?.id).filter(Boolean) as string[] || [];
            setSelectedPermissions(existingPermIds);
        } else {
            setLibelle('');
            setCode('ROLE_');
            setIsCodeManuallyEdited(false);
            setDescription('');
            setSelectedPermissions([]);
        }
        setErrors({});
        setServerError(null);
    }, [editingRole, isOpen]);

    // Synchronisation automatique : quand le libellé change et que l'utilisateur
    // n'a pas personnalisé manuellement le code, on génère automatiquement le code par défaut.
    const handleLibelleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLibelle = e.target.value;
        setLibelle(newLibelle);

        if (errors.libelle) {
            setErrors((prev) => ({ ...prev, libelle: undefined! }));
        }

        if (!isEditMode && !isCodeManuallyEdited) {
            setCode(slugifyRoleCode(newLibelle));
            if (errors.code) {
                setErrors((prev) => ({ ...prev, code: undefined! }));
            }
        }
    };

    // Gestion de la saisie assistée dans le champ code technique
    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCodeManuallyEdited(true);
        const formatted = formatRoleCodeInput(e.target.value, code);
        setCode(formatted);

        if (errors.code) {
            setErrors((prev) => ({ ...prev, code: undefined! }));
        }
    };

    // Auto tab / complétion clavier (Tab / Espace / Entrée)
    const handleCodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Tab' || e.key === ' ') && code === 'ROLE') {
            setCode('ROLE_');
        }
    };

    // Rétablir la synchronisation automatique depuis le libellé
    const handleResetAutoCode = () => {
        setIsCodeManuallyEdited(false);
        setCode(slugifyRoleCode(libelle));
        if (errors.code) {
            setErrors((prev) => ({ ...prev, code: undefined! }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!libelle.trim()) newErrors.libelle = 'Le libellé du rôle est obligatoire';
        if (!isEditMode) {
            const cleanCode = code.trim();
            if (!cleanCode || cleanCode === 'ROLE_') {
                newErrors.code = 'Le code technique doit préciser le rôle (ex: ROLE_INFIRMIER_CHEF)';
            } else if (!/^[A-Z0-9_]+$/.test(cleanCode)) {
                newErrors.code = 'Le code doit être en majuscules sans espaces (ex: ROLE_COORD)';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError(null);

        if (!validate()) return;

        try {
            if (isEditMode && editingRole) {
                const payload: UpdateRoleInput = {
                    id: editingRole.id,
                    libelle: libelle.trim(),
                    description: description.trim(),
                    permissionIds: selectedPermissions,
                };
                await updateMutation.mutateAsync(payload);
            } else {
                const payload: CreateRoleInput = {
                    code: code.trim().toUpperCase(),
                    libelle: libelle.trim(),
                    description: description.trim(),
                    permissionIds: selectedPermissions,
                };
                await createMutation.mutateAsync(payload);
            }
            onClose();
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.message ||
                "Une erreur est survenue lors de l'enregistrement du rôle.";
            setServerError(msg);
        }
    };

    const isPending = createMutation.isPending || updateMutation.isPending;

    // `AnimatePresence` doit rester monté en permanence : c'est lui qui joue la
    // sortie. Un `return null` placé au-dessus le démontait avec son enfant, et
    // l'animation d'`exit` n'était jamais visible.
    return (
        <AnimatePresence>
            {isOpen && (
            <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className="w-full max-w-3xl bg-surface border border-border/8 rounded-3xl p-6 shadow-2xl space-y-6 my-8 max-h-[90vh] flex flex-col"
                >
                    {/* En-tête de la modale */}
                    <div className="flex items-center justify-between pb-4 border-b border-border/8 shrink-0">
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                                    isReadOnly
                                        ? 'bg-warning/15 text-warning-text'
                                        : 'bg-primary/10 text-primary'
                                }`}
                            >
                                {isReadOnly ? <Lock size={20} /> : <Shield size={20} />}
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-surface-text">
                                    {!isEditMode
                                        ? 'Créer un profil de rôle'
                                        : isSystemRole
                                          ? `Rôle Système : ${editingRole?.libelle}`
                                          : isReadOnly
                                            ? `Consulter le rôle : ${editingRole?.libelle}`
                                            : `Modifier le rôle : ${editingRole?.libelle}`}
                                </h3>
                                <p className="text-xs text-muted">
                                    {isSystemRole
                                        ? 'Ce profil est protégé. Vous pouvez consulter ses permissions.'
                                        : isReadOnly
                                          ? 'Consultation seule : le droit « role:UPDATE » est requis pour modifier ce profil.'
                                          : 'Définissez le nom, le code et les autorisations associées.'}
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

                    {/* Alerte d'erreur */}
                    <FormAlert
                        variant="danger"
                        title="Erreur lors de l'enregistrement"
                        message={serverError}
                        onClose={() => setServerError(null)}
                    />

                    {/* Corps avec défilement */}
                    <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto pr-1 flex-1">
                        {/* Champs d'identification du rôle */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Libellé du rôle"
                                required
                                placeholder="ex: Médecin Urgentiste Référent"
                                value={libelle}
                                onChange={handleLibelleChange}
                                error={errors.libelle}
                                disabled={isReadOnly}
                            />

                            <Input
                                label="Code technique"
                                required={!isEditMode}
                                placeholder="ex: ROLE_URG_REF"
                                value={code}
                                onChange={handleCodeChange}
                                onKeyDown={handleCodeKeyDown}
                                error={errors.code}
                                disabled={isEditMode}
                                rightAction={
                                    !isEditMode && isCodeManuallyEdited && libelle.trim() ? (
                                        <button
                                            type="button"
                                            onClick={handleResetAutoCode}
                                            className="text-[11px] text-primary hover:text-primary-hover flex items-center gap-1 font-medium transition-colors cursor-pointer"
                                            title="Regénérer automatiquement à partir du libellé"
                                        >
                                            <Sparkles size={12} />
                                            <span>Auto</span>
                                        </button>
                                    ) : undefined
                                }
                                helperText={
                                    isEditMode
                                        ? 'Le code technique ne peut pas être modifié après création'
                                        : isCodeManuallyEdited
                                          ? 'Format automatique : majuscules, _ inséré après ROLE'
                                          : 'Généré automatiquement par convention à partir du libellé'
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-surface-text mb-1.5">
                                Description des responsabilités
                            </label>
                            <textarea
                                rows={2}
                                placeholder="Précisez le périmètre d'action de ce rôle au sein de l'établissement hospitalier..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={isReadOnly}
                                className="w-full text-xs bg-page rounded-xl p-3 text-surface-text placeholder:text-muted/60 border border-border/8 focus:border-border/12 focus:ring-2 focus:ring-primary/10 focus:outline-none transition-all resize-none disabled:opacity-60"
                            />
                        </div>

                        {/* Matrice des permissions */}
                        <RolePermissionsMatrix
                            allPermissions={allPermissions}
                            selectedPermissionIds={selectedPermissions}
                            onChange={setSelectedPermissions}
                            readOnly={isReadOnly}
                        />

                        {/* Boutons d'action */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/8 shrink-0">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onClose}
                                disabled={isPending}
                            >
                                {isReadOnly ? 'Fermer' : 'Annuler'}
                            </Button>

                            {!isReadOnly && (
                                <Button
                                    type="submit"
                                    variant="primary"
                                    icon={isEditMode ? Save : Plus}
                                    isLoading={isPending}
                                >
                                    {isEditMode ? 'Enregistrer les modifications' : 'Créer le rôle'}
                                </Button>
                            )}
                        </div>
                    </form>
                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>
    );
}

export default RoleFormModal;
