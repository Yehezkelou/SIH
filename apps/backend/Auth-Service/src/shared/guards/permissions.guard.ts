import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PERMISSIONS_KEY } from "../../helpers/decorator/requirePermission.decorator";
import { MESSAGE_ERROR_AUTH } from "../../helpers/messageError";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // aucune permission requise
        if (!requiredPermissions || requiredPermissions.length === 0) {
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

        // acces total superadmin ou wildcard
        if (user.roles?.includes("SUPER_ADMIN") || user.permissions?.includes("*")) {
            return true;
        }

        // verification de la presence des permissions
        const hasPermission = requiredPermissions.every((perm) => user.permissions?.includes(perm));

        if (!hasPermission) {
            throw new HttpException({
                statusCode: HttpStatus.FORBIDDEN,
                code: MESSAGE_ERROR_AUTH.AUTH_FORBIDDEN.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_FORBIDDEN.MESSAGE,
            }, HttpStatus.FORBIDDEN);
        }

        return true;
    }
}