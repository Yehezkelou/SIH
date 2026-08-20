"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Menu, 
  Settings, 
  LogOut, 
  User, 
  Bell, 
  Search,
  ShieldCheck 
} from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
  onBack?: () => void;
  userName?: string;
  userRole?: string;
}

export const Header = ({
  onToggleSidebar,
  onBack = () => window.history.back(),
  userName = "SERGE IBAKA",
  userRole = "Infirmier Major",
}: HeaderProps) => {
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <header className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 text-white h-14 flex items-center justify-between px-4 shadow-md border-b border-emerald-600/40 shrink-0 select-none">
      
      {/* 1. Actions de Navigation & Recherche Rapide */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-emerald-900/40 p-1 rounded-lg border border-emerald-600/30">
          <button 
            onClick={onToggleSidebar}
            title="Menu principal"
            className="p-1.5 hover:bg-emerald-600/50 active:bg-emerald-600 rounded-md transition-all duration-150 cursor-pointer text-emerald-100 hover:text-white"
          >
            <Menu className="w-4 h-4" />
          </button>
          <button 
            onClick={onBack}
            title="Retour à la page précédente"
            className="p-1.5 hover:bg-emerald-600/50 active:bg-emerald-600 rounded-md transition-all duration-150 cursor-pointer text-emerald-100 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Indication visuelle de statut système */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-emerald-950/40 rounded-full border border-emerald-500/30 text-[11px] text-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium tracking-wide">Système Connecté</span>
        </div>
      </div>

      {/* 2. Profil Utilisateur & Rôle */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 bg-emerald-950/50 hover:bg-emerald-950/70 px-3 py-1.5 rounded-full border border-emerald-500/40 transition-all duration-200 cursor-pointer shadow-inner group">
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
              <User className="w-4 h-4" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-emerald-800 rounded-full" />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold tracking-wide uppercase text-white leading-tight">
                {userName}
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            </div>
            <span className="text-[10px] text-emerald-200/80 font-medium leading-none">
              {userRole}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Actions Rapides & Centre d'Alertes */}
      <div className="flex items-center gap-1.5">
        {/* Bouton Notification */}
        <button 
          onClick={() => setHasNotifications(false)}
          title="Notifications"
          className="relative p-2 hover:bg-emerald-600/50 active:bg-emerald-600 rounded-lg transition-all duration-150 cursor-pointer text-emerald-100 hover:text-white"
        >
          <Bell className="w-4 h-4" />
          {hasNotifications && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-emerald-800 animate-bounce" />
          )}
        </button>

        {/* Bouton Paramètres */}
        <button 
          title="Paramètres de session"
          className="p-2 hover:bg-emerald-600/50 active:bg-emerald-600 rounded-lg transition-all duration-150 cursor-pointer text-emerald-100 hover:text-white"
        >
          <Settings className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-emerald-600/50 mx-1" />

        {/* Bouton Déconnexion */}
        <button 
          title="Se déconnecter"
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-600 text-rose-200 hover:text-white rounded-lg transition-all duration-150 text-xs font-semibold cursor-pointer border border-rose-500/20 hover:border-rose-600 shadow-xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Quitter</span>
        </button>
      </div>

    </header>
  );
};