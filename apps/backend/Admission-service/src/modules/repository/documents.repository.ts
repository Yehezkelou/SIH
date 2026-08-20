import {HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DataSource, EntityManager, In, Repository } from "typeorm";
import { AdmissionDocument } from "../entities";
import { UpdateAdmissionInput, documentCreateInput } from "../validator";
import * as fs from "fs";
import path from "path";
import { PinoLogger } from "nestjs-pino";



@Injectable()
export class DocumentRepository extends Repository<AdmissionDocument>{

    constructor(
        private readonly dataSouce : DataSource,
        private readonly logger : PinoLogger
    ){
        super(AdmissionDocument, dataSouce.createEntityManager())

    }

    // update document 
    async updateDocument(data : UpdateAdmissionInput, manager : EntityManager){

        const repoManager = manager || this.manager

        // aucun remplacement 
        if(!data.replacedDocuments || data.replacedDocuments.length === 0){
            return []
        }

        // recupere tout les ids 
        const documentIds = data.replacedDocuments.map((doc) => doc.id)
        const dbDocuments = await repoManager.find(AdmissionDocument, {
            where : {
                admission : {
                    id : data.admissionId,
                    patientId : data.patientId,
                    numeroPatient : data.numeroPatient,
                    admissionNumber : data.admissionNumber,
                },
                id : In(documentIds)
            }
        })

        const dbDocIdSet = new Set(dbDocuments.map((doc)=>doc.id))
        const notFound = data.replacedDocuments.filter((doc)=> !dbDocIdSet.has(doc.id))

        if(notFound.length > 0){
            return {
                existDocumets : false as const,
                notFound
            }
        }

        const updateDocuments = []

        for(const docUpdate of data.replacedDocuments){
            const dbDoc = dbDocuments.find((doc)=> doc.id === docUpdate.id)

            const isFileReplacement = docUpdate.documentUrl && docUpdate.documentUrl !== dbDoc?.documentUrl


            if(isFileReplacement){

                const oldPath = dbDoc?.documentUrl

                if(oldPath && fs.existsSync(oldPath)){
                    const archiveDirectory = `./upload/admission/archive/${Date.now()}-${Math.round(Math.random() * 1e9)}` 

                    if(!fs.existsSync(archiveDirectory)){
                        await fs.promises.mkdir(archiveDirectory, {recursive : true})
                    }

                    const filename = path.basename(oldPath)
                    const newPath = path.join(archiveDirectory, filename)

                    try{
                        await fs.promises.rename(oldPath, newPath)
                    }catch(error){
                        this.logger.error({
                           message : "ERREUR LORS DU MOUVEMENT DU DOSSIER" ,
                           detail : error,
                           context : "UpdateAdmission:UpdateDocument"
                        })
                        
                        throw new HttpException({
                            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                            messsage : "IMPOSSIBLE DE DEPLACER LES ANCIENNES VERS L ARCHIVE ",
                            code : "ERROR_MOVE_DOC",
                        },HttpStatus.INTERNAL_SERVER_ERROR)
                    }

                }
            }

            const updateDoc = await repoManager.merge(AdmissionDocument, dbDoc as AdmissionDocument, {
                documentName : docUpdate.documentName,
                
                ...(isFileReplacement && {
                    documentUrl : docUpdate.documentUrl,
                    documentSize : docUpdate.documentSize,
                    documentExtension : docUpdate.documentExtension,
                }),
            
                documentType : docUpdate.documentType,
                updatedBy : data.updatedBy

            })

            updateDocuments.push(updateDoc);

        }

        const savedDocuments = await repoManager.save(AdmissionDocument, updateDocuments);

        return {
            existDocuments : true as const,
            savedDocuments
        }
    }

    // ajout de nouveaux documents
    async addNewDocument(data : documentCreateInput){

        if(!data.documents || data.documents.length === 0){
            return []
        }

        const createDocuments = []
        const existingDocuments = []

        for(const newDoc of data.documents){
            
            const existingDocument = await this.findOne({
                where : {
                    admission : {
                        id : data.admissionId,
                        admissionNumber : data.admissionNumber,
                        patientId : data.patientId,
                        numeroPatient : data.numeroPatient
                    },
                    documentName : newDoc.documentName,
                    documentType : newDoc.documentType,
                }
            })

            if(existingDocument){
                // Le document existe déjà en base
                existingDocuments.push(existingDocument)
            }else{
                // Le document n'existe pas, on le prépare pour la création
                const create = this.create({
                    admission : {
                        id : data.admissionId,
                        numeroPatient : data.numeroPatient,
                        patientId : data.patientId,
                        admissionNumber : data.admissionNumber
                    },
                    documentName : newDoc.documentName,
                    documentUrl : newDoc.documentUrl,
                    documentType : newDoc.documentType,
                    documentSize : newDoc.documentSize,
                    documentExtension : newDoc.documentExtension,
                    attachedAt : new Date(), // Enregistre la date de liaison

                    createdBy : data.createdBy
                })

                createDocuments.push(create)
            }
        }

        // Sauvegarde de tous les nouveaux documents
        const savedDocuments = createDocuments.length > 0 
            ? await this.save(createDocuments) 
            : []

        return {
            hasCreated : savedDocuments.length > 0,
            hasExisting : existingDocuments.length > 0,
            ...(existingDocuments.length > 0 ? { existingDocuments } : {}),
            ...(savedDocuments.length > 0 ? { savedDocuments } : {})
        }
    }
}

    

    