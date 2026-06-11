import { ArgumentsHost, Catch,} from "@nestjs/common";
import {SharedBaseExceptionFilter} from "../../../../../../libs/Filter/src/index"
import { HttpAdapterHost } from "@nestjs/core";
import { Logger } from "nestjs-pino";





@Catch()
export class PatientFilterException extends SharedBaseExceptionFilter {
    constructor(
       httpAdapterHost : HttpAdapterHost,
        logger : Logger
    ){
        super(httpAdapterHost, logger)
    }

    override catch(exception: unknown, host: ArgumentsHost): void {
        super.catch(exception, host)
    }

}