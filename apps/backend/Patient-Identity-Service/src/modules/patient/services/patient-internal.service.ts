import { Injectable } from "@nestjs/common";
import { PatientInternalRepository } from "../repositories";
import { GetPatientInput, PatientSharedResponseInput } from "@org/contracts"






@Injectable()
export class PatientInternalService {
    constructor(
        private readonly repository: PatientInternalRepository
    ) { }


    async VerifyPatient(contract: GetPatientInput) {

        const patient = await this.repository.findOne({
            where: {
                uniquePatientId: contract.numeroPatient,
                id: contract.patientId
            },
            withDeleted: false
        })

        if (!patient) {
            return {
                exist: false
            }
        }

        const response: PatientSharedResponseInput = {
            id: patient.id,
            numeroPatient: patient.uniquePatientId,
            nom: patient.nom,
            prenom: patient.prenom,
            statusDossier: patient.statusDossier
        }

        return {
            exist: true,
            response
        }
    }
}
