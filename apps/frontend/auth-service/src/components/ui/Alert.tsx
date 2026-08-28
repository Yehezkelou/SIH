import React from 'react';

interface AlertProps {
  type: 'error' | 'success';
  message: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const isError = type === 'error';
  return (
    <div className={`p-3 rounded-lg text-sm font-medium mb-4 ${
      isError 
        ? 'bg-red-50 text-red-800 border border-red-200' 
        : 'bg-green-50 text-green-800 border border-green-200'
    }`}>
      {message}
    </div>
  );
};
