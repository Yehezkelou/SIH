import { SetMetadata } from "@nestjs/common";
import {z} from "zod"




// decorateur pour injecter les schema 
export const ZOD_SCHEMA_METADATA = "zod_schema"
export const UseZodSchema = (schema : z.ZodType) => SetMetadata(ZOD_SCHEMA_METADATA, schema)