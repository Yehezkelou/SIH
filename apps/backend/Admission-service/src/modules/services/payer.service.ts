import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PayersRepository } from "../repository/payer.repository";
import { MESSAGE_ERROR } from "../../helpers/messageError";
import {
    AddPayerInput,
    UpdatePayerInput,
    RemovePayerInput,
    FindPayersByAdmissionInput,
} from "../validator/index";

@Injectable()
export class PayersService {

    constructor(
        private readonly payersRepository: PayersRepository,
    ) {}

    // 1. Ajout d'un payeur / assurance (POST /admission/:id/payer)
    async addPayer(data: AddPayerInput) {
        return await this.payersRepository.addSinglePayer(data);
    }

    // 2. Modification d'un payeur (PUT /admission/payer/:payerId)
    async updatePayer(data: UpdatePayerInput) {
        const result = await this.payersRepository.updateSinglePayer(data);

        if (!result.existPayer) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR.PAYER_NOT_FOUND.CODE,
                message: MESSAGE_ERROR.PAYER_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        return result.payer;
    }

    // 3. Suppression douce d'un payeur (DELETE /admission/payer/:payerId)
    async removePayer(data: RemovePayerInput) {
        const result = await this.payersRepository.removeSinglePayer(data);

        if (!result.existPayer) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR.PAYER_NOT_FOUND.CODE,
                message: MESSAGE_ERROR.PAYER_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        return { message: "Payeur retiré avec succès" };
    }

    // 4. Liste des payeurs d'une admission (GET /admission/:id/payer)
    async findPayersByAdmission(data: FindPayersByAdmissionInput) {
        return await this.payersRepository.findPayersByAdmission(data);
    }
}
