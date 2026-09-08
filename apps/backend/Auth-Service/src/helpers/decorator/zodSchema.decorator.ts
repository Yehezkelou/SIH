import { SetMetadata } from "@nestjs/common";
import { z } from "zod";

// Décorateur pour injecter les schémas Zod sur les routes des contrôleurs
export const ZOD_SCHEMA_METADATA = "zod_schema";
export const UseZodSchema = (schema: z.ZodType) => SetMetadata(ZOD_SCHEMA_METADATA, schema);
