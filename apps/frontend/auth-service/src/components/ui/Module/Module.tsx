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
                        className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-white/5 transition-all text-left w-full group cursor-pointer shadow-xs"
                    >
                        <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Icon size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {item.title}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {item.description}
                            </span>
                        </div>
                    </motion.a>
                );
            })}
        </div>
    );
}