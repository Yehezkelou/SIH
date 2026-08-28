import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ error, className = '', ...props }) => {
  return (
    <input
      className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all ${
        error
          ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
          : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
      } ${className}`}
      {...props}
    />
  );
};
