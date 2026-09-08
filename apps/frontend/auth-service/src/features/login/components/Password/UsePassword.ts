import { useState } from "react";

export default function usePassword(){
        const [password, setPassword] = useState("");

        return {
            password,
            setPassword
        }
}