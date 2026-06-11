import {ArgumentsHost,ExceptionFilter, HttpException, HttpStatus, Injectable} from "@nestjs/common"
import { HttpAdapterHost } from "@nestjs/core"
import { Logger } from "nestjs-pino"







@Injectable()
export abstract class SharedBaseExceptionFilter implements ExceptionFilter {

    constructor(
        protected readonly httpAdapterHost : HttpAdapterHost,
        protected readonly logger : Logger
    ){}


    catch(exception: unknown, host: ArgumentsHost): void{
        const typeHost = host.getType()


        if(typeHost == "http"){
            this.handleHttp(exception, host)
        }else if(typeHost == "rpc"){
            this.handleGrcp(exception, host)
        }else {
            this.logger.error("Unhandled exception type : ", exception)
        }
    }

    // formdata 
    private formaData(status : number, pathRequest : string, message : string | object){
        return {
            status,
            message,
            timestamp : new Date().toISOString(),
            path : pathRequest
        }
    }

    // swtch to http
    private handleHttp(exception : unknown, host : ArgumentsHost){
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const {httpAdapter} = this.httpAdapterHost



        // get status adater
        const httpStatus = 
            exception instanceof HttpException 
            ? exception.getStatus() 
            : HttpStatus.INTERNAL_SERVER_ERROR

        
        // get message 
        const message = 
            exception instanceof HttpException 
            ? exception.getResponse()
            : {error : "Internal server error", detail : exception instanceof Error ? exception.message : "Unknown Error"}

            this.logger.error(`HTTP Error : ${httpStatus} - path : ${request.url}`)


        httpAdapter.reply(response, this.formaData(httpStatus, request.url, message), httpStatus)
    }

    //switch to grpc 
    private handleGrcp(exception : any, host : ArgumentsHost){
        // logique plutard 
    }

}






