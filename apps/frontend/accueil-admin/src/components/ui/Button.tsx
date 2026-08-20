"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Icon, IconName } from "./Icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "subtle";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: IconName;
  rightIcon?: IconName;
}

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 focus-visible:ring-emerald-500 shadow-sm shadow-emerald-600/20 border border-transparent",
  secondary:
    "bg-slate-800 text-white hover:bg-slate-900 active:bg-slate-950 focus-visible:ring-slate-500 border border-transparent",
  outline:
    "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 focus-visible:ring-emerald-500",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 focus-visible:ring-slate-400 border border-transparent",
  subtle:
    "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 active:bg-emerald-200 focus-visible:ring-emerald-500 border border-emerald-100",
  danger:
    "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 focus-visible:ring-rose-500 shadow-sm shadow-rose-600/20 border border-transparent",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "text-xs px-2.5 h-8 gap-1.5",
  md: "text-[13px] px-3.5 h-9 gap-2",
  lg: "text-sm px-5 h-11 gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, variant = "primary", size = "md", isLoading, leftIcon, rightIcon, disabled, ...props },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.985] whitespace-nowrap",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Icon name="refresh" size={15} className="animate-spin" />
      ) : (
        leftIcon && <Icon name={leftIcon} size={15} className="shrink-0" />
      )}
      {children && <span className="truncate">{children}</span>}
      {!isLoading && rightIcon && <Icon name={rightIcon} size={15} className="shrink-0" />}
    </button>
  )
);

Button.displayName = "Button";
