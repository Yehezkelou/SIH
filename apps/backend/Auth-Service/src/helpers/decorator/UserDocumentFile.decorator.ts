import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { MulterConfigUserDocumentFile } from "../config/multer.config";

export const UseUserDocumentFiles = (field: string = "documents") => {
    return applyDecorators(
        UseInterceptors(FilesInterceptor(field, 10, MulterConfigUserDocumentFile))
    );
};

export const UseUserDocumentFile = (field: string = "document") => {
    return applyDecorators(
        UseInterceptors(FileInterceptor(field, MulterConfigUserDocumentFile))
    );
};
