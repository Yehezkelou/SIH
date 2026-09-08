'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NAV, sectionFromPath } from '@/config/nav';

export const useSideBar = () => {
  const pathname = usePathname();

  // La section correspondant à la route courante s'ouvre par défaut, puis
  // l'utilisateur reste maître de l'accordéon.
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(
    () => sectionFromPath(pathname)?.label ?? 'Dossiers patients'
  );

  const toggleSubMenu = (label: string) => {
    setOpenSubMenu((prev) => (prev === label ? null : label));
  };

  const isActive = (path: string) => pathname === path;

  return {
    nav: NAV,
    openSubMenu,
    toggleSubMenu,
    pathname,
    isActive,
  };
};
