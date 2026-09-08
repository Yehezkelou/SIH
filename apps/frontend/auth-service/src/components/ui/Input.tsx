import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ error, className = '', ...props }) => {
  return (
    <input
      className={`w-full px-3 py-2 bg-page text-surface-text placeholder:text-muted border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all ${
        error
          ? 'border-danger/50 focus:ring-danger/20 focus:border-danger'
          : 'border-border/12 focus:ring-primary/20 focus:border-primary'
      } ${className}`}
      {...props}
    />
  );
};
