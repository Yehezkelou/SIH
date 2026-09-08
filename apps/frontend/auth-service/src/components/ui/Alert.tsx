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
        ? 'bg-danger/10 text-danger-text border border-danger/20'
        : 'bg-success/10 text-success-text border border-success/20'
    }`}>
      {message}
    </div>
  );
};
