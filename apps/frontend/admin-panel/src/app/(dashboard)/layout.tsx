import React from 'react';
import { AdminShell } from '@/components/layout/AdminShell';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // TODO(sécurité) : vérifier la session ici (ou via middleware) et rediriger
  // vers le login de l'auth-service si absente.
  return <AdminShell>{children}</AdminShell>;
}
