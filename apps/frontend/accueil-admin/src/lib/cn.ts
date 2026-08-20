/**
 * Concatene des classes conditionnelles (equivalent minimal de clsx),
 * sans dependance externe pour garder le template autonome.
 */
export type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const walk = (value: ClassValue) => {
    if (!value) return;
    if (typeof value === "string" || typeof value === "number") {
      out.push(String(value));
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (typeof value === "object") {
      for (const [key, active] of Object.entries(value)) {
        if (active) out.push(key);
      }
    }
  };

  inputs.forEach(walk);
  return out.join(" ");
}
