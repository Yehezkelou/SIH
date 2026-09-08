import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AdmissionRepository } from "../repository/admission.repository";
import { EncounterMovementRepository } from "../repository/EncounterMovement.repository";
import { MESSAGE_ERROR } from "../../helpers/messageError";
import { CreateMovementInput, FindMovementsByEncounterInput } from "../validator/index";

@Injectable()
export class EncounterMovementService {

    constructor(
        private readonly admissionRepository: AdmissionRepository,
        private readonly encounterMovementRepository: EncounterMovementRepository,
    ) {}

    // 1. Création d'un transfert / déplacement de patient
    async createMovement(data: CreateMovementInput) {
        const result = await this.admissionRepository.createMovement(data);

        if (!result.existEncounter) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR.ENCOUNTER_NOT_FOUND.CODE,
                message: MESSAGE_ERROR.ENCOUNTER_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        if (result.locked) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                code: MESSAGE_ERROR.ENCOUNTER_LOCKED.CODE,
                message: MESSAGE_ERROR.ENCOUNTER_LOCKED.MESSAGE,
            }, HttpStatus.BAD_REQUEST);
        }

        return result.movement;
    }

    // 2. Historique des déplacements d'un séjour
    async findMovementsByEncounter(data: FindMovementsByEncounterInput) {
        return await this.encounterMovementRepository.findMovementsByEncounter(
            data.encounterId,
            data.numeroEncounter
        );
    }
}
