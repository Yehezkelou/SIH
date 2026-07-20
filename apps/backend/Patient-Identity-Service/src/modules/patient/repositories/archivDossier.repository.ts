import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ArchivDossier } from "../entities/archivDossier.entity";





@Injectable()
export class ArchivDossierRepository extends Repository<ArchivDossier> {
    constructor(
        private dataSource: DataSource
    ){
        super(ArchivDossier, dataSource.createEntityManager())
    }

    // create ArchivDossier
    async createArchivDossier(){

    }

    
}