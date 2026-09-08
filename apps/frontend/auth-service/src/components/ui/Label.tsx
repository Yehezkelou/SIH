import React from 'react';

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ children, className = '', ...props }) => {
  return (
    <label className={`block text-sm font-medium text-surface-text mb-1.5 ${className}`} {...props}>
      {children}
    </label>
  );
};
