import React from "react"
import {motion} from "framer-motion" 

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    isLoading : boolean
}

export const Button : React.FC<ButtonProps> = ({
    children,
    isLoading,
    className="",
    disabled,
    ...props
    
}) => {

    return (
        <motion.button
        whileHover={!isLoading && !disabled ? {scale: 1.02} : {}}
        whileTap={!isLoading && !disabled ? {scale : 0.98}: {}}
        disabled={isLoading || disabled}
            className={`
                px-4 py-2 w-full rounded-lg bg-blue-500 text-white flex items-center justify-center
                ${className}`}
        >
        {isLoading ? 
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg> :
            children
        }
        </motion.button>
    )
}



