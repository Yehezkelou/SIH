import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Logger } from "nestjs-pino";
import { status } from "@grpc/grpc-js";
import { Observable, throwError } from "rxjs";
import { RpcException } from "@nestjs/microservices";

// Mappage automatique des status HTTP vers les status gRPC
const HTTP_TO_STATUS_MAP: Record<number, number> = {
    [HttpStatus.BAD_REQUEST]: status.INVALID_ARGUMENT,
    [HttpStatus.UNAUTHORIZED]: status.UNAUTHENTICATED,
    [HttpStatus.FORBIDDEN]: status.PERMISSION_DENIED,
    [HttpStatus.NOT_FOUND]: status.NOT_FOUND,
    [HttpStatus.CONFLICT]: status.ALREADY_EXISTS,
    [HttpStatus.TOO_MANY_REQUESTS]: status.RESOURCE_EXHAUSTED,
    [HttpStatus.INTERNAL_SERVER_ERROR]: status.INTERNAL,
};

@Injectable()
export abstract class SharedBaseExceptionFilter implements ExceptionFilter {

    constructor(
        protected readonly httpAdapterHost: HttpAdapterHost,
        protected readonly logger: Logger
    ) {}

    catch(exception: unknown, host: ArgumentsHost): void | Observable<any> {
        const typeHost = host.getType();

        if (typeHost === "http") {
            this.handleHttp(exception, host);
        } else if (typeHost === "rpc") {
            return this.handleGrcp(exception, host);
        }else {
            this.logger.error("Unhandled exception type : " + typeHost, exception);
        }
    }

    // Formdata response HTTP
    private formaData(status: number, pathRequest: string, message: string | object, data?: any) {
        return {
            status,
            message,
            data,
            timestamp: new Date().toISOString(),
            path: pathRequest,
        };
    }

    // Switch to HTTP
    private handleHttp(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const { httpAdapter } = this.httpAdapterHost;
        const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : null;

        const getObjectException = typeof exceptionResponse === "object" && exceptionResponse !== null;

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : { error: "Internal server error", detail: exception instanceof Error ? exception.message : "Unknown Error" };

        this.logger.error(`HTTP Error : ${httpStatus} - path : ${request.url}`);

        httpAdapter.reply(
            response,
            this.formaData(httpStatus, request.url, message, getObjectException ? (exceptionResponse as any).data : null),
            httpStatus
        );
    }

    // Switch to gRPC / RPC
    private handleGrcp(exception: any, host: ArgumentsHost): Observable<any> {
        let grpcCode = status.INTERNAL;
        let message = "Erreur interne du microservice gRPC";
        let details: any = null;

        if (exception instanceof RpcException) {
            const errorRes = exception.getError();
            if (typeof errorRes === "object" && errorRes !== null) {
                grpcCode = (errorRes as any).code ?? status.INTERNAL;
                message = (errorRes as any).message ?? message;
                details = (errorRes as any).details ?? null;
            } else if (typeof errorRes === "string") {
                message = errorRes;
            }
        } else if (exception instanceof HttpException) {
            const httpStatus = exception.getStatus();
            grpcCode = HTTP_TO_STATUS_MAP[httpStatus] ?? status.INTERNAL;
            const res = exception.getResponse();
            message = typeof res === "string" ? res : (res as any).message || exception.message;
            details = typeof res === "object" ? res : null;
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        this.logger.error({
            message: `gRPC Error ${grpcCode} - ${message}`,
            context: "gRPC ExceptionFilter",
            grpcCode,
            details,
            stack: exception instanceof Error ? exception.stack : undefined,
        });

        // Utilisation de la syntaxe non dépréciée de RxJS (factory function)
        return throwError(() => ({
            code: grpcCode,
            message: message,
        }));
    }

    // switch de rabbitMq
}
