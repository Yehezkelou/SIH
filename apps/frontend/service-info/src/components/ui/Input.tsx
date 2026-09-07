'use client';

import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: LucideIcon;
    error?: string;
    required?: boolean;
    helperText?: string;
    rightAction?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, icon: Icon, error, required, helperText, rightAction, className = '', ...props }, ref) => {
        return (
            <div className="w-full space-y-1.5">
                {/* Label avec astérisque rouge et action optionnelle (ex: bouton "Suggérer") */}
                {(label || rightAction) && (
                    <div className="flex items-center justify-between">
                        {label && (
                            <label className="text-xs font-semibold text-surface-text">
                                {label} {required && <span className="text-danger">*</span>}
                            </label>
                        )}
                        {rightAction}
                    </div>
                )}

                {/* Champ input */}
                <div className="relative">
                    {Icon && (
                        <Icon
                            size={15}
                            className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                                error ? 'text-danger' : 'text-muted'
                            }`}
                        />
                    )}

                    <input
                        ref={ref}
                        className={`w-full py-2.5 text-xs bg-page rounded-xl text-surface-text placeholder:text-muted/70 
                        border transition-all focus:outline-none focus:ring-2 ${
                            Icon ? 'pl-10' : 'pl-3.5'
                        } ${rightAction ? 'pr-10' : 'pr-3.5'} ${
                            error
                                ? 'border-danger/50 focus:ring-danger/20'
                                : 'border-border/8 focus:border-border/12 focus:ring-primary/10'
                        } ${className}`}
                        {...props}
                    />
                </div>

                {/* Message d'aide ou d'erreur avec animation fluide */}
                <AnimatePresence mode="wait">
                    {error ? (
                        <motion.p
                            key="error-msg"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className="text-[11px] text-danger flex items-center gap-1 font-medium"
                        >
                            <AlertCircle size={12} className="shrink-0" />
                            <span>{error}</span>
                        </motion.p>
                    ) : (
                        helperText && (
                            <p className="text-[11px] text-muted">{helperText}</p>
                        )
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

Input.displayName = 'Input';
export default Input;
