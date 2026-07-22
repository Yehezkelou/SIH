import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ArchivDossier } from "../entities/archivDossier.entity";
import { CreateArchivDossierInput } from "../validator";





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


        const result = this.save(dossier)

        return result
    }

    
}