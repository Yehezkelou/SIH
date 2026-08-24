import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDocumentRepository } from "../repositories/userDocument.repository";
import { UserRepository } from "../repositories/user.repository";
import { AddUserDocumentInput, RemoveUserDocumentInput } from "../validator";
import { MESSAGE_ERROR_AUTH } from "../../../helpers/messageError";

@Injectable()
export class UserDocumentService {
    constructor(
        private readonly documentRepo: UserDocumentRepository,
        private readonly userRepo: UserRepository
    ) {}

    // 1. Ajouter un document avec upload de fichier
    async addDocument(data: AddUserDocumentInput, file: Express.Multer.File) {
        if (!file) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                code: MESSAGE_ERROR_AUTH.AUTH_DOCUMENT_FILE_REQUIRED.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_DOCUMENT_FILE_REQUIRED.MESSAGE,
            }, HttpStatus.BAD_REQUEST);
        }

        const user = await this.userRepo.findByIdentifier(data.userId || "");
        if (!user) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        return await this.documentRepo.addDocument(data, file);
    }

    // 2. Récupérer les documents d'un agent
    async findDocumentsByUserId(userId: string) {
        return await this.documentRepo.findDocumentsByUserId(userId);
    }

    // 3. Suppression douce d'un document
    async removeDocument(data: RemoveUserDocumentInput) {
        const result = await this.documentRepo.removeDocument(data);

        if (!result.existDocument) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR_AUTH.AUTH_DOCUMENT_NOT_FOUND.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_DOCUMENT_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        return { message: "Document justificatif retiré avec succès." };
    }
}
