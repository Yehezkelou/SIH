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
            bg-surface text-surface-text placeholder:text-muted border-border/8
            focus:ring-primary/20 focus:border-primary
            ${className}`}
          {...props}
        />
      </motion.div>
    </AnimatePresence>
  );
};
