'use client';

import React, { useState, useMemo } from 'react';
import {
    Shield,
    ShieldCheck,
    Lock,
    KeyRound,
    Plus,
    RefreshCw,
    Search,
    Layers,
} from 'lucide-react';
import { useGetRoles, useGetPermissions } from '@/features/roles/hooks/useRoles';
import { Role } from '@/features/roles/schema';
import { RoleCard } from '@/features/roles/components/RoleCard';
import { RoleFormModal } from '@/features/roles/components/RoleFormModal';
import { RoleDeleteModal } from '@/features/roles/components/RoleDeleteModal';
import { RoleStateCard } from '@/features/roles/components/RoleStateCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FormAlert } from '@/components/ui/FormAlert';
import { usePermissions } from '@/hooks/usePermissions';

export default function RolesPage() {
    // 1. Récupération des données via TanStack Query
    const {
        data: rolesResponse,
        isLoading: isLoadingRoles,
        isError: isErrorRoles,
        error: errorRoles,
        refetch: refetchRoles,
        isFetching: isFetchingRoles,
    } = useGetRoles();

    // Les permissions se chargent via un endpoint distinct, protégé par une
    // autre permission : son échec doit être visible, sinon la matrice
    // s'affiche vide et laisse croire que le système n'en déclare aucune.
    const {
        data: permissionsResponse,
        isError: isErrorPermissions,
        refetch: refetchPermissions,
    } = useGetPermissions();

    const { can } = usePermissions();
    const canCreateRole = can('role:CREATE');
    const canUpdateRole = can('role:UPDATE');
    const canDeleteRole = can('role:DELETE');

    const roles = rolesResponse?.data || [];
    const allPermissions = permissionsResponse?.data || [];

    // 2. Filtres & recherche
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState<'ALL' | 'SYSTEM' | 'CUSTOM'>('ALL');

    // 3. Modales
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [deletingRole, setDeletingRole] = useState<Role | null>(null);

    // 4. Filtrage dynamique
    const filteredRoles = useMemo(() => {
        return roles.filter((role) => {
            const query = search.toLowerCase().trim();
            const matchesSearch =
                !query ||
                role.libelle.toLowerCase().includes(query) ||
                role.code.toLowerCase().includes(query) ||
                (role.description && role.description.toLowerCase().includes(query));

            if (!matchesSearch) return false;

            if (filterType === 'SYSTEM') return role.isSystem;
            if (filterType === 'CUSTOM') return !role.isSystem;
            return true;
        });
    }, [roles, search, filterType]);

    // 5. Métriques
    const systemCount = roles.filter((r) => r.isSystem).length;
    const customCount = roles.filter((r) => !r.isSystem).length;
    const totalAgentsWithRoles = roles.reduce(
        (sum, r) => sum + (r.userRoles?.length || 0),
        0
    );

    const handleCreateNew = () => {
        setEditingRole(null);
        setIsFormModalOpen(true);
    };

    const handleEditRole = (role: Role) => {
        setEditingRole(role);
        setIsFormModalOpen(true);
    };

    const handleDeleteRole = (role: Role) => {
        setDeletingRole(role);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            {/* En-tête de la page */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-border/8 shrink-0">
                        <ShieldCheck size={22} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-surface-text">
                            Gouvernance RBAC & Habilitations
                        </h1>
                        <p className="text-xs text-muted">
                            Profils de rôles, matrice de permissions et privilèges d'accès hospitaliers
                        </p>
                    </div>
                </div>

                {/* Actions globales */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            refetchRoles();
                            refetchPermissions();
                        }}
                        disabled={isFetchingRoles}
                        title="Actualiser les rôles et les permissions"
                        className="p-2.5 rounded-xl border border-border/8 bg-surface hover:bg-hover/6 text-muted hover:text-surface-text transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <RefreshCw size={15} className={isFetchingRoles ? 'animate-spin' : ''} />
                    </button>

                    {canCreateRole && (
                        <Button
                            type="button"
                            variant="primary"
                            icon={Plus}
                            onClick={handleCreateNew}
                        >
                            Nouveau rôle
                        </Button>
                    )}
                </div>
            </div>

            {/* L'échec du chargement des permissions doit être dit : sans lui,
                la matrice s'affiche vide sans la moindre explication. */}
            {isErrorPermissions && (
                <FormAlert
                    variant="warning"
                    title="Catalogue des permissions indisponible"
                    message="Les rôles s'affichent, mais la liste des permissions n'a pas pu être chargée (droit « role:READ » requis). La matrice d'habilitations restera vide tant que ce chargement échoue : utilisez le bouton d'actualisation pour réessayer."
                />
            )}

            {/* Indicateurs RBAC compacts */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <div
                    className="bg-surface border border-border/8 rounded-xl px-3 py-2 flex items-center gap-2.5 shadow-2xs"
                    title={`${roles.length} rôles enregistrés (${totalAgentsWithRoles} attributions actives)`}
                >
                    <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Layers size={14} />
                    </div>
                    <div className="min-w-0 leading-tight">
                        <span className="text-[11px] text-muted block truncate font-medium">Total Rôles</span>
                        <span className="text-sm font-bold text-surface-text">{roles.length}</span>
                    </div>
                </div>

                <div className="bg-surface border border-border/8 rounded-xl px-3 py-2 flex items-center gap-2.5 shadow-2xs">
                    <div className="w-7 h-7 rounded-lg bg-warning/10 text-warning-text flex items-center justify-center shrink-0">
                        <Lock size={14} />
                    </div>
                    <div className="min-w-0 leading-tight">
                        <span className="text-[11px] text-muted block truncate font-medium">Rôles Système</span>
                        <span className="text-sm font-bold text-surface-text">{systemCount}</span>
                    </div>
                </div>

                <div className="bg-surface border border-border/8 rounded-xl px-3 py-2 flex items-center gap-2.5 shadow-2xs">
                    <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                        <Shield size={14} />
                    </div>
                    <div className="min-w-0 leading-tight">
                        <span className="text-[11px] text-muted block truncate font-medium">Personnalisés</span>
                        <span className="text-sm font-bold text-surface-text">{customCount}</span>
                    </div>
                </div>

                <div className="bg-surface border border-border/8 rounded-xl px-3 py-2 flex items-center gap-2.5 shadow-2xs">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                        <KeyRound size={14} />
                    </div>
                    <div className="min-w-0 leading-tight">
                        <span className="text-[11px] text-muted block truncate font-medium">Permissions</span>
                        <span className="text-sm font-bold text-surface-text">{allPermissions.length}</span>
                    </div>
                </div>
            </div>

            {/* Barre de recherche et filtres */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-surface border border-border/8 rounded-2xl shadow-xs">
                <div className="w-full sm:max-w-md">
                    <Input
                        placeholder="Rechercher par libellé ou code (ex: ROLE_MEDECIN)..."
                        icon={Search}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-1.5 w-full sm:w-auto self-end">
                    {(
                        [
                            { key: 'ALL', label: 'Tous' },
                            { key: 'SYSTEM', label: 'Système' },
                            { key: 'CUSTOM', label: 'Personnalisés' },
                        ] as const
                    ).map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setFilterType(tab.key)}
                            className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                                filterType === tab.key
                                    ? 'bg-primary text-primary-text font-semibold'
                                    : 'bg-page text-muted hover:text-surface-text border border-border/8'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Affichage des rôles */}
            {isLoadingRoles ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="h-56 rounded-2xl bg-surface border border-border/8 animate-pulse p-5 space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-hover/6" />
                                <div className="space-y-1.5 flex-1">
                                    <div className="h-4 bg-hover/6 rounded w-3/4" />
                                    <div className="h-3 bg-hover/6 rounded w-1/2" />
                                </div>
                            </div>
                            <div className="h-10 bg-hover/6 rounded-xl" />
                            <div className="h-12 bg-hover/6 rounded-xl" />
                        </div>
                    ))}
                </div>
            ) : isErrorRoles ? (
                <RoleStateCard
                    variant="error"
                    title="Impossible de charger les rôles"
                    description={
                        errorRoles instanceof Error
                            ? errorRoles.message
                            : 'Une erreur est survenue lors de la communication avec le service d’authentification.'
                    }
                    onAction={() => refetchRoles()}
                    actionLabel="Réessayer"
                />
            ) : filteredRoles.length === 0 ? (
                <RoleStateCard
                    variant="empty"
                    title="Aucun profil de rôle trouvé"
                    description={
                        search
                            ? `Aucun résultat pour "${search}". Essayez de modifier votre recherche.`
                            : 'Aucun rôle ne correspond à ce filtre.'
                    }
                    onAction={
                        search ? () => setSearch('') : canCreateRole ? handleCreateNew : undefined
                    }
                    actionLabel={
                        search
                            ? 'Effacer la recherche'
                            : canCreateRole
                              ? 'Créer un premier rôle'
                              : undefined
                    }
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRoles.map((role) => (
                        <RoleCard
                            key={role.id}
                            role={role}
                            onEdit={handleEditRole}
                            onDelete={handleDeleteRole}
                            canUpdate={canUpdateRole}
                            canDelete={canDeleteRole}
                        />
                    ))}
                </div>
            )}

            {/* Modale de création / édition */}
            <RoleFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                editingRole={editingRole}
                allPermissions={allPermissions}
                canSubmit={editingRole ? canUpdateRole : canCreateRole}
            />

            {/* Modale de confirmation de suppression */}
            <RoleDeleteModal
                role={deletingRole}
                isOpen={Boolean(deletingRole)}
                onClose={() => setDeletingRole(null)}
            />
        </div>
    );
}
