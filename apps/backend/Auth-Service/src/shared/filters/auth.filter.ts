import { ArgumentsHost, Catch } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Logger } from "nestjs-pino";
import { SharedBaseExceptionFilter } from "../../../../../../libs/Filter/src/index";

@Catch()
export class AuthFilterException extends SharedBaseExceptionFilter {
    constructor(
        httpAdapterHost: HttpAdapterHost,
        logger: Logger
    ) {
        super(httpAdapterHost, logger);
    }

    override catch(exception: unknown, host: ArgumentsHost): void {
        super.catch(exception, host);
    }
}
