'use client';

import React from "react";
import { motion } from "framer-motion";
import { UseModule } from "./useModule";
import { ArrowUpRight } from "lucide-react";

interface ServiceButtonsProps {
    searchQuery?: string;
}

export function ServiceButtons({ searchQuery = '' }: ServiceButtonsProps) {
    const { Module: modules, handleModuleClick } = UseModule();

    const moduleKeys = Object.keys(modules) as (keyof typeof modules)[];
    const filteredKeys = moduleKeys.filter((key) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        const item = modules[key];
        return (
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            key.toLowerCase().includes(q)
        );
    });

    return (
        <div className="w-full mt-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                {filteredKeys.map((key, index) => {
                    const item = modules[key];
                    const Icon = item.icon;
                    const isAvailable = Boolean(item.url && item.url !== '#');

                    return (
                        <motion.a
                            key={key}
                            href={isAvailable ? item.url : undefined}
                            onClick={(e) => {
                                handleModuleClick(key);
                                if (!isAvailable) {
                                    e.preventDefault();
                                }
                            }}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: index * 0.04 }}
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`group relative flex flex-col items-center text-center p-3.5 rounded-2xl bg-surface/80 backdrop-blur-md border border-border/8 hover:border-primary/50 shadow-sm hover:shadow-lg transition-all cursor-pointer ${
                                !isAvailable ? 'opacity-85' : ''
                            }`}
                        >
                            {/* Icône de lien externe */}
                            {isAvailable && (
                                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-muted group-hover:text-primary">
                                    <ArrowUpRight size={13} />
                                </div>
                            )}

                            {/* Conteneur d'icône avec style distinctif */}
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-1.5 transition-all duration-200 shadow-xs ${
                                item.iconBg || 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-text'
                            }`}>
                                <Icon size={22} />
                            </div>

                            {/* Titre du service */}
                            <span className="text-sm font-semibold text-surface-text group-hover:text-primary transition-colors">
                                {item.title}
                            </span>

                            {/* Badge de disponibilité */}
                            {!isAvailable && (
                                <span className="mt-1 text-[9px] font-semibold px-2 py-0.5 rounded-full bg-hover/6 text-muted border border-border/8">
                                    Bientôt
                                </span>
                            )}
                        </motion.a>
                    );
                })}
            </div>

            {filteredKeys.length === 0 && (
                <div className="py-4 text-center text-xs text-muted">
                    Aucun service ne correspond à « {searchQuery} »
                </div>
            )}
        </div>
    );
}
