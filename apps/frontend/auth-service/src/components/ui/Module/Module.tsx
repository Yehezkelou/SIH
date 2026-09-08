import React from "react";
import { motion } from "framer-motion";
import { UseModule } from "./useModule";

export function Module() {
    const { Module: modules, handleModuleClick } = UseModule();

    return (
        <div className="flex flex-col gap-3 w-full">
            {Object.keys(modules).map((key) => {
                const item = modules[key as keyof typeof modules];
                const Icon = item.icon;

                return (
                    <motion.a
                        key={key}
                        onClick={() => handleModuleClick(key)}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        href={item.url}
                        className="flex items-center gap-3.5 p-3 rounded-xl bg-page hover:bg-hover/6 border border-border/8 transition-all text-left w-full group cursor-pointer shadow-xs"
                    >
                        <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-text transition-colors">
                            <Icon size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-surface-text">
                                {item.title}
                            </span>
                            <span className="text-xs text-muted">
                                {item.description}
                            </span>
                        </div>
                    </motion.a>
                );
            })}
        </div>
    );
}