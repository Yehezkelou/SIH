import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/global.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Urgences - Institut de Cardiologie d'Abidjan",
  description: "Gestion et suivi des indicateurs de temps d'attente des urgences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-slate-100 antialiased overflow-hidden`}>
        <div className="flex h-screen w-screen overflow-hidden">
          {/* Menu latéral fixe */}
          <Sidebar />

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* En-tête supérieur */}
            <Header />

            {/* Titre contextuel fixe */}
            <div className="bg-white px-6 py-2 border-b border-slate-200 text-center shadow-2xs shrink-0">
              <h1 className="text-sky-600 font-semibold text-xs tracking-wide uppercase">
                Urgences &gt; Temps d’attente et DMS
              </h1>
            </div>

            {/* Injection des pages */}
            <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}