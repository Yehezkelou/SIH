import { motion } from "framer-motion";
import { User as IconUser } from "lucide-react";
import { useLogout } from "@/features/me/hooks/useLogout";

type Props = {
    name: string | undefined;
    role: string | undefined;
}

export function User({ name, role }: Props) {
    const logout = useLogout();

    const handleLogout = (e: React.MouseEvent) => {
        e.stopPropagation();
        logout.mutate();
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{y: 20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.3, ease: "easeInOut", stiffness: 100, damping: 10}}
            className="flex rounded-lg bg-gray-50 dark:bg-slate-950/60 dark:border-white/10 top-11 shadow-sm border border-slate-500/65 absolute w-[160px] h-[200px] flex-col gap-3 items-center justify-center  p-4"
        >
            <motion.div
                whileHover={{ opacity: 1 }}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut", stiffness: 100, damping: 10 }}
                className="w-[50px] h-[50px] bg-slate-800/90 text-white dark:bg-gray-50 dark:text-slate-800 rounded-full p-3"
            >
                {/* avatar */}
                <IconUser />
            </motion.div>
            <div className="self-stretch flex w-[130px] border border-gray-500/50 dark:border-gray-50/50 "></div>
            <motion.div className="flex flex-col items-center justify-center">
                <span className="text-[12px] font-bold dark:text-white">{name}</span>
                <span className="text-xs text-slate-500 dark:text-white/80">{role}</span>
            </motion.div>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-lg border py-2 px-3 border-gray-500/50 dark:border-gray-50/50 text-sm dark:text-slate-50 text-slate-900/90 hover:text-white hover:bg-red-600 hover:border-none font-medium cursor-pointer"
                onClick={handleLogout}
                disabled={logout.isPending}
            >
                {logout.isPending ?
                (
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                ) : "Deconnexion"}
            </motion.button>
        </motion.div>
    )
}