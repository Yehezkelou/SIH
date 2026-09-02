/** Petit utilitaire de concaténation de classes (remplace clsx, non installé). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
