import './global.css';
import React from 'react';
import Providers from './providers';

export const metadata = {
  title: 'SIH — Panel Admin',
  description: "Console d'administration du Système d'Information Hospitalier",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full" data-theme="light">
      <body className="h-full bg-bg text-text antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
