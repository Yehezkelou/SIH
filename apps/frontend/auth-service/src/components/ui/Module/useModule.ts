'use client';

import { useState, useEffect } from "react";
import { Receipt, Monitor, BedDouble, FlaskConical } from "lucide-react";

// Gestion globale partagée pour synchroniser tous les composants en temps réel
let globalRecentModules: string[] = [];

const listeners = new Set<(modules: string[]) => void>();

if (typeof window !== "undefined") {
    try {
        const saved = localStorage.getItem("sih_recent_modules");
        if (saved) {
            globalRecentModules = JSON.parse(saved);
        }
    } catch (e) {
        console.error("Erreur lecture localStorage:", e);
    }
}

function updateGlobalRecent(newRecent: string[]) {
    globalRecentModules = newRecent;
    if (typeof window !== "undefined") {
        try {
            localStorage.setItem("sih_recent_modules", JSON.stringify(newRecent));
        } catch (e) {
            console.error("Erreur écriture localStorage:", e);
        }
    }
    listeners.forEach((listener) => listener(newRecent));
}

export function UseModule() {
    const [recentModules, setRecentModules] = useState<string[]>(globalRecentModules);

    useEffect(() => {
        const listener = (updated: string[]) => setRecentModules(updated);
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    }, []);

    const Module = {
        BAFS: {
            title: "BAFS",
            description: "Bureau d'Accueil, Facturation & Sorties",
            icon: Receipt,
            url: ""
        },
        INF: {
            title: "Informatique",
            description: "Systèmes d'information & Support IT",
            icon: Monitor,
            url : "http://localhost:3001"
        },
        HOS: {
            title: "Hospitalisation",
            description: "Gestion des séjours & Lits d'admission",
            icon: BedDouble,
            url : ""
        },
        LABO: {
            title: "Laboratoire",
            description: "Analyses biologiques & Examens",
            icon: FlaskConical,
            url : ""
        },
    };

    const handleModuleClick = (moduleKey: string) => {
        const filtered = globalRecentModules.filter((key) => key !== moduleKey);
        const updated = [moduleKey, ...filtered].slice(0, 3);
        updateGlobalRecent(updated);
    };

    
    return {
        Module,
        recentModules,
        handleModuleClick,
    };
}