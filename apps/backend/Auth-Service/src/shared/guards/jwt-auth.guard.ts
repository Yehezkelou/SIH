import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "../../helpers/decorator/public.decorator";
import { MESSAGE_ERROR_AUTH } from "../../helpers/messageError";
import { PersonnelType } from "../../modules/auth/entities";





@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(
        private readonly jwtService : JwtService,
        private readonly reflector : Reflector
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

        if(isPublic){
            return true
        }

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            throw new HttpException({
                code : MESSAGE_ERROR_AUTH.AUTH_UNAUTHORIZED.CODE,
                message : MESSAGE_ERROR_AUTH.AUTH_UNAUTHORIZED.MESSAGE
            }, HttpStatus.UNAUTHORIZED)
        }

        const token = authHeader.split(" ")[1];

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.USER_JWT_SECRET || "default_user_secret",
            });

            request.user =  {
                id : payload.sub,
                sub : payload.sub,
                matricule : payload.matricule,
                email : payload.email,
                nom : payload.nom,
                prenom : payload.prenom,
                personnelType : payload.personnelType,
                roles : payload.roles || [],
                permissions : payload.permissions || [],
            }

            return true;
        }catch (error){
            if(error){
                throw new HttpException({
                    code : MESSAGE_ERROR_AUTH.AUTH_TOKEN_EXPIRED.CODE,
                    message : MESSAGE_ERROR_AUTH.AUTH_TOKEN_EXPIRED.MESSAGE
                }, HttpStatus.UNAUTHORIZED)
            }

            throw error;
        }
    }
}