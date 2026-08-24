import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
    UploadedFile,
    UseGuards,
} from "@nestjs/common";
import { UserDocumentService } from "../services/userDocument.service";
import { UseUserDocumentFile } from "../../../helpers/decorator/UserDocumentFile.decorator";
import { RequirePermissions } from "../../../helpers/decorator/requirePermission.decorator";
import { JwtAuthGuard, PermissionGuard } from "../../../shared/guards";
import { PinoLogger } from "nestjs-pino";
import * as express from "express";
import { UseZodSchema } from "../../../helpers/decorator/zodSchema.decorator";
import {
    AddUserDocumentSchema,
    RemoveUserDocumentSchema,
    type AddUserDocumentInput,
    type RemoveUserDocumentInput,
} from "../validator";

@Controller("users")
@UseGuards(JwtAuthGuard, PermissionGuard)
export class UserDocumentController {
    constructor(
        private readonly documentService: UserDocumentService,
        private readonly logger: PinoLogger
    ) {
        this.logger.setContext(UserDocumentController.name);
    }

    // POST /api/users/:id/documents - Attacher un document justificatif
    @Post(":id/documents")
    @RequirePermissions("user:UPDATE")
    @UseUserDocumentFile("document")
    @UseZodSchema(AddUserDocumentSchema)
    async addDocument(
        @Param("id") userId: string,
        @Body() data: AddUserDocumentInput,
        @UploadedFile() file: Express.Multer.File,
        @Res() res: express.Response
    ) {
        data.userId = userId;

        this.logger.info({
            message: "Upload d'un document justificatif d'agent",
            context: "POST /api/users/:id/documents",
            userId,
            documentType: data.documentType,
        });

        const document = await this.documentService.addDocument(data, file);

        return res.status(HttpStatus.CREATED).json({
            message: "Document justificatif attaché avec succès",
            document,
            status: HttpStatus.CREATED,
            timeStamp: new Date().toISOString(),
        });
    }

    // GET /api/users/:id/documents - Liste des documents d'un agent
    @Get(":id/documents")
    @RequirePermissions("user:READ")
    async getDocuments(
        @Param("id") userId: string,
        @Res() res: express.Response
    ) {
        const documents = await this.documentService.findDocumentsByUserId(userId);

        return res.status(HttpStatus.OK).json({
            documents,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // DELETE /api/users/:id/documents/:documentId - Suppression douce d'un document
    @Delete(":id/documents/:documentId")
    @RequirePermissions("user:UPDATE")
    @UseZodSchema(RemoveUserDocumentSchema)
    async removeDocument(
        @Param("id") userId: string,
        @Param("documentId") documentId: string,
        @Res() res: express.Response
    ) {
        const data: RemoveUserDocumentInput = { userId, documentId };

        this.logger.info({
            message: "Suppression d'un document justificatif",
            context: "DELETE /api/users/:id/documents/:documentId",
            userId,
            documentId,
        });

        const result = await this.documentService.removeDocument(data);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }
}
