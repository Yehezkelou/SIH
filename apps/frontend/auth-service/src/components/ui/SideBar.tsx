'use client';

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Module } from "./Module/Module";

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SideBar({ isOpen, onClose }: SideBarProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Arrière-plan flou cliquable pour fermer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 cursor-pointer"
                    />

                    {/* Panneau latéral coulissant depuis la droite */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 220 }}
                        className="fixed right-0 top-0 bottom-0 h-full w-[400px] bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-white/5 z-50 p-6 flex flex-col"
                    >
                        {/* En-tête avec bouton Fermer */}
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                Menu
                            </span>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer text-gray-500 hover:text-gray-800 dark:hover:text-white transition-all duration-200"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Liste des modules */}
                        <div className="flex-1 mt-6 flex flex-col overflow-y-auto">
                            <Module />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
