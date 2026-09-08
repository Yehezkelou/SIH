import { DynamicModule, Global, Module } from "@nestjs/common";


import {LoggerModule} from "nestjs-pino"


@Global()
@Module({})
export class LoggerModuleGlobale {

    static forRoot(serviceName : string) : DynamicModule {
        return {
            module : LoggerModuleGlobale,
            imports : [
                LoggerModule.forRoot({
                            pinoHttp : {
                                level : "info",
                                name : serviceName,
                                autoLogging : false,
                                serializers: {
                                                req: (req) => ({
                                                    id: req.id,
                                                    method: req.method,
                                                    url: req.url,
                                                    // On n'inclut délibérément pas req.headers, ni req.params
                                                }),
                                                res: (res) => ({
                                                    statusCode: res.statusCode,
                                                }),
                                            },
                                transport : {target : 'pino-pretty', options : {
                                    colorize : true,
                                    translateTime: "SYS:standard",
                                    ignore : "pid;hostman"
                                }},
                                genReqId : (req) => req.headers["x-request-id"] || Math.random().toString(36).substring(7)
                            }
                       
        
                })
            ],

            exports : [LoggerModule]
        }
    }
}