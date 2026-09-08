import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { DocumentService } from "../services/document.service";
import { PinoLogger } from "nestjs-pino";
import * as express from "express";
import type { 
    AddDocumentInput, 
    RemoveDocumentInput } from "../validator";

@Controller("admission")
export class DocumentController {
    constructor(
        private readonly service: DocumentService,
        private readonly logger: PinoLogger
    ) {
        this.logger.setContext(DocumentController.name);
    }

    // POST /admission/:id/document - Attacher un document (upload multipart single)
    @Post(":id/document")
    @UseInterceptors(FileInterceptor("file"))
    async addDocument(
        @Param("id") admissionId: string,
        @Body() data: AddDocumentInput,
        @UploadedFile() file: Express.Multer.File,
        @Res() res: express.Response
    ) {
        data.admissionId = admissionId;

        this.logger.info({
            message: "Upload et attachement d'un document",
            context: "POST /admission/:id/document",
            admissionId,
            documentType: data.documentType,
        });

        const document = await this.service.addDocument(data, file);

        return res.status(HttpStatus.CREATED).json({
            message: "Document attaché avec succès",
            document,
            status: HttpStatus.CREATED,
            timeStamp: new Date().toISOString(),
        });
    }

    // DELETE /admission/document/:documentId - Retire un document (soft delete)
    @Delete("document/:documentId")
    async removeDocument(
        @Param("documentId") documentId: string,
        @Body() data: RemoveDocumentInput,
        @Res() res: express.Response
    ) {
        data.documentId = documentId;

        this.logger.info({
            message: "Suppression douce d'un document",
            context: "DELETE /admission/document/:documentId",
            documentId,
        });

        const result = await this.service.removeDocument(data);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // GET /admission/:id/document - Liste des documents d'une admission
    @Get(":id/document")
    async findDocumentsByAdmission(
        @Param("id") admissionId: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Consultation des documents d'une admission",
            context: "GET /admission/:id/document",
            admissionId,
        });

        const documents = await this.service.findDocumentsByAdmission({ admissionId });

        return res.status(HttpStatus.OK).json({
            message: "Documents récupérés avec succès",
            documents,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }
}
