import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ error, className = '', ...props }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        whileHover={{scale:1.01}}
        className="relative w-full"
        initial={{y: -20, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        exit={{y: 20, opacity: 0}}
        transition={{duration: 0.2, ease: "easeOut"}}
      >
        <input
          className={`
            w-full px-3 py-2 rounded-lg border transition-all focus:outline-none focus:ring-2
            bg-white text-slate-900 border-slate-200 focus:ring-blue-500/20 focus:border-blue-500
            dark:bg-slate-900/90 dark:text-white dark:border-white/10 dark:focus:ring-blue-500/30
            ${className}`}
          {...props}
        />
      </motion.div>
    </AnimatePresence>
  );
};
