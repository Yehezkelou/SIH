import { SideBar } from '@/components/ui/sideBar/SideBar';
import { TopBar } from '@/components/ui/topBar/TopBar';

export default function PatientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-page text-page-text">
            <SideBar />
            <div className="flex flex-col flex-1 w-full h-full overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
