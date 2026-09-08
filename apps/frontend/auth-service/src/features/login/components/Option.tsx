import React from "react"
import { motion } from "framer-motion"
import { Key, Lock, HelpCircle, Check, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

type Props = {
    isPinEnabled: boolean;    
    onChangeMode: (isPin: boolean) => void;
}

export function Option({ isPinEnabled = false, onChangeMode }: Props) {
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-16 right-0 w-56 p-4 flex flex-col space-y-2 
                       bg-surface/95 backdrop-blur-md rounded-xl border border-border/8
                       shadow-2xl text-surface-text text-sm z-50"
        >
            <div className="px-2 py-1 text-xs font-semibold text-muted uppercase tracking-wider">
                Plus d'options
            </div>
            
            <div className="h-[1px] bg-border/8 my-1" />

            <motion.button
                whileHover={!isPinEnabled ? { x: 4, backgroundColor: "rgba(255, 255, 255, 0.05)" } : {}}
                whileTap={!isPinEnabled ? { scale: 0.98 } : {}}
                className="w-full flex items-center justify-between space-x-3 px-3 py-2 rounded-lg text-left hover:text-primary transition-colors text-surface-text disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPinEnabled}
                onClick={() => onChangeMode(true)}
            >
                <div className="flex items-center space-x-3">
                    <Key className="h-4 w-4 text-primary" />
                    <span>Code PIN</span>
                </div>
                {isPinEnabled && <Check className="h-3 w-3 text-primary"/>}
            </motion.button>

            <motion.button
                whileHover={isPinEnabled ? { x: 4, backgroundColor: "rgba(255, 255, 255, 0.05)" } : {}}
                whileTap={isPinEnabled ? { scale: 0.98 } : {}}
                className="w-full flex items-center justify-between space-x-3 px-3 py-2 rounded-lg text-left hover:text-primary transition-colors text-surface-text disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isPinEnabled}
                onClick={() => onChangeMode(false)}
            >
                <div className="flex items-center space-x-3">
                    <Lock className="h-4 w-4 text-primary" />
                    <span>Mot de passe</span>
                </div>
                {!isPinEnabled && <Check className="h-3 w-3 text-primary"/>}
            </motion.button>

            <motion.button
                whileHover={{ x: 4, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:text-primary transition-colors text-surface-text"
            >
                <HelpCircle className="h-4 w-4 text-primary" />
                <span>Identifiant oublié ?</span>
            </motion.button>

            <motion.button
                whileHover={{ x: 4, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:text-primary transition-colors text-surface-text border-t border-border/8 pt-2 mt-1 rounded-t-none"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
                {resolvedTheme === "dark" ? (
                    <>
                        <Sun className="h-4 w-4 text-warning" />
                        <span>Mode clair</span>
                    </>
                ) : (
                    <>
                        <Moon className="h-4 w-4 text-primary" />
                        <span>Mode sombre</span>
                    </>
                )}
            </motion.button>
        </motion.div>
    )
}