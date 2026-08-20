"use client";

import React, { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Icon, IconName } from "./Icon";

const baseControl =
  "w-full bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 placeholder:text-slate-400 px-3 h-9 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:bg-slate-50 disabled:text-slate-500";

function Label({ label, required, htmlFor }: { label?: string; required?: boolean; htmlFor?: string }) {
  if (!label) return null;
  return (
    <label htmlFor={htmlFor} className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
  );
}

/* --------------------------------- Input --------------------------------- */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: IconName;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, hint, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <Label label={label} required={props.required} htmlFor={inputId} />
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-slate-400 pointer-events-none">
              <Icon name={leftIcon} size={15} />
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(baseControl, leftIcon && "pl-9", error && "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20", className)}
            {...props}
          />
        </div>
        {error ? (
          <span className="text-[11px] text-rose-500 font-medium">{error}</span>
        ) : (
          hint && <span className="text-[11px] text-slate-400">{hint}</span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

/* -------------------------------- Select --------------------------------- */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || props.name;
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <Label label={label} required={props.required} htmlFor={selectId} />
        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            className={cn(baseControl, "appearance-none pr-9 cursor-pointer", error && "border-rose-400", className)}
            defaultValue={props.defaultValue ?? ""}
            {...props}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <span className="absolute right-3 text-slate-400 pointer-events-none">
            <Icon name="chevronDown" size={15} />
          </span>
        </div>
        {error && <span className="text-[11px] text-rose-500 font-medium">{error}</span>}
      </div>
    );
  }
);
Select.displayName = "Select";

/* ------------------------------- Textarea -------------------------------- */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const areaId = id || props.name;
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <Label label={label} required={props.required} htmlFor={areaId} />
        <textarea
          id={areaId}
          ref={ref}
          className={cn(baseControl, "h-auto py-2 min-h-[80px] resize-y", error && "border-rose-400", className)}
          {...props}
        />
        {error && <span className="text-[11px] text-rose-500 font-medium">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
