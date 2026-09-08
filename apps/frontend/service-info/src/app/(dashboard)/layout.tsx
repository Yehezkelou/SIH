import { SideBar } from "@/components/ui/sideBar/SideBar";
import { TopBar } from "@/components/ui/topBar/TopBar";

export default function InfoLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-page text-page-text">
             {/* Sidebar fixe à gauche */}
                <SideBar />
            <div className="flex flex-col flex-1 w-full h-full overflow-hidden">
                <TopBar/>
                {/* Contenu de la page à droite (décalé de 220px pour la sidebar fixed) */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
