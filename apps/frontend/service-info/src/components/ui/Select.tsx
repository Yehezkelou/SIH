'use client';

import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, ChevronDown, AlertCircle } from 'lucide-react';

export interface SelectOption {
    value: string | number;
    label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    label?: string;
    icon?: LucideIcon;
    options?: SelectOption[];
    error?: string;
    required?: boolean;
    sizeVariant?: 'sm' | 'md' | 'lg';
    containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            label,
            icon: Icon,
            options,
            error,
            required,
            sizeVariant = 'md',
            containerClassName = '',
            className = '',
            children,
            ...props
        },
        ref
    ) => {
        const sizeClasses = {
            sm: 'py-1.5 text-xs rounded-lg pr-7',
            md: 'py-2.5 text-xs rounded-xl pr-9',
            lg: 'py-3 text-sm rounded-xl pr-10',
        }[sizeVariant];

        const iconSize = sizeVariant === 'sm' ? 13 : sizeVariant === 'lg' ? 17 : 15;
        const iconPadding = Icon
            ? sizeVariant === 'sm'
                ? 'pl-8'
                : sizeVariant === 'lg'
                ? 'pl-11'
                : 'pl-10'
            : sizeVariant === 'sm'
            ? 'pl-2.5'
            : 'pl-3.5';

        return (
            <div className={`space-y-1.5 ${containerClassName || 'w-full'}`}>
                {label && (
                    <label className="text-xs font-semibold text-surface-text">
                        {label} {required && <span className="text-danger">*</span>}
                    </label>
                )}

                <div className="relative">
                    {Icon && (
                        <Icon
                            size={iconSize}
                            className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                                error ? 'text-danger' : 'text-muted'
                            }`}
                        />
                    )}

                    <select
                        ref={ref}
                        className={`w-full bg-page text-surface-text appearance-none 
                        border transition-all focus:outline-none focus:ring-2 cursor-pointer ${sizeClasses} ${iconPadding} ${
                            error
                                ? 'border-danger/50 focus:ring-danger/20'
                                : 'border-border/8 focus:border-border/12 focus:ring-primary/10'
                        } ${className}`}
                        {...props}
                    >
                        {options
                            ? options.map((opt) => (
                                  <option key={opt.value} value={opt.value} className="bg-surface text-surface-text">
                                      {opt.label}
                                  </option>
                              ))
                            : children}
                    </select>

                    <ChevronDown
                        size={iconSize}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                    />
                </div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.p
                            key="select-error"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className="text-[11px] text-danger flex items-center gap-1 font-medium"
                        >
                            <AlertCircle size={12} className="shrink-0" />
                            <span>{error}</span>
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

Select.displayName = 'Select';
export default Select;
