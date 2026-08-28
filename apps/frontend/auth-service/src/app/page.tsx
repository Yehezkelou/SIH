'use client';

import React from "react";
import { useMe } from "@/features/me/hooks/UseMe";
import { useLogout } from "@/features/me/hooks/useLogout";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
    const { data, isLoading, error } = useMe();
    const { mutate: logout, isPending: isLoggingOut } = useLogout();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-500 font-medium">Chargement de votre session...</p>
                </div>
            </div>
        );
    }

    if (error || !data?.user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md border border-red-100 text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Session expirée</h2>
                    <p className="text-gray-600 mb-6">Impossible de charger votre session de profil.</p>
                    <Button onClick={() => logout()}>Retourner à la connexion</Button>
                </div>
            </div>
        );
    }

    const { user } = data;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex flex-col items-center text-center space-y-4">
                    {/* Avatar avec initiales */}
                    <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold uppercase shadow-inner">
                        {user.prenom[0]}{user.nom[0]}
                    </div>
                    
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Bonjour, {user.prenom} {user.nom} 👋
                        </h1>
                    </div>

                    {/* Informations détaillées */}
                    <div className="w-full border-t border-gray-100 my-4 pt-4 text-left space-y-2 text-sm text-gray-600">
                        <div>
                            <span className="font-semibold text-gray-700">Matricule :</span> {user.matricule}
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Fonction :</span> {user.personnelType}
                        </div>
                        {user.serviceAffectation && (
                            <div>
                                <span className="font-semibold text-gray-700">Service :</span> {user.serviceAffectation}
                            </div>
                        )}
                        <div>
                            <span className="font-semibold text-gray-700">Rôles :</span> {user.roles.join(', ')}
                        </div>
                    </div>

                    <Button 
                        onClick={() => logout()} 
                        isLoading={isLoggingOut}
                        className="w-full bg-red-600 hover:bg-red-700 focus:ring-red-500 mt-6"
                    >
                        Se déconnecter
                    </Button>
                </div>
            </div>
        </div>
    );
}
