'use client'

import React, { useState } from "react";
import { useLoginPassword, useLoginPin} from "./hooks/useLogin";
import { Alert } from "@/components/ui/Alert";
import { Button } from "./components/Button";
import { Title } from "./components/Title";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { Option } from "./components/Option";
import { Pin } from "./components/Pin/Pin";
import usePassword from "./components/Password/UsePassword";
import { Password } from "./components/Password/Password";
import { useErrorMessage } from "./components/ErrorMessage";
import { usePin } from "./components/Pin/usePin";


export function LoginForm(){

    const {mutate: login, isPending, error} = useLoginPassword()
    const {mutate: loginPin, isPending: isPendingPin, error: errorPin}  = useLoginPin()
    
    const [identifier, setIdentifier] = useState("")
    const { password, setPassword } = usePassword()
    const {pin} = usePin()

    const [hoverOption, setHoverOption] = useState(false)
    const [isPinEnabled, setIsPinEnabled] = useState(false)


    const handleSubmit = (e : any) => {
        e.preventDefault();
        if(!identifier || !password) return;
        login({ identifier, password });
    }

    const handleSubmitPin = (e: any) => {
        e.preventDefault();
        if(!identifier || !pin) return;
        loginPin({identifier, pin: pin.join("")})
    }

    const errorMessage = useErrorMessage(error)

    return (
        <div className="w-full max-w-2xl flex flex-row items-center justify-center">
            <div className="mr-3">
                <Title title="Connectez vous"/>
            </div>
            <motion.div  
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ originY: 1 }}
                className="border-r-2 border-slate-200 dark:border-white/20 self-stretch mx-6"
            />
            <motion.form 
                onSubmit={isPinEnabled ? handleSubmitPin : handleSubmit} 
                initial={{x: -30, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                transition={{duration: 0.8, ease: "easeInOut", delay: 0.8}}
                className="space-y-4 w-full max-w-md p-8 bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-2xl shadow-xl dark:shadow-2xl backdrop-blur-sm">
                {errorMessage && <Alert type="error" message={errorMessage} />}

                {isPinEnabled 
                ? 
                <div>
                    <Pin 
                        identifier={identifier}
                        setIdentifier={setIdentifier}
                    />
                </div>
                : 
                <Password
                    identifier={identifier}
                    password={password}
                    setIdentifier={setIdentifier}
                    setPassword={setPassword}
                />
                }

                <Button type="submit" isLoading={isPending} className="mt-6">
                    Se connecter
                </Button>
            </motion.form>
            <div 
                className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
                onMouseEnter={() => setHoverOption(true)}
                onMouseLeave={() => setHoverOption(false)}
            >
                <AnimatePresence>
                    {hoverOption && (
                        <Option 
                            isPinEnabled={isPinEnabled} 
                            onChangeMode={setIsPinEnabled} 
                        />
                    )}
                </AnimatePresence>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full shadow-lg backdrop-blur-md flex items-center justify-center transition-colors mt-2 border
                               bg-white/80 text-slate-800 border-slate-200/80 hover:bg-slate-100/90
                               dark:bg-white/10 dark:text-white dark:border-white/10 dark:hover:bg-white/15"
                    title="Plus d'options ?"
                > 
                    <HelpCircle className="h-5 w-5" />
                </motion.button>
            </div>
        </div>
    )
}