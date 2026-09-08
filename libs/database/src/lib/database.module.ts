import { DynamicModule, Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatabaseConfig } from "./database.config.js";
import {TypeOrmModule} from "@nestjs/typeorm"
import  {LoggerModuleGlobale} from "../../../../libs/logger/src/index"
import {initTracing} from "../../../logger/src/index.js"

initTracing("DatabaseConfig")

@Global()
@Module({
    imports : [
        LoggerModuleGlobale.forRoot("DatabaseService")
    ]
})
export class DatabaseModule {
    
    static forRoot(entities: any[] = []) : DynamicModule {
        return {
            module : DatabaseModule,
            imports : [
                ConfigModule.forFeature(DatabaseConfig.Config),
                TypeOrmModule.forRootAsync({
                    imports : [ConfigModule],
                    inject : [ConfigService],
                    useFactory : (configService : ConfigService) => {

                        const db = configService.get("database")
                
                        return {
                            type : "postgres",
                            ...db,
                            entities,
                            synchronize : true
                        }
                    }
                })
            
            ],

            exports : [TypeOrmModule],
        }
    }
}
