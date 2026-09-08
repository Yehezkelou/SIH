import { Menu } from "lucide-react";
import React from "react";
import { User } from "./User/User";

interface TopBarProps {
    onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
    return (
        <div className="flex items-center gap-3 px-4 py-2 select-none">
            {/* Menu profil utilisateur autonome */}
            <User />

            {/* Bouton pour ouvrir la barre latérale des modules */}
            <button
                onClick={onMenuClick}
                className="p-2 rounded-full bg-surface/80 backdrop-blur-md border border-border/8 text-surface-text hover:text-primary hover:bg-surface shadow-xs hover:shadow-md transition-all cursor-pointer"
                title="Tous les modules"
                aria-label="Ouvrir le menu des modules"
            >
                <Menu size={18} />
            </button>
        </div>
    );
}


