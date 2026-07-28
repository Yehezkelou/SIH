import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ArchivDossierRepository } from "../repositories/archivDossier.repository";
import { DeleteDossierInput, EXTENSION, FindAllDossierInput, FindOnlyDossierInput, ReplaceDossierInput } from "../validator";
import * as fs from "fs"
import path from "path";
import { MESSAGE_ERROR_ARCHIDOC } from "../../../helpers/messageError";



@Injectable()
export class ArchivDossierService {
    constructor(
        private readonly archivDossierRepository : ArchivDossierRepository
    ){}



    // replace dossier
    async replaceDossier(data : ReplaceDossierInput, file : Express.Multer.File){

        const existing = await this.archivDossierRepository.findOne({
            where : {id : data.dossierId, patient : {id: data.patientId}}
        })

        if(!existing){
             throw new HttpException({
                statusCode : HttpStatus.NOT_FOUND,
                code : MESSAGE_ERROR_ARCHIDOC.DOSSIER_NOT_FOUND.CODE,
                message : MESSAGE_ERROR_ARCHIDOC.DOSSIER_NOT_FOUND.MESSAGE
             }, HttpStatus.NOT_FOUND)
        }
        
        // recuperer l'ancien chemin du dossier 
        const oldPath = existing.url
       
        if(file){

            data.name = file.originalname
            data.taille = file.size.toString()
            data.extension = file.mimetype as EXTENSION
            data.date = new Date().toISOString()
            data.description = data.description ? data.description : `fichier joint ${data.name}`
        }

        //replace 
        const replace = await this.archivDossierRepository.replaceDossier(data)

        if(!replace){
            throw new HttpException({
                statusCode : HttpStatus.INTERNAL_SERVER_ERROR,
                code : MESSAGE_ERROR_ARCHIDOC.DOCUMENT_FOR_REPLACEMENT_ERROR.CODE,
                message : MESSAGE_ERROR_ARCHIDOC.DOCUMENT_FOR_REPLACEMENT_ERROR.MESSAGE
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

        if(file && oldPath && fs.existsSync(oldPath)){

            const replaceDirectory = `./upload/replace/${Date.now()}-${Math.round(Math.random() * 1e9)}`
            
            if(!fs.existsSync(replaceDirectory)){
                fs.mkdirSync(replaceDirectory, {recursive : true})
            }

            const fileName = path.basename(oldPath)
            const destinationPath = path.join(replaceDirectory, fileName)

            try{
                // déplacer le dossier 
                await fs.promises.rename(oldPath, destinationPath)

            }catch(error){
                throw new HttpException({
                    statusCode : HttpStatus.INTERNAL_SERVER_ERROR,
                    code : MESSAGE_ERROR_ARCHIDOC.MOVE_ERROR.CODE,
                    message : MESSAGE_ERROR_ARCHIDOC.MOVE_ERROR.MESSAGE,
                    detail : (error as Error).message
                }, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    // soft deleteDossier
    async softDeleteDossier(data : DeleteDossierInput){

        const existing = await this.archivDossierRepository.findOne({
            where : {id : data.dossierId, patient : {id : data.patientId}}
        })

        if(!existing) {
            throw new HttpException({
                statusCode : HttpStatus.NOT_FOUND,
                code : MESSAGE_ERROR_ARCHIDOC.DOSSIER_NOT_FOUND_SIMPLE.CODE,
                message : MESSAGE_ERROR_ARCHIDOC.DOSSIER_NOT_FOUND_SIMPLE.MESSAGE
            }, HttpStatus.NOT_FOUND)
        }

        const oldPath = existing.url

        // soft delete le dossier 
        const softDelete = await this.archivDossierRepository.softDeleteDossier(data)

        if(!softDelete){
            throw new HttpException({
                statusCode : HttpStatus.INTERNAL_SERVER_ERROR,
                code : MESSAGE_ERROR_ARCHIDOC.DOCUMENT_FOR_DELETION_ERROR.CODE,
                message : MESSAGE_ERROR_ARCHIDOC.DOCUMENT_FOR_DELETION_ERROR.MESSAGE
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

        if(oldPath && fs.existsSync(oldPath)){

            const deleteRepository = `./upload/delete/${Date.now()}-${Math.round(Math.random() * 1e9)}`

            if(!fs.existsSync(deleteRepository)){
                fs.mkdirSync(deleteRepository, {recursive : true})
            }

            const fileName = path.basename(oldPath)
            const destinationPath = path.join(deleteRepository, fileName)

            try {
                await fs.promises.rename(oldPath, destinationPath)
            }catch(error){
                throw new HttpException({
                    statusCode : HttpStatus.INTERNAL_SERVER_ERROR,
                    code : MESSAGE_ERROR_ARCHIDOC.MOVE_ERROR.CODE,
                    message : MESSAGE_ERROR_ARCHIDOC.MOVE_ERROR.MESSAGE,
                    detail : (error as Error).message
                }, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    
    }

    // find only dossier
    async findOnlyDossier(data : FindOnlyDossierInput){
    
        const dossier = this.archivDossierRepository.findOnlyDossier(data)

        if(!dossier) {
            throw new HttpException({
                statusCode : HttpStatus.NOT_FOUND,
                code : MESSAGE_ERROR_ARCHIDOC.DOSSIER_NOT_FOUND_SIMPLE.CODE,
                message : MESSAGE_ERROR_ARCHIDOC.DOSSIER_NOT_FOUND_SIMPLE.MESSAGE
            }, HttpStatus.NOT_FOUND)
        }

        return dossier
    }

   
}