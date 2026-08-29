'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { titleFromPath } from '@/config/nav';
import { Icon } from './icons';

export function Topbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const pathname = usePathname();
  const title = titleFromPath(pathname);

  const toggleTheme = () => {
    const el = document.documentElement;
    const next = el.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    el.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* ignore */
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-4 shadow-card">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          aria-label="Replier le menu"
          className="rounded-lg p-2 text-muted hover:bg-surface-2 hover:text-text"
        >
          <Icon name="menu" className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-text">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="hidden items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface-2 sm:flex">
          FR <Icon name="chevronDown" className="h-4 w-4" />
        </button>

        <button
          onClick={toggleTheme}
          aria-label="Basculer le thème"
          className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface-2"
        >
          Thème
        </button>

        <button aria-label="Notifications" className="relative rounded-lg p-2 text-muted hover:bg-surface-2">
          <Icon name="bell" className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
        </button>

        <div className="ml-1 h-9 w-9 rounded-full bg-brand-500" aria-label="Profil utilisateur" />
      </div>
    </header>
  );
}
