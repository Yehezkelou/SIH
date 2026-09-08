import { ArgumentsHost, Catch} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import {SharedBaseExceptionFilter} from "../../../../../../libs/Filter/src/index"
import { Logger } from "nestjs-pino";

@Catch()
export class AdmissionFilterException extends SharedBaseExceptionFilter {

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
    