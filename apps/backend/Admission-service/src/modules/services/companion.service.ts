import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CompanionRepository } from "../repository/companions.repository";
import { MESSAGE_ERROR } from "../../helpers/messageError";
import {
    AddCompanionInput,
    UpdateCompanionInput,
    RemoveCompanionInput,
    FindCompanionsByAdmissionInput,
} from "../validator/index";

@Injectable()
export class CompanionService {

    constructor(
        private readonly companionRepository: CompanionRepository,
    ) {}

    // 1. Ajout d'un accompagnant (POST /admission/:id/companion)
    async addCompanion(data: AddCompanionInput) {
        return await this.companionRepository.addSingleCompanion(data);
    }

    // 2. Modification d'un accompagnant (PUT /admission/companion/:companionId)
    async updateCompanion(data: UpdateCompanionInput) {
        const result = await this.companionRepository.updateSingleCompanion(data);

        if (!result.existCompanion) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR.COMPANION_NOT_FOUND.CODE,
                message: MESSAGE_ERROR.COMPANION_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        return result.companion;
    }

    // 3. Suppression douce d'un accompagnant (DELETE /admission/companion/:companionId)
    async removeCompanion(data: RemoveCompanionInput) {
        const result = await this.companionRepository.removeSingleCompanion(data);

        if (!result.existCompanion) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR.COMPANION_NOT_FOUND.CODE,
                message: MESSAGE_ERROR.COMPANION_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        return { message: "Accompagnant retiré avec succès" };
    }

    // 4. Liste des accompagnants d'une admission (GET /admission/:id/companion)
    async findCompanionsByAdmission(data: FindCompanionsByAdmissionInput) {
        return await this.companionRepository.findCompanionsByAdmission(data);
    }
}
