import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
    children, isLoading, className='', ...props
}) => {

    return (
        <button
        className={`w-full flex justify-center items-center py-2.5 px-4 
            border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-text bg-primary hover:opacity-90
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed 
            transition-colors ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-primary-text" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                 
            ): (
                children
            )}
        </button>
    )
}