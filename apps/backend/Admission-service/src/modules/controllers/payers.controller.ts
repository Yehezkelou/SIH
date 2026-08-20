import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { PayersService } from "../services/payer.service";
import { PinoLogger } from "nestjs-pino";
import * as express from "express";
import type { AddPayerInput, UpdatePayerInput, RemovePayerInput } from "../validator";

@Controller("admission")
export class PayersController {
    constructor(
        private readonly service: PayersService,
        private readonly logger: PinoLogger
    ) {
        this.logger.setContext(PayersController.name);
    }

    // POST /admission/:id/payer - Ajouter un payeur
    @Post(":id/payer")
    async addPayer(
        @Param("id") admissionId: string,
        @Body() data: AddPayerInput,
        @Res() res: express.Response
    ) {
        data.admissionId = admissionId;

        this.logger.info({
            message: "Ajout d'un payeur / assurance sur une admission",
            context: "POST /admission/:id/payer",
            admissionId,
        });

        const payer = await this.service.addPayer(data);

        return res.status(HttpStatus.CREATED).json({
            message: "Payeur ajouté avec succès",
            payer,
            status: HttpStatus.CREATED,
            timeStamp: new Date().toISOString(),
        });
    }

    // PUT /admission/payer/:payerId - Modifier un payeur
    @Put("payer/:payerId")
    async updatePayer(
        @Param("payerId") payerId: string,
        @Body() data: UpdatePayerInput,
        @Res() res: express.Response
    ) {
        data.payerId = payerId;

        this.logger.info({
            message: "Modification d'un payeur",
            context: "PUT /admission/payer/:payerId",
            payerId,
        });

        const payer = await this.service.updatePayer(data);

        return res.status(HttpStatus.OK).json({
            message: "Payeur mis à jour avec succès",
            payer,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // DELETE /admission/payer/:payerId - Retire un payeur (soft delete)
    @Delete("payer/:payerId")
    async removePayer(
        @Param("payerId") payerId: string,
        @Body() data: RemovePayerInput,
        @Res() res: express.Response
    ) {
        data.payerId = payerId;

        this.logger.info({
            message: "Suppression douce d'un payeur",
            context: "DELETE /admission/payer/:payerId",
            payerId,
        });

        const result = await this.service.removePayer(data);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // GET /admission/:id/payer - Liste des payeurs d'une admission
    @Get(":id/payer")
    async findPayersByAdmission(
        @Param("id") admissionId: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Consultation des payeurs d'une admission",
            context: "GET /admission/:id/payer",
            admissionId,
        });

        const payers = await this.service.findPayersByAdmission({ admissionId });

        return res.status(HttpStatus.OK).json({
            message: "Payeurs récupérés avec succès",
            payers,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }
}
