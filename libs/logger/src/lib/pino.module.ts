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
                                transport : {target : 'pino-pretty'},
                                customProps : (res, req) => ({
                                    context : 'HTTP'
                                })
                            }
                       
        
                })
            ],

            exports : [LoggerModule]
        }
    }
}