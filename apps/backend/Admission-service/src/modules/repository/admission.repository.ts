import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DataSource, In, Repository } from "typeorm";
import { Admission } from "../entities/admission.entity";
import {CreateAdmissionInput, UpdateAdmissionInput, AdmissionType, AdmissionStatus, EncounterStatus} from "../validator/index"
import { AdmissionDocument } from "../entities/admissionDocument.entity";
import { AdmissionPayer } from "../entities/admissionPayer.entity";
import { AdmissionCompanion } from "../entities/admissionCompanion.entity";
import { Encounter } from "../entities/encounter.entity";







@Injectable()
export class AdmissionService extends Repository<Admission>{

    constructor(private dataSource : DataSource){
        super(Admission, dataSource.createEntityManager());
    }

    // methode pour creer une nouvelle admission 

    async createNewAdmission(data : CreateAdmissionInput){

        // verifier si le patient a une admission en cours 
        const admit = [
            "PENDING",
            "ADMITTED",
            "PRE_ADMITTED",
            "REGISTERED",
            "WAIT_FOR_CAR",
            "DISCHARGED_PENDING",
            "TRANSFERED",
        ]

        const existing = await this.findOne({
            where : [ 
                {patientId : data.patientId},
                {admissionStatus : In(admit)}
            ]
        })

        if(existing){
            throw new HttpException({
                message : "PATIENT ALREADY ADMITTED",
                data : [existing]
            }, HttpStatus.BAD_REQUEST)
        }

        const result  = await this.dataSource.transaction(async (adm) => {

            // creation de l'admission 
            const admission = adm.create(Admission, {
                patientId : data.patientId,
                doctorId : data.admission.doctorId,
                reason : data.admission.reason,
                admissionType : data.admission.admissionType,
                admissionStatus : AdmissionStatus.PENDING,
                admissionDate : new Date(),
            })
            
            await adm.save(admission)

            // creation des documents 

            if(data.documents && data.documents.length > 0){

                const documents = data.documents.map((doc) => {
                    return adm.create(AdmissionDocument, {
                        admissionId : admission.id,
                        url : doc.documentUrl,
                        documentType : doc.documentType,
                        
                    })
                })

                await adm.save(documents)
            } 

            // ajout des payeur 
            
            if(data.payers && data.payers.length >  0 ){

                const payers = data.payers.map((payer) => {
                    return adm.create(AdmissionPayer, {
                        admissionId : admission.id, 
                        name : payer?.name, 
                        payerType : payer?.payerType, 
                        policyNumber : payer?.policyNumber,
                        coverageLimit : payer?.coverageLimit,
                        coveragePercentage : payer?.coveragePercentage,
                        validUntil : payer?.validUntil,
                    })
                })

                await adm.save(payers)
            }


            // ajout les companions

            if(data.companions && data.companions.length > 0){

                const companions = data.companions.map((compa) => {
                    return adm.create(AdmissionCompanion, {
                        admissionId : admission.id,
                        firstName : compa.firstName,
                        lastName : compa.lastName,
                        phoneNumber : compa.phoneNumber,
                        address : compa.address,
                        relationship : compa.relationship
                    })
                })

                await adm.save(companions)
            }


            // creer l'encouter 
            const encounter = adm.create(Encounter, {
                admissionId : admission.id,
                patientId : admission.patientId,
                encounterStatus : EncounterStatus.ENCOUNTER_PENDING,
                startDate : new Date(),
            })

            await adm.save(encounter) 

            return admission
        })


        return [result]
    }


    async findAdmission(){

    }
}