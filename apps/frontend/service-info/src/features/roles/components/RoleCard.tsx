'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Shield,
    Lock,
    Users,
    KeyRound,
    Edit3,
    Trash2,
    CheckCircle2,
} from 'lucide-react';
import { Role } from '../schema';
import { groupPermissionsByDomain } from '../utils/rbacHelpers';

interface RoleCardProps {
    role: Role;
    onEdit: (role: Role) => void;
    onDelete: (role: Role) => void;
    /** Droit `role:UPDATE` : sans lui, la modale s'ouvre en consultation. */
    canUpdate?: boolean;
    /** Droit `role:DELETE` : sans lui, la corbeille n'est pas proposée. */
    canDelete?: boolean;
}

export function RoleCard({
    role,
    onEdit,
    onDelete,
    canUpdate = false,
    canDelete = false,
}: RoleCardProps) {
    // Un rôle système reste consultable, jamais modifiable — le serveur le
    // refuserait de toute façon.
    const isEditable = canUpdate && !role.isSystem;
    const isDeletable = canDelete && !role.isSystem;

    const permissions = role.rolePermissions?.map((rp) => rp.permission).filter(Boolean) as any[] || [];
    const domainGroups = groupPermissionsByDomain(permissions);
    const agentCount = role.userRoles?.length || 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-surface border border-border/8 hover:border-border/12 rounded-2xl p-5 shadow-xs flex flex-col justify-between gap-4 transition-all"
        >
            {/* Haut de la carte : En-tête et Badges */}
            <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                        <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                role.isSystem
                                    ? 'bg-warning/10 text-warning-text'
                                    : 'bg-primary/10 text-primary'
                            }`}
                        >
                            {role.isSystem ? <Lock size={18} /> : <Shield size={18} />}
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-surface-text leading-tight">
                                {role.libelle}
                            </h3>
                            <span className="font-mono text-[10px] text-muted tracking-wide uppercase">
                                {role.code}
                            </span>
                        </div>
                    </div>

                    {/* Badge Système ou Personnalisé */}
                    {role.isSystem ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-warning/10 text-warning-text border border-warning/20 shrink-0">
                            <Lock size={10} />
                            Système
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 shrink-0">
                            Personnalisé
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-xs text-muted line-clamp-2 min-h-[32px] leading-relaxed">
                    {role.description || 'Aucune description renseignée pour ce profil d’accès.'}
                </p>

                {/* Statistiques clés : Agents & Permissions */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/8">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-page text-xs">
                        <Users size={14} className="text-info shrink-0" />
                        <div>
                            <span className="font-bold text-surface-text">{agentCount}</span>{' '}
                            <span className="text-[11px] text-muted">
                                {agentCount > 1 ? 'soignants' : 'soignant'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-page text-xs">
                        <KeyRound size={14} className="text-success shrink-0" />
                        <div>
                            <span className="font-bold text-surface-text">{permissions.length}</span>{' '}
                            <span className="text-[11px] text-muted">
                                {permissions.length > 1 ? 'droits' : 'droit'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Pôles couverts */}
                <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
                        Pôles hospitaliers autorisés ({domainGroups.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                        {domainGroups.length === 0 ? (
                            <span className="text-[11px] text-muted italic">Aucun droit configuré</span>
                        ) : (
                            domainGroups.slice(0, 4).map((group) => (
                                <span
                                    key={group.domainKey}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-medium bg-hover/6 text-surface-text border border-border/8"
                                >
                                    <CheckCircle2 size={10} className="text-success" />
                                    {group.label}
                                </span>
                            ))
                        )}
                        {domainGroups.length > 4 && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-lg text-[10px] font-semibold bg-hover/6 text-muted">
                                +{domainGroups.length - 4} autres
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Bas de carte : Actions */}
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/8">
                <button
                    type="button"
                    onClick={() => onEdit(role)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-hover/6 hover:bg-hover/12 text-surface-text transition-colors cursor-pointer"
                >
                    <Edit3 size={13} />
                    <span>{isEditable ? 'Modifier' : 'Consulter les droits'}</span>
                </button>

                {isDeletable && (
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onDelete(role)}
                        className="p-2 rounded-xl text-muted hover:text-danger hover:bg-danger/10 transition-colors cursor-pointer shrink-0"
                        title="Supprimer ce rôle"
                    >
                        <Trash2 size={15} />
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}

export default RoleCard;
