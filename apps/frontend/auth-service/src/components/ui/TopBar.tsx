import { Menu, User } from "lucide-react";
import { useState } from "react";
import { User as UserBar } from "./User/User"
import { useMe } from "@/features/me/hooks/UseMe";

interface TopBarProps {
    onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps){
    const [info, setInfo] = useState(false);
    const user = useMe()

    const sizeIcon = 24;
    return(
        <div className="w-[200px] flex items-center justify-between px-4 py-2">
            <button
                className="opacity-80 relative border-2 border-bg-slate-800 hover:opacity-100 
                p-2 cursor-pointer text-slate-800 dark:text-slate-50 rounded-full flex items-center 
                justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"

                onClick={() => setInfo(true)}
                onMouseLeave={() => setInfo(false)}
            >
                <span className="text-sm font-medium">{user.data?.user.nom}</span>
                <User size={sizeIcon}/>
                 {info && <UserBar name={user.data?.user.prenom} role={user.data?.user.personnelType} />}
            </button>
            <button
                onClick={onMenuClick}
                className="opacity-80  hover:opacity-100 p-2 cursor-pointer text-slate-800 
                dark:text-slate-50 dark:hover:text-slate-800 
                rounded-full flex items-center justify-center hover:bg-slate-100 
                transition-all duration-200"
            >
                <Menu size={sizeIcon}/>
            </button>
        </div>
    )
}


