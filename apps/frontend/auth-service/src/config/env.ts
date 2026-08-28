import {z} from "zod"

// schema de validation 
const envSchema = z.object({
    NEXT_PUBLIC_API_URL: z.string("L'URL de l'api doit etre valide")
})

// parse 
const parseEnv = envSchema.safeParse({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
})

// verification
if(!parseEnv.success){
    console.error("Erreur de configuration systeme :");
    console.error(parseEnv.error.format());
    throw new Error("Variable d'environnement invalides")
}

// export 
export const env = {
    API_URL : parseEnv.data.NEXT_PUBLIC_API_URL
}