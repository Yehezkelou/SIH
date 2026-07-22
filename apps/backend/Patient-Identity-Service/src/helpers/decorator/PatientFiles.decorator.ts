import { applyDecorators, UseInterceptors } from "@nestjs/common"
import {FileInterceptor, FilesInterceptor } from "@nestjs/platform-express"
import { MulterConfiPatientFile } from "../config/multer.config"



export const UsePatientFiles = (fields : string = "dossiers") => {
    applyDecorators(
        UseInterceptors(FilesInterceptor(fields, 10, MulterConfiPatientFile))
    )
}

export const UsePatientFile = (field : string = "dossier") =>{
    applyDecorators(
        UseInterceptors(FileInterceptor(field, MulterConfiPatientFile))
    )
}