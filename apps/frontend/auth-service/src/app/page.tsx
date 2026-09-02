'use client';

import { SearchBar } from "@/components/ui/SearchBar";
import { Time } from "@/components/ui/Time";
import { TopBar } from "@/components/ui/TopBar";
import { BottomBar } from "@/components/ui/BottomBar";
import { SideBar } from "@/components/ui/SideBar";
import { UseModule } from "@/components/ui/Module/useModule";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";


export default function HomePage() {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const { Module: modules, recentModules, handleModuleClick } = UseModule();

    return (
        <div className="w-full relative min-h-screen">
            <div className="fixed font-sans inset-0 flex items-center justify-center ">
                <span className="text-[600px] font-black text-gray-200 dark:text-slate-700/90 opacity-50">
                    O
                </span>
            </div>
            <div className="w-full h-[50px] flex items-center justify-end absolute top-2 left-0 z-30">
                <TopBar onMenuClick={() => setIsSideBarOpen(true)} />
            </div>
            <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 w-full max-w-[600px] px-4">
                <Time />
                <SearchBar />

                {/* Cadre des modules récents cliqués (3 max) */}
                <AnimatePresence>
                    {recentModules.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2 mt-1 flex-wrap justify-center"
                        >
                            {recentModules.map((key) => {
                                const item = modules[key as keyof typeof modules];
                                if (!item) return null;
                                const Icon = item.icon;
                                return (
                                    <motion.button
                                        key={key}
                                        onClick={() => handleModuleClick(key)}
                                        whileHover={{ scale: 1.05, y: -1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 px-3.5 py-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-200 dark:border-white/10 text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer"
                                    >
                                        <Icon size={14} className="text-blue-500" />
                                        <span>{item.title}</span>
                                    </motion.button>
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