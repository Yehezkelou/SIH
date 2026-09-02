import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string("L'URL de l'API doit être valide"),
});

const parseEnv = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!parseEnv.success) {
  console.error('Erreur de configuration système :');
  console.error(parseEnv.error.format());
  throw new Error("Variables d'environnement invalides");
}

export const env = {
  API_URL: parseEnv.data.NEXT_PUBLIC_API_URL,
};
