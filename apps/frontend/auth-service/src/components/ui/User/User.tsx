'use client';

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LogOut, 
    ShieldCheck, 
    ChevronDown, 
    Mail, 
    Briefcase, 
    Hash 
} from "lucide-react";
import { useLogout } from "@/features/me/hooks/useLogout";
import { useMe } from "@/features/me/hooks/UseMe";
import { MfaSetupModal } from "@/features/mfa/components/MfaSetupModal";
import { MfaDisableModal } from "@/features/mfa/components/MfaDisableModal";

interface UserMenuProps {
    name?: string;
    role?: string;
}

export function User({ name: propName, role: propRole }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMfaSetupOpen, setIsMfaSetupOpen] = useState(false);
    const [isMfaDisableOpen, setIsMfaDisableOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const logout = useLogout();
    const { data: meData } = useMe();

    const user = meData?.user;
    const displayName = user ? `${user.prenom || ''} ${user.nom || ''}`.trim() : propName || "Utilisateur";
    const displayRole = user?.personnelType || propRole || "Personnel";
    const initials = user 
        ? `${user.prenom?.[0] || ''}${user.nom?.[0] || ''}`.toUpperCase() || "U"
        : (displayName?.[0] || "U").toUpperCase();

    // Fermeture lors d'un clic extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    const handleLogout = (e: React.MouseEvent) => {
        e.stopPropagation();
        logout.mutate();
    };

    return (
        <div className="relative" ref={containerRef}>
            {/* Bouton déclencheur dans la TopBar */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface/80 backdrop-blur-md border border-border/8 hover:border-primary/50 shadow-xs hover:shadow-md transition-all cursor-pointer select-none"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {/* Avatar rond avec initiales */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center text-primary-text text-xs font-bold shadow-xs">
                    {initials}
                </div>

                <span className="text-xs font-semibold text-surface-text max-w-[120px] truncate">
                    {user?.nom || propName || "Profil"}
                </span>

                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-muted"
                >
                    <ChevronDown size={14} />
                </motion.div>
            </motion.button>

            {/* Menu Popover Déroulant */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute right-0 top-11 w-72 p-4 bg-surface/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/8 z-50 text-left flex flex-col gap-3"
                    >
                        {/* En-tête profil */}
                        <div className="flex items-center gap-3 pb-3 border-b border-border/8">
                            <div className="relative">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center text-primary-text text-sm font-bold shadow-sm">
                                    {initials}
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success border-2 border-surface rounded-full" title="Connecté" />
                            </div>

                            <div className="flex flex-col min-w-0 flex-1">
                                <span className="text-sm font-bold text-surface-text truncate">
                                    {displayName}
                                </span>
                                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                                        {displayRole}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Coordonnées et détails de l'agent */}
                        <div className="flex flex-col gap-2 text-xs text-surface-text">
                            {user?.matricule && (
                                <div className="flex items-center gap-2 text-muted">
                                    <Hash size={13} className="text-primary shrink-0" />
                                    <span className="font-mono text-[11px] text-surface-text">
                                        {user.matricule}
                                    </span>
                                </div>
                            )}

                            {user?.email && (
                                <div className="flex items-center gap-2 truncate text-muted">
                                    <Mail size={13} className="text-primary shrink-0" />
                                    <span className="truncate text-[11px] text-surface-text">
                                        {user.email}
                                    </span>
                                </div>
                            )}

                            {user?.serviceAffectation && (
                                <div className="flex items-center gap-2 text-muted">
                                    <Briefcase size={13} className="text-primary shrink-0" />
                                    <span className="text-[11px] text-surface-text">
                                        {user.serviceAffectation}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Configuration Sécurité & MFA */}
                        <div className="pt-2 border-t border-border/8">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    if (user?.mfaEnabled) {
                                        setIsMfaDisableOpen(true);
                                    } else {
                                        setIsMfaSetupOpen(true);
                                    }
                                }}
                                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-surface-text hover:bg-hover/6 transition-colors cursor-pointer"
                            >
                                <span className="flex items-center gap-2">
                                    <ShieldCheck size={14} className={user?.mfaEnabled ? "text-success" : "text-primary"} />
                                    Double authentification
                                </span>
                                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                    user?.mfaEnabled 
                                        ? "bg-success/15 text-success" 
                                        : "bg-hover/6 text-muted"
                                }`}>
                                    {user?.mfaEnabled ? "Actif" : "Inactif"}
                                </span>
                            </button>
                        </div>

                        {/* Bouton de Déconnexion */}
                        <button
                            onClick={handleLogout}
                            disabled={logout.isPending}
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-danger/10 text-danger-text border border-danger/20 hover:bg-danger/20 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                        >
                            {logout.isPending ? (
                                <>
                                    <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    <span>Déconnexion en cours...</span>
                                </>
                            ) : (
                                <>
                                    <LogOut size={14} />
                                    <span>Déconnexion</span>
                                </>
                            )}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modales de configuration et de désactivation du MFA */}
            <MfaSetupModal
                isOpen={isMfaSetupOpen}
                onClose={() => setIsMfaSetupOpen(false)}
            />
            <MfaDisableModal
                isOpen={isMfaDisableOpen}
                onClose={() => setIsMfaDisableOpen(false)}
            />
        </div>
    );
}