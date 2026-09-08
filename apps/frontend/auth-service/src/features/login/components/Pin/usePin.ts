import React, { useRef, useState } from "react"

export function usePin() {
    const [pin, setPin] = useState(["", "", "", "", "", ""])

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ]

    const handleChangePin = (val: string, index: number) => {
        const newPin = [...pin]
        newPin[index] = val.slice(-1) // Garde uniquement le dernier caractère saisi
        setPin(newPin)

        // Focus automatique sur le champ suivant
        if (val && index < 5) {
            inputRefs[index + 1].current?.focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        // Retour automatique sur le champ précédent avec la touche Backspace
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            inputRefs[index - 1].current?.focus()
        }
    }

    return {
        pin,
        inputRefs,
        handleChangePin,
        handleKeyDown
    }
}