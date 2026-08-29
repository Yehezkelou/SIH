import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Garde de session (stub).
 * TODO : rediriger vers le login de l'auth-service si le cookie de session
 * est absent/expiré. Laisser passer tant que l'auth front n'est pas branchée.
 */
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Applique la garde à tout sauf les assets statiques et l'API interne Next.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
