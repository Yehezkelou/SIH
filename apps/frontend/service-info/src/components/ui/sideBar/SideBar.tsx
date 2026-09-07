'use client'
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion"
import { TitleSideBar } from "./Title";
import { useSideBar } from "@/hooks/useSideBar"

// Créé une seule fois : appeler `motion.create` pendant le rendu produit un
// nouveau type de composant à chaque passe et remonte les liens.
const MotionLink = motion.create(Link);

// L'état actif se signale d'abord par une barre latérale en `primary` : le fond
// seul (#EAEBED sur #FBFBFB) plafonne à 1,15:1, sous le minimum WCAG de 3:1
// exigé pour un état d'interface — et en thème sombre il ne se distinguait pas
// du survol.
const ITEM_ACTIVE =
    "relative bg-active text-active-text font-semibold " +
    "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 " +
    "before:h-5 before:w-[3px] before:rounded-full before:bg-primary";

const ITEM_IDLE = "text-surface-text hover:bg-hover/6";

export function SideBar() {
    const { nav, openSubMenu, toggleSubMenu, isActive } = useSideBar();

    return (
        <motion.aside
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", type: "spring" }}
            className="w-64 flex-shrink-0 pl-3 pt-5 h-full bg-surface text-surface-text
                       rounded-r-lg border-r border-border/8 shadow-lg"
        >
            <TitleSideBar />
            {nav.map((item) => {
                const Icon = item.icon;
                const isOpen = openSubMenu === item.label;
                const children = item.children ?? [];

                return (
                    <div
                        key={item.path}
                        className="flex flex-col gap-1 p-2"
                    >
                        {children.length > 0 ? (
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => toggleSubMenu(item.label)}
                                aria-expanded={isOpen}
                                className="flex items-center justify-between p-2.5 rounded-xl
                                           hover:bg-hover/6 text-surface-text cursor-pointer
                                           text-sm font-medium transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </div>
                                {isOpen
                                    ? <ChevronDown size={16} />
                                    : <ChevronRight size={16} />
                                }
                            </motion.button>
                        ) : (
                            <MotionLink
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                href={item.path}
                                aria-current={isActive(item.path) ? "page" : undefined}
                                className={`flex items-center gap-3 p-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    isActive(item.path) ? ITEM_ACTIVE : ITEM_IDLE
                                }`}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </MotionLink>
                        )}

                        <AnimatePresence>
                            {children.length > 0 && isOpen && (
                                <motion.div
                                    key={`${item.path}-submenu`}
                                    initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                                    animate={{
                                        height: "auto",
                                        opacity: 1,
                                        transition: {
                                            height: { duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] },
                                            opacity: { duration: 0.15, delay: 0.05 }
                                        }
                                    }}
                                    exit={{
                                        height: 0,
                                        opacity: 0,
                                        transition: {
                                            height: { duration: 0.2, ease: "easeInOut" },
                                            opacity: { duration: 0.1 }
                                        }
                                    }}
                                    className="overflow-hidden pl-6 flex flex-col gap-1 mt-1 border-l-2 border-border/8 ml-4"
                                >
                                    {children.map((sub) => {
                                        const SubIcon = sub.icon;

                                        return (
                                            <MotionLink
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                key={sub.path}
                                                href={sub.path}
                                                aria-current={isActive(sub.path) ? "page" : undefined}
                                                className={`flex items-center cursor-pointer gap-2 p-2 rounded-xl text-sm transition-colors ${
                                                    isActive(sub.path) ? ITEM_ACTIVE : ITEM_IDLE
                                                }`}
                                            >
                                                <SubIcon size={16} />
                                                <span>{sub.label}</span>
                                            </MotionLink>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </motion.aside>
    );
}
