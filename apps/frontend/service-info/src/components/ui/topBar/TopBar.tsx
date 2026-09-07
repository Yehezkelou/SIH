'use client'
import { usePathname } from "next/navigation";
import React from "react";
import { titleFromPath } from "@/config/nav";
import { User } from "@/components/ui/User";

export function TopBar({ children }: { children?: React.ReactNode }) {

    const pathname = usePathname();
    const title = titleFromPath(pathname);

    return (
        <header className="h-16 w-full shadow-xs flex-shrink-0 border-b
        border-border/8 bg-surface text-surface-text px-6 flex
        items-center justify-between">
            <div>
                <h1 className="text-base font-semibold">{title}</h1>
            </div>
            <div className="flex items-center gap-4">
                {children}
                <User />
            </div>
        </header>
    );
}
