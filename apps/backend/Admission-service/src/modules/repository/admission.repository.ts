import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, In, Repository } from "typeorm";
import { Admission } from "../entities/admission.entity";
import {CreateAdmissionInput, AdmissionStatus, EncounterStatus, UpdateAdmissionInput} from "../validator/index"
import { AdmissionCompanion, AdmissionDocument, AdmissionPayer, Encounter, Relationship } from "../entities";
import { GeneratedAdmissionNumber, GeneratedEncounterNumber } from "../../helpers/UniqueNumero";



const ACTIVE_ADMISSION_STATUSES = [
    AdmissionStatus.PENDING,
    AdmissionStatus.PRE_ADMITTED,
    AdmissionStatus.REGISTERED,
    AdmissionStatus.ADMITTED,
    AdmissionStatus.TRANSFERED,
    AdmissionStatus.DISCHARGED_PENDING,
]

// nombre de tentatives de generation d'un numero unique avant abandon
const MAX_NUMBER_GENERATION_ATTEMPT = 5


@Injectable()
export class AdmissionRepository extends Repository<Admission>{

    constructor(private dataSource : DataSource){
        super(Admission, dataSource.createEntityManager());
    }


    // creation d'un nouvelle admission
    async createNewAdmission(data : CreateAdmissionInput){

        const existingAdmission = await this.findOne({
            where : {
                patientId : data.patientId,
                numeroPatient: data.numeroPatient,
                admissionStatus : In(ACTIVE_ADMISSION_STATUSES)
            }
        })

        if(existingAdmission){
            return {
                exist : true as const,
                admission : existingAdmission
            }
        }


        let admissionNumber = ""
        for(let attempt = 1 ; attempt <= MAX_NUMBER_GENERATION_ATTEMPT ; attempt++){

            const candidate = GeneratedAdmissionNumber()
            const alreadyUsed = await this.findOne({ where : { admissionNumber : candidate } })

            if(!alreadyUsed){
                admissionNumber = candidate
                break
            }
        }

        if(!admissionNumber){
            return {
                numberGenerationFailed : true as const
            }
        }

        return this.dataSource.transaction(async(manager : EntityManager) => {

            const admission = manager.create(Admission, {
                patientId : data.patientId,
                numeroPatient : data.numeroPatient,
                admissionNumber,
                doctorId : data.admission.doctorId,
                admissionStatus : data.admission.admissionStatus,
                admissionType : data.admission.admissionType,
                reason : data.admission.reason,
                admissionDate : data.admission.admissionDate ?? new Date(),
                expectedDischarge : data.admission.expectedDischarge,
                createdBy : data.createdBy
            })

            const saveAdmission = await manager.save(admission)

            // inserer les companions
            const companions = (data.companions ?? []).map(companion => {
                return manager.create(AdmissionCompanion, {
                    admission : {id : saveAdmission.id},
                    firstName : companion.firstName,
                    lastName : companion.lastName,
                    address : companion.address,
                    relationship : companion.relationship as Relationship,
                    phoneNumber : companion.phoneNumber,
                    createdBy : data.createdBy
                })
            })

            // inserer les documents
            const documents = (data.documents ?? []).map(document => {
                return manager.create(AdmissionDocument, {
                    admission : {id : saveAdmission.id},
                    documentType : document.documentType,
                    documentName : document.documentName,
                    documentSize : document.documentSize,
                    documentUrl : document.documentUrl,
                    createdBy : data.createdBy
                })
            })

            // inserer les payers
            const payers = (data.payers ?? []).map(payer => {
                return manager.create(AdmissionPayer, {
                    admission : {id : saveAdmission.id},
                    name : payer.name,
                    payerType : payer.payerType,
                    policyNumber : payer.policyNumber,
                    coveragePercentage : payer.coveragePercentage,
                    coverageLimit : payer.coverageLimit,
                    validUntil : payer.validUntil,
                    createdBy : data.createdBy
                })
            })


            let savedEncounter : Encounter | undefined = undefined

            if(data.admission.admissionStatus === AdmissionStatus.ADMITTED || data.admission.admissionStatus === AdmissionStatus.REGISTERED){

                const newEncounter = manager.create(Encounter, {
                    admission : {id : saveAdmission.id},
                    patientId : data.patientId,
                    numeroPatient : data.numeroPatient,
                    encounterNumber : GeneratedEncounterNumber(),
                    encounterStatus : data.encouter?.encouterStatus ?? EncounterStatus.ENCOUNTER_PENDING,
                    currentDepartmentId : data.encouter?.currentDepartementId,
                    currentBedId : data.encouter?.currentBedId,
                    currentRoomId : data.encouter?.currentRoomId,
                    startDate : new Date(),
                    createdBy : data.createdBy
                })

                savedEncounter = await manager.save(newEncounter)
            }

            const [savedCompanions, savedDocuments, savedPayers] = await Promise.all([
                manager.save(companions),
                manager.save(documents),
                manager.save(payers)
            ])

            return {
                exist : false as const,
                admission : saveAdmission,
                companions : savedCompanions,
                documents : savedDocuments,
                payers : savedPayers,
                encounter : savedEncounter
            }
        })
    }


