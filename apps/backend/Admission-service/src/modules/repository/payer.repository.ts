import { Inject, Injectable } from "@nestjs/common";
import { DataSource, EntityManager, In, Repository } from "typeorm";
import { AdmissionPayer, AdmissionPayerType } from "../entities";
import { UpdateAdmissionInput, payerCreateInput, AddPayerInput, UpdatePayerInput, RemovePayerInput, FindPayersByAdmissionInput } from "../validator";






@Injectable()
export class PayersRepository extends Repository<AdmissionPayer>{

    constructor(
        private readonly data : DataSource
    ){
        super(AdmissionPayer, data.createEntityManager())
    }


    async updatePayers(data : UpdateAdmissionInput, manage: EntityManager){

        const repoManager = manage || this.manager

        if(!data.Payers || data.Payers.length === 0){
            return []
        }

        const foundIdPayers = (data.Payers ?? []).map((doc) => doc.id).filter(Boolean)
        const dbPayersId = await repoManager.find(AdmissionPayer, {
            where: {
                admission : {
                    id : data.admissionId,
                    patientId : data.patientId,
                    admissionNumber : data.admissionNumber,
                    numeroPatient : data.numeroPatient
                },
                id : In(foundIdPayers)
            }
        })

        const existPayers = dbPayersId
        const foundIdSet = new Set(existPayers.map((doc) => doc.id))
        const notFound = foundIdPayers.filter((id) => !foundIdSet.has(id))

        if(notFound.length > 0){
            return {
                existPayers : false as const,
                notFound
            }
        }

        const updatePayers = []

        for(const updatePay of data.Payers){
            const dbPayer = dbPayersId.find((pay)=>pay.id === updatePay.id)

            if(dbPayer){
                const update = await repoManager.merge(AdmissionPayer, dbPayer, {
                    name : updatePay.name,
                    coverageLimit : updatePay.coverageLimit,
                    coveragePercentage : updatePay.coveragePercentage,
                    payerType : updatePay.payerType,
                    policyNumber : updatePay.policyNumber,
                    validUntil : updatePay.validUntil,

                    updatedBy : data.updatedBy
                })

                updatePayers.push(update)
            }
        }

        const savedPayers = await manage.save(AdmissionPayer, updatePayers)

        return {
            existPayers : true as const,
            savedPayers
        }
        
    }

    // ajout de nouveaux payeurs
    async addNewPayer(data : payerCreateInput){

        if(!data.payers || data.payers.length === 0){
            return []
        }

        const createPayers = []
        const existingPayers = []

        for(const newPayer of data.payers){
            
            const existingPayer = await this.findOne({
                where : {
                    admission : {
                        id : data.admissionId,
                        admissionNumber : data.admissionNumber,
                        patientId : data.patientId,
                        numeroPatient : data.numeroPatient
                    },
                    name : newPayer.name,
                    policyNumber : newPayer.policyNumber,
                    payerType : newPayer.payerType,
                }
            })

            if(existingPayer){
                // Le payeur existe déjà en base
                existingPayers.push(existingPayer)
            }else{
                // Le payeur n'existe pas, on le prépare pour la création
                const create = this.create({
                    admission : {
                        id : data.admissionId,
                        numeroPatient : data.numeroPatient,
                        patientId : data.patientId,
                        admissionNumber : data.admissionNumber
                    },
                    name : newPayer.name,
                    policyNumber : newPayer.policyNumber,
                    payerType : newPayer.payerType,
                    coveragePercentage : newPayer.coveragePercentage,
                    coverageLimit : newPayer.coverageLimit,
                    validUntil : new Date(newPayer.validUntil),

                    createdBy : data.createdBy
                })

                createPayers.push(create)
            }
        }

        // Sauvegarde de tous les nouveaux payeurs
        const savedPayers = createPayers.length > 0 
            ? await this.save(createPayers) 
            : []

        return {
            hasCreated : savedPayers.length > 0,
            hasExisting : existingPayers.length > 0,
            ...(existingPayers.length > 0 ? { existingPayers } : {}),
            ...(savedPayers.length > 0 ? { savedPayers } : {})
        }
    }

    // 1. Ajout d'un payeur 
    async addSinglePayer(data: AddPayerInput, manager?: EntityManager) {
        const repo = manager ? manager.getRepository(AdmissionPayer) : this;

        const payer = repo.create({
            admissionId: data.admissionId,
            name: data.name,
            payerType: data.payerType as AdmissionPayerType,
            policyNumber: data.policyNumber,
            coveragePercentage: data.coveragePercentage,
            coverageLimit: data.coverageLimit,
            validUntil: new Date(data.validUntil),
            createdBy: data.createdBy,
        });

        const savedPayer = await repo.save(payer);
        return savedPayer;
    }

    // 2. Modification d'un payeur 
    async updateSinglePayer(data: UpdatePayerInput, manager?: EntityManager) {
        const repo = manager ? manager.getRepository(AdmissionPayer) : this;

        const payer = await repo.findOne({
            where: {
                id: data.payerId,
                admissionId: data.admissionId,
            },
        });

        if (!payer) {
            return {
                existPayer: false as const,
                payer: null,
            };
        }

        repo.merge(payer, {
            name: data.name || payer.name,
            payerType: (data.payerType as AdmissionPayerType) || payer.payerType,
            policyNumber: data.policyNumber || payer.policyNumber,
            coveragePercentage: data.coveragePercentage ?? payer.coveragePercentage,
            coverageLimit: data.coverageLimit ?? payer.coverageLimit,
            validUntil: data.validUntil ? new Date(data.validUntil) : payer.validUntil,
            updatedBy: data.updatedBy,
        });

        const updatedPayer = await repo.save(payer);

        return {
            existPayer: true as const,
            payer: updatedPayer,
        };
    }

    // 3. Suppression douce d'un payeur (DELETE /admission/payer/:payerId)
    async removeSinglePayer(data: RemovePayerInput, manager?: EntityManager) {
        const repo = manager ? manager.getRepository(AdmissionPayer) : this;

        const payer = await repo.findOne({
            where: {
                id: data.payerId,
                admissionId: data.admissionId,
            },
        });

        if (!payer) {
            return {
                existPayer: false as const,
            };
        }

        payer.deletedBy = data.deletedBy;
        await repo.save(payer);
        await repo.softRemove(payer);

        return {
            existPayer: true as const,
        };
    }

    // 4. Recherche des payeurs d'une admission
    async findPayersByAdmission(data: FindPayersByAdmissionInput) {
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