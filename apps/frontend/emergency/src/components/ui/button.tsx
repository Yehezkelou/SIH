"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

// Utilitaire pour fusionner proprement les classes Tailwind
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    // Styles de base communs à tous les boutons
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 ease-in-out rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.98]";

    // Variantes de couleurs
    const variants = {
      primary:
        "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-600/20 active:bg-emerald-800 focus:ring-emerald-500 border border-transparent",
      secondary:
        "bg-sky-600 text-white hover:bg-sky-700 hover:shadow-md hover:shadow-sky-600/20 active:bg-sky-800 focus:ring-sky-500 border border-transparent",
      outline:
        "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 active:bg-slate-100 focus:ring-emerald-500 shadow-sm",
      ghost:
        "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 focus:ring-slate-400",
      danger:
        "bg-rose-600 text-white hover:bg-rose-700 hover:shadow-md hover:shadow-rose-600/20 active:bg-rose-800 focus:ring-rose-500 border border-transparent",
    };

    // Tailles de boutons
    const sizes = {
      sm: "text-xs px-2.5 py-1.5 gap-1.5 min-h-[32px]",
      md: "text-xs px-4 py-2 gap-2 min-h-[38px]",
      lg: "text-sm px-5 py-2.5 gap-2.5 min-h-[44px]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}

        <span className="truncate">{children}</span>

        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";