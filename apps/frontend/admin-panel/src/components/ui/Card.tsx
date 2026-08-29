import React from 'react';
import { cn } from '@/lib/cn';

export function Card({
  title,
  action,
  className,
  children,
}: {
  title?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={cn('rounded-lg border border-border bg-surface p-6 shadow-card', className)}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between">
          {title && <h2 className="text-base font-semibold text-text">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
