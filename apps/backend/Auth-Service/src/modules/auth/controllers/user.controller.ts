import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
    Query,
    Res,
    UseGuards,
} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { PinoLogger } from "nestjs-pino";
import * as express from "express";
import { UseZodSchema } from "../../../helpers/decorator/zodSchema.decorator";
import { CurrentUser } from "../../../helpers/decorator/currentUser.decorator";
import { RequirePermissions } from "../../../helpers/decorator/requirePermission.decorator";
import { JwtAuthGuard, PermissionGuard } from "../../../shared/guards";
import {
    AssignRolesSchema,
    CreateUserSchema,
    QueryUsersSchema,
    UpdateUserSchema,
    UpdateUserStatusSchema,
    type AssignRolesInput,
    type CreateUserInput,
    type QueryUsersInput,
    type UpdateUserInput,
    type UpdateUserStatusInput,
} from "../validator";

@Controller("users")
@UseGuards(JwtAuthGuard, PermissionGuard)
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly logger: PinoLogger
    ) {
        this.logger.setContext(UserController.name);
    }

    // creation d'un agent (POST /api/users)
    @Post()
    @RequirePermissions("user:CREATE")
    @UseZodSchema(CreateUserSchema)
    async createUser(
        @Body() data: CreateUserInput,
        @CurrentUser("id") adminId: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Création d'un nouvel agent",
            context: "POST /api/users",
            matricule: data.matricule,
            email: data.email,
            adminId,
        });

        const result = await this.userService.createUser(data, adminId);

        return res.status(HttpStatus.CREATED).json({
            ...result,
            status: HttpStatus.CREATED,
            timeStamp: new Date().toISOString(),
        });
    }

    // liste paginee avec filtres (GET /api/users)
    @Get()
    @RequirePermissions("user:READ")
    async getUsers(
        @Query() query: QueryUsersInput,
        @Res() res: express.Response
    ) {
        const validatedQuery = QueryUsersSchema.parse(query);

        this.logger.info({
            message: "Consultation liste agents",
            context: "GET /api/users",
            page: validatedQuery.page,
            limit: validatedQuery.limit,
            search: validatedQuery.search,
            status: validatedQuery.status,
            isConnected: validatedQuery.isConnected,
        });

        const result = await this.userService.findAllUsers(validatedQuery);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // fiche detaillee d'un agent (GET /api/users/:id)
    @Get(":id")
    @RequirePermissions("user:READ")
    async getUserById(
        @Param("id") id: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Consultation fiche agent",
            context: "GET /api/users/:id",
            userId: id,
        });

        const user = await this.userService.findUserById(id);

        return res.status(HttpStatus.OK).json({
            user,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // modification d'un agent (PUT /api/users/:id)
    @Put(":id")
    @RequirePermissions("user:UPDATE")
    @UseZodSchema(UpdateUserSchema)
    async updateUser(
        @Param("id") id: string,
        @Body() data: UpdateUserInput,
        @CurrentUser("id") adminId: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Modification fiche agent",
            context: "PUT /api/users/:id",
            userId: id,
            adminId,
        });

        const result = await this.userService.updateUser(id, data, adminId);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // activation ou suspension (PATCH /api/users/:id/status)
    @Patch(":id/status")
    @RequirePermissions("user:STATUS")
    @UseZodSchema(UpdateUserStatusSchema)
    async updateStatus(
        @Param("id") id: string,
        @Body() data: UpdateUserStatusInput,
        @CurrentUser("id") adminId: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Changement de statut agent",
            context: "PATCH /api/users/:id/status",
            userId: id,
            newStatus: data.status,
            adminId,
        });

        const result = await this.userService.updateUserStatus(id, data, adminId);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // attribution de roles (POST /api/users/:id/roles)
    @Post(":id/roles")
    @RequirePermissions("role:UPDATE")
    @UseZodSchema(AssignRolesSchema)
    async assignRoles(
        @Param("id") userId: string,
        @Body() data: AssignRolesInput,
        @CurrentUser("id") adminId: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Attribution de rôles à un agent",
            context: "POST /api/users/:id/roles",
            userId,
            adminId,
        });

        const result = await this.userService.assignRolesToUser(userId, data, adminId);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // revocation d'un role (DELETE /api/users/:id/roles/:roleId)
    @Delete(":id/roles/:roleId")
    @RequirePermissions("role:UPDATE")
    async removeRole(
        @Param("id") userId: string,
        @Param("roleId") roleId: string,
        @CurrentUser("id") adminId: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Révocation d'un rôle d'un agent",
            context: "DELETE /api/users/:id/roles/:roleId",
            userId,
            roleId,
            adminId,
        });

        const result = await this.userService.removeRoleFromUser(userId, roleId, adminId);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // suppression douce (DELETE /api/users/:id)
    @Delete(":id")
    @RequirePermissions("user:DELETE")
    async deleteUser(
        @Param("id") id: string,
        @CurrentUser("id") adminId: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Suppression douce compte agent",
            context: "DELETE /api/users/:id",
            userId: id,
            adminId,
        });

        const result = await this.userService.deleteUser(id, adminId);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }
}
