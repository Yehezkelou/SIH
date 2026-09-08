import React from "react"
import { Input } from "../Input"






type Props = {
    identifier : string,
    password : string,
    setIdentifier : React.Dispatch<React.SetStateAction<string>>
    setPassword : React.Dispatch<React.SetStateAction<string>>
}

export function Password({identifier, password, setIdentifier, setPassword}: Props){
    return(
        <div className="space-y-4">
            <div>
                <Input 
                    id="identifiant"
                    type="text"
                    placeholder="ex: M12345 ou email@sih.fr"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                />
            </div>
        
            <div>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
        </div>
    )
}