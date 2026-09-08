import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePin } from "./usePin"
import { Input } from "../Input"

type Props = {
    identifier: string;
    setIdentifier: React.Dispatch<React.SetStateAction<string>>;
}

export function Pin({ identifier, setIdentifier }: Props) {
    const { pin, inputRefs, handleChangePin, handleKeyDown } = usePin()
    
    return (
        <div className="flex flex-col items-center justify-center gap-2.5 w-full">
            <Input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="ex: M12345 ou email@sih.fr"
                required
            />
            <div className="flex flex-row items-center justify-between gap-2.5 w-full">
            {pin.map((digit, i) => (
                <AnimatePresence key={i} mode="wait">
                    <motion.input
                        ref={inputRefs[i]}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                        type="text"
                        required
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChangePin(e.target.value.replace(/[^0-9]/g, ""), i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        className="w-12 h-12 text-center rounded-lg border text-lg font-bold transition-all focus:outline-none focus:ring-2
                                   bg-surface text-surface-text border-border/8
                                   focus:ring-primary/20 focus:border-primary"
                    />
                </AnimatePresence>
            ))}
            </div>
        </div>
    )
}