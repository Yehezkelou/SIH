import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, In, Repository } from "typeorm";
import { Admission } from "../entities/admission.entity";
import {CreateAdmissionInput, AdmissionStatus, EncounterStatus} from "../validator/index"
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

            // creer l'encounter uniquement si le patient est physiquement pris en charge
            // (ADMITTED/REGISTERED) : une admission PENDING/PRE_ADMITTED n'a pas encore
            // de sejour actif a positionner dans un lit.
            let savedEncounter : Encounter | undefined = undefined

            if(data.admission.admissionStatus === AdmissionStatus.ADMITTED || data.admission.admissionStatus === AdmissionStatus.REGISTERED){

                const newEncounter = manager.create(Encounter, {
                    admission : {id : saveAdmission.id},
                    patientId : data.patientId,
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


    async findAdmission(){

    }
}
