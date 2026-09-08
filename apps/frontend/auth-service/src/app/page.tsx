'use client';

import { SearchBar } from "@/components/ui/SearchBar";
import { Time } from "@/components/ui/Time";
import { TopBar } from "@/components/ui/TopBar";
import { BottomBar } from "@/components/ui/BottomBar";
import { SideBar } from "@/components/ui/SideBar";
import { UseModule } from "@/components/ui/Module/useModule";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";


import { ServiceButtons } from "@/components/ui/Module/ServiceButtons";

export default function HomePage() {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { Module: modules, recentModules, handleModuleClick } = UseModule();

    const handleSearchSubmit = () => {
        const q = searchQuery.toLowerCase().trim();
        if (!q) return;
        const match = (Object.keys(modules) as (keyof typeof modules)[]).find((key) => {
            const item = modules[key];
            return (
                item.title.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q) ||
                key.toLowerCase().includes(q)
            );
        });
        if (match) {
            const item = modules[match];
            handleModuleClick(match);
            if (item.url && item.url !== '#') {
                window.location.href = item.url;
            }
        }
    };

    return (
        <div className="w-full relative min-h-screen">
            <div className="fixed font-sans inset-0 flex items-center justify-center ">
                <span className="text-[600px] font-black text-muted/20 opacity-50">
                    O
                </span>
            </div>
            <div className="w-full h-[50px] flex items-center justify-end absolute top-2 left-0 z-30">
                <TopBar onMenuClick={() => setIsSideBarOpen(true)} />
            </div>
            <div className="absolute top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 w-full max-w-[640px] px-4">
                <Time />
                <SearchBar 
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSubmit={handleSearchSubmit}
                />

                {/* Boutons de service en bas de la barre de recherche */}
                <ServiceButtons searchQuery={searchQuery} />

                {/* Modules récents (si consultés récemment) */}
                <AnimatePresence>
                    {!searchQuery && recentModules.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 mt-1 flex-wrap justify-center text-xs text-muted"
                        >
                            <span className="text-[11px] font-medium text-muted">Récents :</span>
                            {recentModules.map((key) => {
                                const item = modules[key as keyof typeof modules];
                                if (!item) return null;
                                const Icon = item.icon;
                                const isAvailable = Boolean(item.url && item.url !== '#');
                                return (
                                    <motion.a
                                        key={key}
                                        href={isAvailable ? item.url : undefined}
                                        onClick={(e) => {
                                            handleModuleClick(key);
                                            if (!isAvailable) e.preventDefault();
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-1.5 px-2.5 py-1 bg-surface/60 backdrop-blur-xs rounded-full border border-border/8 text-[11px] font-medium text-surface-text hover:bg-surface transition-all cursor-pointer"
                                    >
                                        <Icon size={12} className="text-primary" />
                                        <span>{item.title}</span>
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="w-full absolute bottom-0 left-0 z-30">
                <BottomBar />
            </div>

            <SideBar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
        </div>
    );
}