import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserDocument } from "../entities";
import { AddUserDocumentInput, RemoveUserDocumentInput } from "../validator";
import * as fs from "fs";
import path, { extname } from "path";
import { PinoLogger } from "nestjs-pino";
import { MESSAGE_ERROR_AUTH } from "../../../helpers/messageError";

@Injectable()
export class UserDocumentRepository extends Repository<UserDocument> {
    constructor(
        dataSource: DataSource,
        private readonly logger: PinoLogger
    ) {
        super(UserDocument, dataSource.createEntityManager());
    }

    // 1. Sauvegarde d'un document justificatif (Multer a déjà écrit le fichier sur le disque)
    async addDocument(data: AddUserDocumentInput, file: Express.Multer.File): Promise<UserDocument> {
        const extension = extname(file.originalname).replace(".", "") || "bin";

        const document = this.create({
            userId: data.userId,
            documentType: data.documentType,
            documentName: file.originalname,
            documentUrl: file.path,
            documentSize: file.size,
            documentExtension: extension,
            numeroDocument: data.numeroDocument,
            dateDelivrance: data.dateDelivrance,
            dateExpiration: data.dateExpiration,
            attachedAt: new Date(),
        });

        return await this.save(document);
    }

    // 2. Récupérer les documents d'un agent
    async findDocumentsByUserId(userId: string): Promise<UserDocument[]> {
        return await this.find({
            where: { userId },
            order: { createdAt: "DESC" },
        });
    }

    // 3. Suppression douce (Déplace le fichier physique dans ./upload/users/deleted/ sans le détruire)
    async removeDocument(data: RemoveUserDocumentInput): Promise<{ existDocument: boolean }> {
        const doc = await this.findOne({
            where: {
                id: data.documentId,
                userId: data.userId,
            },
        });

        if (!doc) {
            return { existDocument: false };
        }

        // Déplacement physique du fichier vers le dossier des fichiers supprimés
        if (doc.documentUrl && fs.existsSync(doc.documentUrl)) {
            const deleteDirectory = `./upload/users/deleted/${Date.now()}-${Math.round(Math.random() * 1e9)}`;

            if (!fs.existsSync(deleteDirectory)) {
                await fs.promises.mkdir(deleteDirectory, { recursive: true });
            }

            const filename = path.basename(doc.documentUrl);
            const newPath = path.join(deleteDirectory, filename);

            try {
                await fs.promises.rename(doc.documentUrl, newPath);
                doc.documentUrl = newPath;
            } catch (error) {
                this.logger.error({
                    message: "ERREUR LORS DU DEPLACEMENT DU FICHIER SUPPRIME",
                    detail: error,
                    context: "UserDocumentRepository:removeDocument",
                });
                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: MESSAGE_ERROR_AUTH.AUTH_DOCUMENT_MOVE_FAILED.MESSAGE,
                        code: MESSAGE_ERROR_AUTH.AUTH_DOCUMENT_MOVE_FAILED.CODE,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }

        await this.save(doc);
        await this.softRemove(doc);

        return { existDocument: true };
    }
}
