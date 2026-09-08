import {registerAs} from "@nestjs/config"
import {DatabaseEnvSchema} from "../../../contracts/src/index";
import { Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common";



@Injectable()
export class DatabaseConfig {
   
    static  readonly logger = new Logger(DatabaseConfig.name)

    static Config = registerAs("database", () => {

            const config = DatabaseEnvSchema.safeParse(process.env)
            
            if(!config.success){

                this.logger.error("Erreur lors de la validation de la Configuration de la base de donnée")
                const FormatError = config.error.issues.reduce((acc, issue) => {

                    acc[issue.path.join(".")] = issue.message
                    return acc 
                }, {} as Record<string, string>)

                this.logger.error("Erreur configuration invalide",JSON.stringify(FormatError), null, 2)
            }

            return {
                host: config.data?.DB_HOST,
                username : config.data?.DB_USER,
                port : config.data?.DB_PORT,
                database : config.data?.DB_NAME,
                password : config.data?.DB_PASSWORD
            }
    }
)
}