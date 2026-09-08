'use client';

import React, { useRef, useEffect } from "react";

interface MfaPinInputProps {
    value: string;
    onChange: (value: string) => void;
    onComplete?: (value: string) => void;
    disabled?: boolean;
    autoFocus?: boolean;
    error?: boolean;
}

export function MfaPinInput({
    value,
    onChange,
    onComplete,
    disabled = false,
    autoFocus = true,
    error = false,
}: MfaPinInputProps) {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    // Découpage en tableau de 6 caractères
    const digits = Array.from({ length: 6 }, (_, i) => value[i] || '');

    useEffect(() => {
        if (autoFocus && inputsRef.current[0]) {
            inputsRef.current[0].focus();
        }
    }, [autoFocus]);

    const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const char = e.target.value.slice(-1); // prend le dernier caractère tapé
        if (!/^\d*$/.test(char)) return; // uniquement des chiffres

        const newDigits = [...digits];
        newDigits[index] = char;
        const newValue = newDigits.join('').slice(0, 6);
        onChange(newValue);

        if (char && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }

        if (newValue.length === 6 && onComplete) {
            onComplete(newValue);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (!digits[index] && index > 0) {
                // Si la case actuelle est vide, efface la case précédente et s'y positionne
                const newDigits = [...digits];
                newDigits[index - 1] = '';
                onChange(newDigits.join(''));
                inputsRef.current[index - 1]?.focus();
            } else {
                const newDigits = [...digits];
                newDigits[index] = '';
                onChange(newDigits.join(''));
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputsRef.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').trim();
        const numeric = pasteData.replace(/\D/g, '').slice(0, 6);

        if (numeric) {
            onChange(numeric);
            const targetIndex = Math.min(numeric.length, 5);
            inputsRef.current[targetIndex]?.focus();

            if (numeric.length === 6 && onComplete) {
                onComplete(numeric);
            }
        }
    };

    return (
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 w-full">
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => {
                        inputsRef.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    disabled={disabled}
                    onChange={(e) => handleInputChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-mono font-bold rounded-xl bg-surface border transition-all duration-150 outline-none select-none text-surface-text ${
                        error
                            ? 'border-danger text-danger-text focus:ring-2 focus:ring-danger/40'
                            : 'border-border/8 focus:border-primary focus:ring-2 focus:ring-primary/30'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}`}
                />
            ))}
        </div>
    );
}
