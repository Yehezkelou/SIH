'use client';

import { useUser } from './useUser';

/**
 * Droits de l'utilisateur courant, côté interface.
 *
 * La logique reproduit volontairement celle de `PermissionGuard` côté serveur
 * (shared/guards/permissions.guard.ts) : le rôle SUPER_ADMIN et la permission
 * joker `*` court-circuitent la vérification. Toute divergence entre les deux
 * se traduirait par un bouton qui promet une action que l'API refusera.
 *
 * Ce hook masque des actions, il ne les protège pas : le serveur reste la seule
 * autorité.
 */
export const usePermissions = () => {
    const { data: user, isLoading } = useUser();

    const isSuperAdmin =
        user?.roles?.includes('SUPER_ADMIN') || user?.permissions?.includes('*') || false;

    /** `true` si l'utilisateur détient la permission (ex. `role:CREATE`). */
    const can = (permission: string): boolean => {
        if (isSuperAdmin) return true;
        return user?.permissions?.includes(permission) ?? false;
    };

    /** `true` si l'utilisateur détient toutes les permissions demandées. */
    const canAll = (...permissions: string[]): boolean => permissions.every(can);

    return {
        can,
        canAll,
        isSuperAdmin,
        /** Le temps du chargement, `can` répond `false` : on n'affiche rien qu'on devra retirer. */
        isLoadingPermissions: isLoading,
    };
};
