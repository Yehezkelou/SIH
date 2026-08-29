import React from 'react';
import { cn } from '@/lib/cn';

type Tone = 'teal' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const TONES: Record<Tone, string> = {
  teal: 'bg-teal/15 text-teal',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  danger: 'bg-danger/15 text-danger',
  info: 'bg-info/15 text-info',
  neutral: 'bg-muted/15 text-muted',
};

export function Badge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', TONES[tone], className)}>
      {children}
    </span>
  );
}
