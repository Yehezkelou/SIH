import { applyDecorators, UseInterceptors } from "@nestjs/common"
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express"
import { MulterConfigAdmissionFile } from "../config/multer.config"


export const UseAdmissionFiles = (field : string = "dossiers") => {
    return applyDecorators(
        UseInterceptors(FilesInterceptor(field, 10, MulterConfigAdmissionFile))
    )
}

export const UseAdmissionFile = (field : string = "dossier") => {
    return applyDecorators(
        UseInterceptors(FileInterceptor(field, MulterConfigAdmissionFile))
    )
} 