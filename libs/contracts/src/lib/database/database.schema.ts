import z from "zod";


export const DatabaseEnvSchema = z.object({
    DB_HOST : z.string(),
    DB_PORT : z.coerce.number().default(5432),
    DB_USER : z.string(),
    DB_PASSWORD : z.string(),
    DB_NAME : z.string(),
})


// type inferé typescripts 
export type DatabaseEnvType = z.infer<typeof DatabaseEnvSchema> 