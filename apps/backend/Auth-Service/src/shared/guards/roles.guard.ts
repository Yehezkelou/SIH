import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../../helpers/decorator/roles.decorator";
import { MESSAGE_ERROR_AUTH } from "../../helpers/messageError";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                code: MESSAGE_ERROR_AUTH.AUTH_UNAUTHORIZED.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_UNAUTHORIZED.MESSAGE,
            }, HttpStatus.UNAUTHORIZED);
        }

        // acces total superadmin
        if (user.roles?.includes("SUPER_ADMIN")) {
            return true;
        }

        // verifie au moins un role correspondant
        const hasRole = requiredRoles.some((role) => user.roles?.includes(role));

        if (!hasRole) {
            throw new HttpException({
                statusCode: HttpStatus.FORBIDDEN,
                code: MESSAGE_ERROR_AUTH.AUTH_FORBIDDEN.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_FORBIDDEN.MESSAGE,
            }, HttpStatus.FORBIDDEN);
        }

        return true;
    }
}
