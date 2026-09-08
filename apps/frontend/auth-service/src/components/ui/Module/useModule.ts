'use client';

import { useState, useEffect } from "react";
import { Receipt, Monitor, BedDouble, FlaskConical } from "lucide-react";

const STORAGE_KEY = "sih_recent_modules";
const MAX_RECENT = 3;

// Gestion globale partagée pour synchroniser tous les composants en temps réel.
// Volontairement vide au chargement du module : voir le commentaire dans
// UseModule sur l'hydratation.
let globalRecentModules: string[] = [];
let hasLoadedFromStorage = false;

const listeners = new Set<(modules: string[]) => void>();

/** Lecture défensive : stockage indisponible, quota, ou JSON corrompu. */
function readStoredModules(): string[] {
    if (typeof window === "undefined") return [];
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return [];
        const parsed: unknown = JSON.parse(saved);
        return Array.isArray(parsed)
            ? parsed.filter((key): key is string => typeof key === "string")
            : [];
    } catch {
        return [];
    }
}

/** Diffuse l'état aux abonnés, sans toucher au stockage. */
function broadcast(newRecent: string[]) {
    globalRecentModules = newRecent;
    listeners.forEach((listener) => listener(newRecent));
}

function updateGlobalRecent(newRecent: string[]) {
    broadcast(newRecent);
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecent));
    } catch {
        // Stockage refusé (navigation privée, quota) : l'état reste en mémoire
        // pour la session, ce qui est une dégradation acceptable.
    }
}

export function UseModule() {
    // Le premier rendu client doit reproduire exactement le HTML du serveur, où
    // `localStorage` n'existe pas. On part donc de l'état en mémoire — vide au
    // tout premier montage — et le stockage n'est lu qu'après l'hydratation.
    //
    // Lire `localStorage` au chargement du module remplissait cet état avant
    // même que React n'hydrate : la liste « Récents » apparaissait au premier
    // rendu client alors que le serveur ne l'avait pas produite, d'où l'erreur
    // d'hydratation sur app/page.tsx.
    const [recentModules, setRecentModules] = useState<string[]>(globalRecentModules);

    useEffect(() => {
        const listener = (updated: string[]) => setRecentModules(updated);
        listeners.add(listener);

        // Une seule lecture du stockage pour toute l'application, au premier
        // montage : les composants suivants reçoivent l'état par diffusion.
        if (!hasLoadedFromStorage) {
            hasLoadedFromStorage = true;
            const stored = readStoredModules();
            if (stored.length > 0) broadcast(stored);
        }

        // Recalage si l'état global a bougé entre le rendu et l'abonnement.
        setRecentModules(globalRecentModules);

        return () => {
            listeners.delete(listener);
        };
    }, []);

    // Couleurs d'identité des modules : une teinte par module, volontairement
    // distincte de l'accent applicatif. Elles suivent la convention du système
    // (fond en /10, texte en -600 clair / -400 sombre).
    const Module = {
        BAFS: {
            title: "BAFS",
            description: "Dossiers patients & Admissions",
            icon: Receipt,
            url: "http://localhost:3004",
            color: "emerald",
            iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white",
        },
        INF: {
            title: "Informatique",
            description: "Support IT, RH & Permissions",
            icon: Monitor,
            url: "http://localhost:3001",
            color: "blue",
            iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white",
        },
        HOS: {
            title: "Hospitalisation",
            description: "Gestion des séjours & Lits",
            icon: BedDouble,
            url: "http://localhost:3002",
            color: "purple",
            iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white",
        },
        LABO: {
            title: "Laboratoire",
            description: "Analyses & Examens médicaux",
            icon: FlaskConical,
            url: "#",
            color: "amber",
            iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white",
        },
    };

    const handleModuleClick = (moduleKey: string) => {
        const filtered = globalRecentModules.filter((key) => key !== moduleKey);
        const updated = [moduleKey, ...filtered].slice(0, MAX_RECENT);
        updateGlobalRecent(updated);
    };

    
    return {
        Module,
        recentModules,
        handleModuleClick,
    };
}