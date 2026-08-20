import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DocumentRepository } from "../repository/documents.repository";
import { MESSAGE_ERROR } from "../../helpers/messageError";
import {
    AddDocumentInput,
    RemoveDocumentInput,
    FindDocumentsByAdmissionInput,
} from "../validator/index";

@Injectable()
export class DocumentService {

    constructor(
        private readonly documentRepository: DocumentRepository,
    ) {}

    // 1. Ajout d'un document avec fichier uploadé Multer (POST /admission/:id/document)
    async addDocument(data: AddDocumentInput, file: Express.Multer.File) {
        if (!file) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                code: MESSAGE_ERROR.DOCUMENT_FILE_REQUIRED.CODE,
                message: MESSAGE_ERROR.DOCUMENT_FILE_REQUIRED.MESSAGE,
            }, HttpStatus.BAD_REQUEST);
        }

        return await this.documentRepository.addSingleDocument(data, file);
    }

    // 2. Suppression douce d'un document (DELETE /admission/document/:documentId)
    async removeDocument(data: RemoveDocumentInput) {
        const result = await this.documentRepository.removeSingleDocument(data);

        if (!result.existDocument) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR.DOCUMENT_NOT_FOUND.CODE,
                message: MESSAGE_ERROR.DOCUMENT_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        return { message: "Document retiré avec succès" };
    }

    // 3. Liste des documents d'une admission (GET /admission/:id/document)
    async findDocumentsByAdmission(data: FindDocumentsByAdmissionInput) {
        return await this.documentRepository.findDocumentsByAdmission(data);
    }
}
