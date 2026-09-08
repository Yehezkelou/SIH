'use client';

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
    value?: string;
    onChange?: (value: string) => void;
    onSubmit?: () => void;
}

export function SearchBar({ value = '', onChange, onSubmit }: SearchBarProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSubmit) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="px-4 py-3 w-full flex items-center bg-surface/95 backdrop-blur-md shadow-md hover:shadow-lg rounded-full border border-border/8 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary">
            <div className="flex items-center gap-2 pl-1 pr-3 text-surface-text">
                <Search size={18} className="text-primary" />
                <label 
                    className="text-base font-semibold cursor-pointer select-none tracking-wide"
                    htmlFor="search"
                >
                    SIH
                </label>
            </div>

            <div className="h-6 w-px bg-border/12 mr-3"></div>

            <input 
                type="text"
                id="search"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border-none outline-none bg-transparent text-sm text-surface-text placeholder:text-muted"
                placeholder="Rechercher un service (BAFS, Info, Hospitalisation...)"
                autoComplete="off"
            />

            {value && (
                <button
                    type="button"
                    onClick={() => onChange?.('')}
                    className="p-1 text-muted hover:text-surface-text rounded-full hover:bg-hover/6 transition-colors"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
}