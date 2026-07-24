import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ArchivDossier } from "../entities/archivDossier.entity";
import { CreateArchivDossierInput, DeleteDossierInput, FindOnlyDossierInput, ReplaceDossierInput } from "../validator";




@Injectable()
export class ArchivDossierRepository extends Repository<ArchivDossier> {
    constructor(
       dataSource: DataSource
    ){
        super(ArchivDossier, dataSource.createEntityManager())
    }

    // create ArchivDossier
    async createArchivDossier(data : CreateArchivDossierInput[]){

        const existings = []

        for(const d of data){

            const  existing = await this.findOne({
                where : [
                    {name : d.name},
                    {patient : {id : d.patientId}}
                ]
            })

            if(existing){
                existings.push(existing)
                continue;
            }

        }

        const dossier = this.create(data)

        const result = await this.save(dossier)

        return {
            result,
            existings : existings.length > 0 ? existings : null
        }
    }


    // replace dossier
    async replaceDossier(data : ReplaceDossierInput){

        const existing = await this.findOne({
            where : [
                {id : data.dossierId},
                {patient : {id : data.patientId}}
            ]
        })

        if(!existing) return null


        Object.assign(existing, {
            typeDoc : data.typeDoc ?? existing.typeDoc,
            name : data.name ?? existing.name,
            taille : data.taille ?? existing.taille,
            extension : data.extension ?? existing.extension,
            date : data.date ?? existing.date,
            url : data.url ?? existing.url,
            description : data.description ?? existing.description,
            updateBy : data.updatedBy ?? existing.updatedBy
        })

        return await this.save(existing)
    }

    // soft delete dossier
    async softDeleteDossier(data : DeleteDossierInput){

        const existing = await this.findOne({
            where : { id : data.dossierId, patient : {id : data.patientId}}
        })

        if(!existing) return null

        existing.deletedBy = data.deletedBy

        return await this.softDelete(existing)

    }


    // find only dossier 
    async findOnlyDossier(data : FindOnlyDossierInput){

        switch(data.typeDoc){
            case "CNI" : {
                const existing = this.findOne({
                    where : {
                        id : data.dossierId,
                        patient : {id : data.patientId},
                        typeDoc : "CNI"
                    }
                })

                if(!existing) return null 

                return existing
            }

            case "PASSPORT" : {
                const existing = this.findOne({
                    where : {
                        id : data.dossierId,
                        patient : {id : data.patientId},
                        typeDoc : "PASSPORT"
                    }
                })

                if(!existing) return null 

                return existing
            }

            case "ATTESTATION" : {
                const existing = this.findOne({
                    where : {
                        id : data.dossierId,
                        patient : {id : data.patientId},
                        typeDoc : "ATTESTATION"
                    }
                })

                if(!existing) return null 

                return existing
            }

            case "ACTE_NAISSANCE" : {
                const existing = this.findOne({
                    where : {
                        id : data.dossierId,
                        patient : {id : data.patientId},
                        typeDoc : "ACTE_NAISSANCE"
                    }
                })

                if(!existing) return null 

                return existing
            }

            case "AUTRE" : {
                const existing = this.findOne({
                    where : {
                        id : data.dossierId,
                        patient : {id : data.patientId},
                        typeDoc : "AUTRE"
                    }
                })

                if(!existing) return null 

                return existing
            }
        }
    }

    // 

    
}