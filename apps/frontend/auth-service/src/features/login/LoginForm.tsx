'use client'

import React, { useState } from "react";
import { useLogin} from "./hooks/useLogin";
import { Alert } from "@/components/ui/Alert";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function LoginForm(){

    const {mutate: login, isPending, error} = useLogin()
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e : any) => {
        e.preventDefault();
        if(!identifier || !password) return;
        login({ identifier, password });
    }

    // recupere les message d'erreur de maniere robuste (pour eviter de passer un objet a React)
    let errorMessage: string | null = null;
    if (error) {
        const errorData = (error as any).response?.data;
        if (errorData) {
            if (typeof errorData.message === "string") {
                errorMessage = errorData.message;
            } else if (errorData.message && typeof errorData.message.message === "string") {
                errorMessage = errorData.message.message;
            } else if (errorData.message && Array.isArray(errorData.message.message)) {
                errorMessage = errorData.message.message.join(", ");
            } else if (Array.isArray(errorData.message)) {
                errorMessage = errorData.message.join(", ");
            } else {
                errorMessage = "Erreur de connexion";
            }
        } else {
            errorMessage = error.message || "Une erreur est survenue";
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Formulaire de connexion</h2>
            {errorMessage && <Alert type="error" message={errorMessage} />}
            <div>
                <Label htmlFor="identifier" >
                    Identiant (Email ou matricule)
                </Label>
                <Input 
                    id="identifier"
                    type="text"
                    placeholder="ex: M12345 ou email@sih.fr"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                />
            </div>

            <div>
                <Label htmlFor="password" > Mot de passe </Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <Button type="submit" isLoading={isPending} className="mt-6">
                Se connecter
            </Button>
        </form>
    )
}