    // update 
    async updateAdmission(data : UpdateAdmissionInput){


        // mise a jour de l'admission 
        return await this.dataSource.transaction(async (manage) => {

            let admission = await manage.findOne(Admission, {
                where : {
                    id : data.admissionId,
                    admissionStatus : In(ACTIVE_ADMISSION_STATUSES),
                    patientId : data.patientId,
                    numeroPatient : data.numeroPatient
                }
            })

            if(!admission){
                return {
                    exist : false
                }
            }

            if(admission.admissionStatus == AdmissionStatus.ADMITTED || admission.admissionStatus == AdmissionStatus.REGISTERED){
                return {
                    locked : true as const,
                    admission
                }
            }

            const updateAdmission = await manage.merge(Admission, admission, {
                // clé composite pour l'accès à l'admission
                patientId : data.patientId,
                numeroPatient : data.numeroPatient,
                admissionNumber : data.admissionNumber,

                // admission
                doctorId: data.admission?.doctorId,
                admissionType : data.admission?.admissionType,
                admissionStatus : data.admission?.admissionStatus,
                reason : data.admission?.reason,

                updatedBy : data.updatedBy
                
            })

            // mise a jour des companions 
            const foundIdCompanions = (data.companions ?? []).map((c) => c.id).filter(Boolean);

            const companions = foundIdCompanions.length > 0
                ?  await manage.find(AdmissionCompanion, {
                    where : {
                        id : In(foundIdCompanions),
                        admission: {
                            id : data.admissionId,
                            patientId : data.patientId,
                            numeroPatient : data.numeroPatient,
                            admissionNumber : data.admissionNumber
                        }
                    }
                }) : [];

            // recuperation des companion existant
            const foundCompanionsIdSet = new Set(companions.map((c)=> c.id))
            const existCompanions = companions
            const notExistCompanions = (data.companions ?? []).filter((c)=> !foundCompanionsIdSet.has(c.id))


            if(notExistCompanions.length > 0){
                return {
                    existCompanions: false,
                    companions : notExistCompanions
                }
            }

            const updateCompanions = (data.companions ?? []).map((c) => {
                const companion = existCompanions.find((ec) => ec.id === c.id)

               return manage.merge(AdmissionCompanion, companion!, {
                firstName : c.firstName,
                lastName : c.lastName,
                address : c.address,
                relationship : c.relationship as Relationship,
                phoneNumber : c.phoneNumber,
                updatedBy : data.updatedBy
               })
            })

            // mise a jour des documents 
            const documentsId = (data.documents ?? []).map((doc) => doc.id).filter(Boolean)
            const documents = documentsId.length > 0 
                    ? await manage.find(AdmissionDocument, {
                    where : {
                        id : In(documentsId),
                        admission : {
                            id : data.admissionId,
                            patientId : data.patientId,
                            numeroPatient : data.numeroPatient,
                            admissionNumber : data.admissionNumber
                        }
                    }
                }) : [];

            const foundDocumentIdSet = new Set((data.documents ?? []).map((d) => d.id))
            // filter les document existant 
            const existDocuments = documents
            // filtrer les document qui existe pas
            const notExistDocuments = (data.documents ?? []).filter((d) => !foundDocumentIdSet.has(d.id))
            if(notExistDocuments.length > 0){
                return{
                    existDocuments : false,
                    documents: notExistDocuments
                } 
             }

            const updateDocuments = (data.documents ?? []).map((d) => {

                const document = existDocuments.find((ed)=> ed.id === d.id)

                return manage.merge(AdmissionDocument, document!, {
                    documentExtension : d.documentExtension,
                    documentName : d.documentName,
                    documentSize : d.documentSize,
                    documentType : d.documentUrl,
                    documentUrl : d.documentUrl,
                    updatedBy : data.updatedBy
                })
            })

            // mise a jour payer
            const foundPayersId = (data.payers ?? []).map(async (pay)=> pay.id).filter(Boolean)
                const payers = foundPayersId.length > 0 ? await manage.find(AdmissionPayer, {
                    where: {
                        id : In(foundPayersId),
                        admission : {
                            id : data.admissionId,
                            admissionNumber : data.admissionNumber,
                            patientId : data.patientId,
                            numeroPatient : data.numeroPatient
                        }
                    }
                }) : [];

            
            const foundPayersSetId = new Set(payers.map((p) => p.id)) 
            const existPayers = payers
            const notExistPayers = (data.payers ?? []).filter((p) => !foundPayersSetId.has(p.id))
            if(notExistPayers.length > 0){
                return {
                    existPayers: false,
                    payers : notExistPayers
                }
            }

            const updatePayers = (data.payers ?? []).map((pay)=>{
                const payer = existPayers.find((ep)=> ep.id === pay.id)

                return manage.merge(AdmissionPayer, payer!, {
                    payerType : pay.payerType,
                    policyNumber : pay.policyNumber,
                    coverageLimit : pay.coverageLimit,
                    coveragePercentage : pay.coveragePercentage,
                    name : pay.name,
                    validUntil : pay.validUntil,
                    updatedBy : data.updatedBy
                })
            })

            
            // cree le sejour par condition 
            // si le statut a changer en ADMITTED ou REGISTERED
            let saveEncounter : Encounter | undefined
            if(updateAdmission.admissionStatus === AdmissionStatus.ADMITTED || updateAdmission.admissionStatus === AdmissionStatus.REGISTERED){

                // existe deja 
                const encounter = await manage.findOne(Encounter, {
                    where : {
                        admission : {
                            id : data.admissionId,
                            admissionNumber : data.admissionNumber,
                            patientId : data.patientId,
                            numeroPatient : data.numeroPatient
                        }
                    }
                })

                // determine status cible 
                const targetStatus = updateAdmission.admissionStatus === AdmissionStatus.ADMITTED
                ? EncounterStatus.ENCOUNTER_ADMITTED
                : EncounterStatus.ENCOUNTER_REGISTERED

                // cas A 
                let numeroEncounter = ""
                for(let i=0; i < MAX_NUMBER_GENERATION_ATTEMPT; i++){
                    numeroEncounter = GeneratedEncounterNumber()
                    const exist = await manage.findOne(Encounter , {
                        where : {
                            admission : {
                                id : data.admissionId,
                                numeroPatient: data.numeroPatient,
                                patientId : data.patientId,
                                admissionNumber : data.admissionNumber
                            },
                            encounterNumber : numeroEncounter
                        }
                    })

                    if(!exist){
                        break
                    }
                }
                
                if(!encounter){
                    const newEncounter = manage.create(Encounter, {
                        admission : {
                            id : data.admissionId,
                            admissionNumber : data.admissionNumber
                            
                        },
                        encounterNumber : numeroEncounter, 
                        patientId : data.patientId,
                        numeroPatient : data.numeroPatient,
                        encounterStatus: targetStatus,
                        startDate : new Date(),
                        createdBy : data.updatedBy
                    })

                    await manage.save(newEncounter)
                }

                else {
                    const forbiddenStatuses = [
                        EncounterStatus.ENCOUNTER_DISCHARGED,
                        EncounterStatus.ENCOUNTER_CLOSED,
                        EncounterStatus.ENCOUNTER_CANCELLED
                    ]

                    if(forbiddenStatuses.includes(encounter.encounterStatus as any)){
                        return {
                            statusTransitionError : true as const,
                            currentEncounterStatus : encounter.encounterStatus,
                        }
                    }

                    encounter.encounterStatus = targetStatus
                    encounter.updatedBy = data.updatedBy

                    saveEncounter = await manage.save(encounter)
                }
            }

            // saveAll 
            const [saveUpdateAdmission, saveUpdateDocuments, saveUpdateCompanions, saveUpdatePayers] = await Promise.all([
                manage.save(updateAdmission),
                manage.save(updateDocuments),
                manage.save(updateCompanions),
                manage.save(updatePayers)
            ])

            return {
                exist : false as const,
                admission : saveUpdateAdmission,
                documents : saveUpdateDocuments,
                companions : saveUpdateCompanions,
                payers : saveUpdatePayers,
                encounter : saveEncounter
            }
        })
    }


    async findAdmission(){
        
    }
}
