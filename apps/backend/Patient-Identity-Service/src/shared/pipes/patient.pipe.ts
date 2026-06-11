import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PinoLogger } from "nestjs-pino";
import { ZOD_SCHEMA_METADATA } from "../../helpers/decorator/zodSchema.decorator";
import { z } from "zod";







@Injectable()
export class PatientPipeValidator implements PipeTransform {
    constructor(
        private readonly reflector : Reflector,
        private readonly logger : PinoLogger,
    ){}

    transform(value: any, metadata: ArgumentMetadata) {

        if(!metadata.metatype) return value

        const schema = this.reflector.get<z.ZodType>(ZOD_SCHEMA_METADATA, metadata.metatype)
        const validate = schema.safeParse(value)


        if(!validate.success){

            this.logger.error("Erreur de validation de donnée")
    
            const formError = validate.error?.issues.reduce((acc, issue) => {

                acc[issue.path.join(".")] = issue.message
                return acc
            }, {} as Record<string, string>)

            this.logger.error({
                msg: "Detail error validation data ",
                dataError : formError
            })

            throw new BadRequestException({
                msg : "Detail Error validation",
                dataError: JSON.stringify(formError),
                status : HttpStatus.BAD_REQUEST
            })
        }
        
        return validate.data 
    }
}