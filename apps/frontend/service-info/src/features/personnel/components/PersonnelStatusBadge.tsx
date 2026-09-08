import { UserStatus } from "../schema"



interface PersonnelStatusBadgeProps {
    status: UserStatus
    isConnected?: boolean
}



export function PersonnelStatusBadge({ status, isConnected}: PersonnelStatusBadgeProps){

    const getStatusStyle = (s: UserStatus) => {
        switch(s){
            case "ACTIF":
                return "bg-success/10 text-success-text border-success/20"

            case "EN_ATTENTE_ACTIVATION":
                return "bg-info/10 text-info-text border-info/20"

            case "SUSPENDU":
               return "bg-warning/10 text-warning-text border-warning/20"

            case "VERROUILLE":
                return "bg-danger/10 text-danger-text border-danger/20"

            case "INACTIF":
            default:
                return "bg-neutral/10 text-neutral-text border-neutral/20"
        }
    }

    const formatStatusLabel = (s: UserStatus) => {
        switch (s) {
            case "ACTIF" : 
                return "Actif"

            case "EN_ATTENTE_ACTIVATION" :
                return "En attente"

            case "SUSPENDU" :
                return "Suspendu"

            case "VERROUILLE" :
                return "Verrouillé"

            case "INACTIF" :
                return "Inactif"

            default:
                return s
        }
    }


    return (
        <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs 
                font-semibold ${getStatusStyle(
                    status
                )}`}>
                    {formatStatusLabel(status)}
            </span>

            {isConnected !== undefined && (
                <span
                    title={isConnected ? "En session actuellement" : "Hors ligne"}
                    className="inline-flex items-center gap-1.5 text-[11px] text-muted"                    
                >
                    <span
                        className={`w-2 h-2 rounded-full ${isConnected ? "bg-success animate-pulse": "bg-neutral/40"}`}

                    />
                    <span
                        className="hidden sm:inline" 
                    >
                        {isConnected ? "En ligne" : "Hors ligne"}

                    </span>

                </span>
            )}
        </div>
    )
}