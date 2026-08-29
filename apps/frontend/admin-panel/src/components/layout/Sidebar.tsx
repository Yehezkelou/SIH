'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, NAV_FOOTER, type NavItem } from '@/config/nav';
import { Icon } from './icons';
import { cn } from '@/lib/cn';

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + '/');
}

function Item({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const pathname = usePathname();
  const active = isActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
        active ? 'bg-white/15 text-white font-medium' : 'text-white/70 hover:text-white hover:bg-white/10'
      )}
    >
      <Icon name={item.icon} className="h-5 w-5 shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </Link>
  );
}

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <aside
      className={cn(
        'flex h-full flex-col bg-sidebar text-white transition-all duration-200',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-5">
        <span className={cn('text-2xl font-bold tracking-wide', collapsed && 'text-lg')}>
          {collapsed ? 'S' : 'SIH'}
        </span>
      </div>

      {/* Navigation principale */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {NAV_ITEMS.map((item) => (
          <Item key={item.href} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Footer : paramètres + carte info */}
      <div className="space-y-1 px-3 pb-3">
        {NAV_FOOTER.map((item) => (
          <Item key={item.href} item={item} collapsed={collapsed} />
        ))}

        {!collapsed && (
          <div className="mt-3 rounded-xl bg-promo p-4 text-white shadow-pop">
            <p className="text-sm font-semibold">Environnement</p>
            <p className="mt-1 text-xs text-white/80">Développement · v0.0.1</p>
          </div>
        )}
      </div>
    </aside>
  );
}
