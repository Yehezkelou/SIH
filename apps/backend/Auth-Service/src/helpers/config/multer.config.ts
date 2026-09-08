import { BadRequestException } from "@nestjs/common";
import * as fs from "fs";
import { diskStorage } from "multer";
import { extname } from "path";

// Taille maximale : 10 Mo
const MAX_SIZE_FILE = 10 * 1024 * 1024;

// Formats MIME autorisés
const MIMETYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

// Racine de stockage des justificatifs du personnel
const UPLOAD_ROOT = "./upload/users";

export const MulterConfigUserDocumentFile = {
    storage: diskStorage({
        destination: (req: any, file, cb) => {
            if (!req.dossierUploadId) {
                req.dossierUploadId = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            }

            const dest = `${UPLOAD_ROOT}/${req.dossierUploadId}`;

            fs.mkdir(dest, { recursive: true }, (err) => {
                cb(err, dest);
            });
        },

        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
    }),

    limits: {
        fileSize: MAX_SIZE_FILE,
    },

    fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
        const valideFile = MIMETYPES.includes(file.mimetype);

        if (valideFile) {
            cb(null, true);
        } else {
            cb(
                new BadRequestException(
                    "Fichier invalide. Seuls les formats PDF, PNG, JPEG et JPG sont autorisés."
                ),
                false
            );
        }
    },
};
