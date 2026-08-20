import { Injectable } from "@nestjs/common";
import { Between, DataSource, EntityManager, FindOptionsWhere, ILike, In, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { Admission } from "../entities/admission.entity";
import {CreateAdmissionInput, AdmissionStatus, EncounterStatus, UpdateAdmissionInput, findAdmissionByIdInput, findActiveAdmissionByPatientInput, AdmissionQueryInput, UpdateAdmissionStatusInput, CreateMovementInput, CancelAdmissionInput, SoftDeleteAdmissionInput} from "../validator/index"
import { AdmissionCompanion, AdmissionDocument, AdmissionPayer, Encounter,  MovementType, Relationship } from "../entities";
import { GeneratedAdmissionNumber, GeneratedEncounterNumber } from "../../helpers/UniqueNumero";
import { DocumentRepository } from "./documents.repository";
import { CompanionRepository } from "./companions.repository";
import { PayersRepository } from "./payer.repository";
import { EncounterRepository } from "./encounter.repository";
import { EncounterMovementRepository } from "./EncounterMovement.repository";


const ACTIVE_ADMISSION_STATUSES = [
    AdmissionStatus.PENDING,
    AdmissionStatus.PRE_ADMITTED,
    AdmissionStatus.REGISTERED,
    AdmissionStatus.ADMITTED,
    AdmissionStatus.TRANSFERED,
    AdmissionStatus.DISCHARGED_PENDING,
]

export const ALLOWED_STATUS_TRANSITIONS: Record<string, string[]> = {
  [AdmissionStatus.PENDING]: [AdmissionStatus.REGISTERED, AdmissionStatus.CANCELLED],
  [AdmissionStatus.PRE_ADMITTED]: [AdmissionStatus.REGISTERED, AdmissionStatus.CANCELLED],
  [AdmissionStatus.REGISTERED]: [AdmissionStatus.ADMITTED, AdmissionStatus.CANCELLED],
  [AdmissionStatus.ADMITTED]: [AdmissionStatus.TRANSFERED, AdmissionStatus.DISCHARGED_PENDING, AdmissionStatus.CANCELLED],
  [AdmissionStatus.DISCHARGED_PENDING]: [AdmissionStatus.DISCHARGED, AdmissionStatus.ADMITTED],
  [AdmissionStatus.DISCHARGED]: [AdmissionStatus.CLOSED],
  
  // États finaux : Aucune transition possible !
  [AdmissionStatus.CLOSED]: [],
  [AdmissionStatus.CANCELLED]: [],
};

// Fonction utilitaire de vérification
export function isStatusTransitionAllowed(currentStatus: string, newStatus: string): boolean {
  const allowedNextStatuses = ALLOWED_STATUS_TRANSITIONS[currentStatus] || [];
  return allowedNextStatuses.includes(newStatus);
}

// nombre de tentatives de generation d'un numero unique avant abandon
const MAX_NUMBER_GENERATION_ATTEMPT = 5


@Injectable()
export class AdmissionRepository extends Repository<Admission>{

    constructor(
        private dataSource : DataSource,
        private readonly companions : CompanionRepository,
        private readonly payers : PayersRepository,
        private readonly encounter : EncounterRepository,
        private readonly encounterMovement : EncounterMovementRepository,
        private readonly documents : DocumentRepository,
    ){
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
                    exist: false
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

            const saveUpdateAdmission = await manage.save(Admission, updateAdmission)
            const updateCompanions = await this.companions.updateCompanions(data, manage)
            const updateDocuments = await this.documents.updateDocument(data, manage)
            const updatePayers = await this.payers.updatePayers(data, manage)

         

            return {
                exist : false as const,
                saveUpdateAdmission,
                updateCompanions,
                updateDocuments,
                updatePayers,
                saveEncounter
            }
        })
    }


    async findAdmissionById(data: findAdmissionByIdInput){
        
        const existing =  await this.findOne({
            where : {
                admissionNumber : data.admissionNumber,
                id : data.admissionId,
                numeroPatient : data.numeroPatient,
                patientId : data.patientId
            },
            relations : {
                encounters: true,
                companions : true,
                payers : true,
                documents : true
            }
        })

        if(!existing){
            return {
                existAdmission : false as const,
                admission: null
            }
        }

        return {
            existAdmission : true as const,
            existing
        }
    }

    // admission active 
    async findActiveAdmissionByPatient(data: findActiveAdmissionByPatientInput){

        const activeAdmission = await this.findOne({
            where : {
                patientId : data.patientId,
                admissionStatus :In(ACTIVE_ADMISSION_STATUSES),
            },
            relations : {
                encounters : true,
                companions : true,
                documents : true,
                payers : true
            },
            order : {
                createdAt : "DESC",
            }
        })

        if(!activeAdmission){
            return {
                 hasActiveAdmission : false as const,
                 admission : null
            }
        }

        return {
            hasActiveAdmission : true as const,
            admission : activeAdmission
        }
    }   

    // 3. Recherche filtrée + paginée des admissions 
    async findAdmissions(query: AdmissionQueryInput) {
        const {
            patientId,
            numeroPatient,
            admissionNumber,
            doctorId,
            admissionStatus,
            admissionType,
            startDate,
            endDate,
            page = 1,
            limit = 10,
        } = query;

        // Construction dynamique de la clause WHERE
        const where: FindOptionsWhere<Admission> = {};

        if (patientId) where.patientId = patientId;
        if (doctorId) where.doctorId = doctorId;
        if (admissionStatus) where.admissionStatus = admissionStatus;
        if (admissionType) where.admissionType = admissionType;

        // Filtres textuels insensibles à la casse
        if (numeroPatient) where.numeroPatient = ILike(`%${numeroPatient}%`);
        if (admissionNumber) where.admissionNumber = ILike(`%${admissionNumber}%`);

        // Filtre sur plage de dates
        if (startDate && endDate) {
            where.admissionDate = Between(startDate, endDate);
        } else if (startDate) {
            where.admissionDate = MoreThanOrEqual(startDate);
        } else if (endDate) {
            where.admissionDate = LessThanOrEqual(endDate);
        }

        // Calcul de la pagination
        const skip = (page - 1) * limit;

        // Exécution de la requête avec comptage
        const [admissions, total] = await this.findAndCount({
            where,
            relations: {
                encounters: true,
                companions: true,
                documents: true,
                payers: true,
            },
            order: {
                createdAt: "DESC",
            },
            skip,
            take: limit,
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data: admissions,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }

    // mise a jour du statut d'une admission 
    async updateAdmissionStatus(data: UpdateAdmissionStatusInput) {

        const admission = await this.findOne({
            where: {
                id: data.admissionId,
                admissionNumber: data.numeroAdmission,
                patientId: data.patientId || undefined,
                numeroPatient: data.numeroPatient || undefined,
            }, 
            relations: {
                encounters: true,
                companions: true,
                documents: true,
                payers: true,
            },
        });

        // 1. L'admission n'existe pas
        if (!admission) {
            return {
                existAdmission: false as const,
                invalidTransition: false as const,
                admission: null,
            };
        }

        // 2. Vérification de la validité de la transition de statut
        const isValidTransition = isStatusTransitionAllowed(admission.admissionStatus, data.newStatus);
        if (!isValidTransition) {
            return {
                existAdmission: true as const,
                invalidTransition: true as const,
                currentStatus: admission.admissionStatus,
                targetStatus: data.newStatus,
                admission: null,
            };
        }

        // 3. Mise à jour du statut et de l'utilisateur
        admission.admissionStatus = data.newStatus;
        admission.updatedBy = data.updatedBy;

        const updatedAdmission = await this.save(admission);

        return {
            exist: true as const,
            invalidTransition: false as const,
            admission: updatedAdmission,
        };
    }


    async createMovement(data : CreateMovementInput){

        return await this.dataSource.transaction(async (manager)=>{


            // recupere l'encouter 
            const encounter = await this.encounter.findEncounterById(
                data.encounterId, 
                data.encounterNumber,
                data.admissionId,
                data.admissionNumber,
                data.patientId,
                data.numeroPatient,
                manager
            ); 

            if(!encounter){
                return {
                    existEncounter : false as const,
                    locked : false as const
                }
            }

            // Verification si le sejour est deja clos, sorti ou annule
            const FORBIDDEN_STATUSES: string[] = [
                EncounterStatus.ENCOUNTER_DISCHARGED,
                EncounterStatus.ENCOUNTER_CLOSED,
                EncounterStatus.ENCOUNTER_CANCELLED,
            ];

            if (FORBIDDEN_STATUSES.includes(encounter.encounterStatus)) {
                return {
                    existEncounter : true as const,
                    locked : true as const,
                    currentStatus : encounter.encounterStatus
                }
            }

            // creation du movement 
            const movement = await this.encounterMovement.createMovement({
                encounterId : data.encounterId,
                encounterNumber : data.encounterNumber,
                movementType : data.movementType as MovementType,
                fromDepartmentId : encounter.currentDepartmentId,
                fromRoomId : encounter.currentRoomId,
                fromBedId : encounter.currentBedId,
                toDepartmentId : data.toDepartmentId,
                toRoomId : data.toRoomId,
                toBedId : data.toBedId,
                movementBy : data.movementBy,
                reason : data.reason,
            }, manager);


            // Mise a jour de la position 
            await this.encounter.updatePosition(
                data.encounterId, 
                data.encounterNumber,
                data.admissionId,
                data.patientId, 
                data.movementBy,
                {
                    currentDepartementId : movement.toDepartmentId,
                    currentBedId : movement.toBedId,
                    currentRomId : movement.toRoomId
                },
                manager
            );

            return {
                existEncounter : true as const,
                locked : false as const,
                movement
            }

        })
    }

    // 1. Annulation métier d'une admission
    async cancelAdmission(data: CancelAdmissionInput) {
        return await this.dataSource.transaction(async (manager) => {
            const admission = await manager.findOne(Admission, {
                where: {
                    id: data.admissionId,
                    admissionNumber: data.numeroAdmission,
                    patientId: data.patientId || undefined,
                    numeroPatient: data.numeroPatient || undefined,
                },
                relations: {
                    encounters: true,
                    companions: true,
                    documents: true,
                    payers: true,
                },
            });

            if (!admission) {
                return {
                    existAdmission: false as const,
                    locked: false as const,
                };
            }

            // Interdit d'annuler une admission déjà close ou sortie
            if (admission.admissionStatus === AdmissionStatus.CLOSED || admission.admissionStatus === AdmissionStatus.DISCHARGED) {
                return {
                    existAdmission: true as const,
                    locked: true as const,
                    currentStatus: admission.admissionStatus,
                };
            }

            // Annuler l'admission
            admission.admissionStatus = AdmissionStatus.CANCELLED;
            admission.reason = data.reason;
            admission.updatedBy = data.cancelledBy;
            await manager.save(Admission, admission);

            // Annuler le séjour (Encounter) associé s'il existe
            if (admission.encounters) {
                admission.encounters.encounterStatus = EncounterStatus.ENCOUNTER_CANCELLED;
                admission.encounters.updatedBy = data.cancelledBy;
                await manager.save(Encounter, admission.encounters);
            }

            return {
                existAdmission: true as const,
                locked: false as const,
                admission,
            };
        });
    }

    // 2. Suppression douce d'une admission
    async softDeleteAdmission(data: SoftDeleteAdmissionInput) {
        const admission = await this.findOne({
            where: {
                id: data.admissionId,
                admissionNumber: data.numeroAdmission || undefined,
                patientId: data.patientId || undefined,
                numeroPatient: data.numeroPatient || undefined,
            },
        });

        if (!admission) {
            return {
                existAdmission: false as const,
            };
        }

        admission.deletedBy = data.deletedBy;
        await this.save(admission);
        await this.softRemove(admission);

        return {
            existAdmission: true as const,
        };
    }
}



