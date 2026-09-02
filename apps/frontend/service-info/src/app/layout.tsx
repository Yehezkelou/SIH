 import './global.css';
import React from 'react';
import Providers from './providers';
import {ThemeProvider} from "@/components/ThemeProvider"
import {Poppins} from "next/font/google"

const poppins = Poppins({
  subsets : ["latin"],
  weight : ["100","200","300","400", "500", "600", "700", "800", "900"],
  variable : "--font-poppins"
})

export const metadata = {
  title: 'SIH — Panel Admin',
  description: "Console d'administration du Système d'Information Hospitalier",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${poppins.variable} h-full`} suppressHydrationWarning>
      <body className="h-full bg-bg text-text antialiased">
        <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
