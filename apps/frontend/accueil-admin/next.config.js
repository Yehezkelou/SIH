//@ts-check

/**
 * Configuration Next.js autonome (sans @nx/next).
 * Permet de lancer l'app directement avec `next dev` / `next build`.
 * Pour réintégrer Nx plus tard : installer `@nx/next` puis restaurer withNx.
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
