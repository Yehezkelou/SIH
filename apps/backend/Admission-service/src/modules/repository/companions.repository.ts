import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, In, Repository } from "typeorm";
import { AdmissionCompanion, Relationship } from "../entities";
import { companionCreateInput, UpdateAdmissionInput, AddCompanionInput, UpdateCompanionInput, RemoveCompanionInput, FindCompanionsByAdmissionInput } from "../validator";





@Injectable()
export class CompanionRepository extends Repository<AdmissionCompanion>{

    constructor(
        private readonly dataSource : DataSource,
    ){
        super(AdmissionCompanion, dataSource.createEntityManager())
    }


    // update companions 
    async updateCompanions(data : UpdateAdmissionInput, manager : EntityManager){

        const repoManager = manager || this.manager

        // si il n'y a pas de companions 
        if(!data.Companions || data.Companions.length === 0){
            return []
        }

        const foundIdCompanions = (data.Companions ?? []).map((doc)=> doc.id).filter(Boolean)
        const dbCompanionsId = await manager.find(AdmissionCompanion, {
            where : {
                admission : {
                    id : data.admissionId,
                    patientId : data.patientId,
                    admissionNumber : data.admissionNumber,
                    numeroPatient : data.numeroPatient
                },
                id : In(foundIdCompanions)
            }
        })

        const existCompanions = dbCompanionsId
        const foundIdSet = new Set(existCompanions.map((doc)=> doc.id))
        const notFound = foundIdCompanions.filter((id)=> !foundIdSet.has(id))

        if(notFound.length > 0){
            return {
                existCompanions : false as const,
                notFound
            }
        }
        
        const updateCompanions = []

        for(const updateComp of data.Companions){

            const dbComp = dbCompanionsId.find((doc)=> doc.id === updateComp.id)

            if(dbComp){
                const update = await manager.merge(AdmissionCompanion, dbComp, {
                    firstName : updateComp.firstName,
                    lastName : updateComp.lastName,
                    phoneNumber : updateComp.phoneNumber,
                    address : updateComp.address,
                    relationship : updateComp.relationship as Relationship,

                    updatedBy : data.updatedBy
                })

                updateCompanions.push(update)
            }
        }

        const savedCompanions = await manager.save(AdmissionCompanion, updateCompanions)

        return {
            existCompanions : true as const,
            savedCompanions
        }
    }

    // ajout un nouveau companion 
    async addNewCompanion(data : companionCreateInput){

        if(!data.companions || data.companions.length === 0){
            return[]
        }

        const createCompanions = []
        const existingCompanions = []

        for(const newComp of data.companions){
            
            const existingCompanion = await this.findOne({
                where : {
                    admission : {
                        id : data.admissionId,
                        admissionNumber : data.admissionNumber,
                        patientId : data.patientId,
                        numeroPatient : data.numeroPatient
                    },
                    firstName : newComp.firstName,
                    lastName : newComp.lastName,
                    phoneNumber : newComp.phoneNumber,
                    relationship : newComp.relationship as Relationship,
                    address : newComp.address,
                }
            })

            if(existingCompanion){
                existingCompanions.push(existingCompanion)

            }else{
                const create = this.create({
                    admission : {
                        id : data.admissionId,
                        numeroPatient : data.numeroPatient,
                        patientId : data.patientId,
                        admissionNumber : data.admissionNumber
                    },
                    lastName : newComp.lastName,
                    firstName : newComp.firstName,
                    address : newComp.address,
                    phoneNumber : newComp.phoneNumber,
                    relationship : newComp.relationship as Relationship,

                    createdBy : data.createdBy
                })

                createCompanions.push(create)
            }
        }

        const savedCompanions = await this.save(createCompanions)

        return{
            existingCompanions :
             createCompanions.length > 0 
             ? true as const : 
              existingCompanions.length > 0
              ? false as const
              : undefined,

            ...(existingCompanions.length > 0 ? {existingCompanions} : {}),

            ...(createCompanions.length > 0 ? {savedCompanions} : {})
            
        }
    }

    // 1. Ajout d'un accompagnant 
    async addSingleCompanion(data: AddCompanionInput, manager?: EntityManager) {
        const repo = manager ? manager.getRepository(AdmissionCompanion) : this;

        const companion = repo.create({
            admissionId: data.admissionId,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            relationship: data.relationship as Relationship,
            address: data.address,
            createdBy: data.createdBy,
        });

        const savedCompanion = await repo.save(companion);
        return savedCompanion;
    }

    // 2. Modification d'un accompagnant 
    async updateSingleCompanion(data: UpdateCompanionInput, manager?: EntityManager) {
        const repo = manager ? manager.getRepository(AdmissionCompanion) : this;

        const companion = await repo.findOne({
            where: {
                id: data.companionId,
                admissionId: data.admissionId,
            },
        });

        if (!companion) {
            return {
                existCompanion: false as const,
                companion: null,
            };
        }

        repo.merge(companion, {
            firstName: data.firstName || companion.firstName,
            lastName: data.lastName || companion.lastName,
            phoneNumber: data.phoneNumber || companion.phoneNumber,
            relationship: (data.relationship as Relationship) || companion.relationship,
            address: data.address || companion.address,
            updatedBy: data.updatedBy,
        });

        const updatedCompanion = await repo.save(companion);

        return {
            existCompanion: true as const,
            companion: updatedCompanion,
        };
    }

    // 3. Suppression douce d'un accompagnant 
    async removeSingleCompanion(data: RemoveCompanionInput, manager?: EntityManager) {
        const repo = manager ? manager.getRepository(AdmissionCompanion) : this;

        const companion = await repo.findOne({
            where: {
                id: data.companionId,
                admissionId: data.admissionId,
            },
        });

        if (!companion) {
            return {
                existCompanion: false as const,
            };
        }

        companion.deletedBy = data.deletedBy;
        await repo.save(companion);
        await repo.softRemove(companion);

        return {
            existCompanion: true as const,
        };
    }

    // 4. Recherche des accompagnants d'une admission
    async findCompanionsByAdmission(data: FindCompanionsByAdmissionInput) {
        return await this.find({
            where: {
                admissionId: data.admissionId,
            },
            order: {
                createdAt: "DESC",
            },
        });
    }
}

