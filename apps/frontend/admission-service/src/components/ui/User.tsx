'use client'
import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { LogOut, ChevronDown, Shield, Mail, Hash } from "lucide-react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";

export function User() {
    const { data: user, isLoading } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Fermer le menu au clic à l'extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleLogout = () => {
        // Supprimer les cookies de session partagés
        Cookies.remove("auth-token-cookie");
        Cookies.remove("auth-refresh-cookie");

        // Rediriger vers l'application auth pour se reconnecter
        window.location.href = process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3000/login";
    };

    if (isLoading) {
        return (
            <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-hover/6 animate-pulse" />
                <div className="hidden md:flex flex-col gap-1">
                    <div className="w-20 h-3 bg-hover/6 rounded-sm animate-pulse" />
                    <div className="w-12 h-2 bg-hover/6 rounded-sm animate-pulse" />
                </div>
            </div>
        );
    }
    
    if (!user) {
        return (
            <a
                href={process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3000/login"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary
                text-primary-text text-xs font-semibold hover:opacity-90 transition-opacity"
            >
                <LogOut size={14} />
                <span>Connexion</span>
            </a>
        );
    }

    const initials = `${user.prenom?.[0] || ""}${user.nom?.[0] || ""}`.toUpperCase() || "U";

    return (
        <div className="relative" ref={menuRef}>
            {/* Bouton déclencheur profil */}
            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-hover/6 
                text-surface-text transition-colors cursor-pointer border border-transparent 
                hover:border-border/8"
            >
                <div className="w-9 h-9 rounded-full bg-primary text-primary-text 
                flex items-center justify-center font-bold text-xs shadow-xs">
                    {initials}
                </div>
                <div className="hidden md:flex flex-col text-left leading-tight">
                    <span className="text-xs font-semibold">{user.prenom} {user.nom}</span>
                    <span className="text-[10px] text-muted font-medium">
                        {user.personnelType || user.roles?.[0] || "Agent"}
                    </span>
                </div>
                <ChevronDown 
                    size={14} 
                    className={`text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
                />
            </motion.button>

            {/* Menu déroulant */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-64 p-3 rounded-2xl bg-surface border border-border/8 
                        shadow-xl z-50 flex flex-col gap-2 backdrop-blur-sm"
                    >
                        {/* En-tête profil */}
                        <div className="flex items-center gap-3 p-2 rounded-xl bg-hover/4">
                            <div className="w-10 h-10 rounded-full bg-primary text-primary-text 
                            flex items-center justify-center font-bold text-sm flex-shrink-0">
                                {initials}
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-xs font-bold truncate">
                                    {user.prenom} {user.nom}
                                </span>
                                <span className="text-[11px] text-muted truncate flex items-center gap-1">
                                    <Mail size={11} /> {user.email}
                                </span>
                            </div>
                        </div>

                        {/* Informations supplémentaires */}
                        <div className="flex flex-col gap-1.5 px-2 py-1 text-[11px] text-muted border-y border-border/8 my-1">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1.5"><Hash size={12} /> Matricule</span>
                                <span className="font-semibold text-surface-text">{user.matricule}</span>
                            </div>
                            {user.serviceAffectation && (
                                <div className="flex items-center justify-between">
                                    <span>Service</span>
                                    <span className="font-semibold text-surface-text">{user.serviceAffectation}</span>
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1.5"><Shield size={12} /> Rôle</span>
                                <span className="font-semibold text-surface-text">{user.personnelType}</span>
                            </div>
                        </div>

                        {/* Bouton de déconnexion */}
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleLogout}
                            className="flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-danger-text hover:bg-danger/10 transition-colors cursor-pointer w-full text-left"
                        >
                            <LogOut size={14} />
                            <span>Se déconnecter</span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}