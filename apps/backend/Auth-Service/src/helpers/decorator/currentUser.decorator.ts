import { createParamDecorator, ExecutionContext } from "@nestjs/common";






export interface ICurrentUser {
    id : string;
    sub: string;
    matricule: string;
    email : string;
    nom : string;
    prenom : string;
    personnelType : string;
    roles: string[];
    permissions: string[]
}

// injection de l'utilisateur
export const CurrentUser = createParamDecorator(
    (data : keyof ICurrentUser | undefined, ctx : ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return data && user ? user[data] : user;
    }
)