import type { Metadata } from "next";
import "./global.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export const metadata: Metadata = {
  title: "MediSIH — Admissions & Séjours",
  description: "Module d'accueil et de gestion des admissions du Système d'Information Hospitalier",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="font-sans bg-slate-100 text-slate-800 antialiased">
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto">
              <div className="max-w-[1400px] mx-auto p-6 flex flex-col gap-6">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
