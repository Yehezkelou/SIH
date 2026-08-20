import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { CompanionService } from "../services/companion.service";
import { PinoLogger } from "nestjs-pino";
import * as express from "express";
import type {
    AddCompanionInput,
    UpdateCompanionInput,
    RemoveCompanionInput
} from "../validator";

@Controller("admission")
export class CompanionController {
    constructor(
        private readonly service: CompanionService,
        private readonly logger: PinoLogger
    ) {
        this.logger.setContext(CompanionController.name);
    }

    // POST /admission/:id/companion - Ajouter un accompagnant
    @Post(":id/companion")
    async addCompanion(
        @Param("id") admissionId: string,
        @Body() data: AddCompanionInput,
        @Res() res: express.Response
    ) {
        data.admissionId = admissionId;

        this.logger.info({
            message: "Ajout d'un accompagnant sur une admission",
            context: "POST /admission/:id/companion",
            admissionId,
        });

        const companion = await this.service.addCompanion(data);

        return res.status(HttpStatus.CREATED).json({
            message: "Accompagnant ajouté avec succès",
            companion,
            status: HttpStatus.CREATED,
            timeStamp: new Date().toISOString(),
        });
    }

    // PUT /admission/companion/:companionId - Modifier un accompagnant
    @Put("companion/:companionId")
    async updateCompanion(
        @Param("companionId") companionId: string,
        @Body() data: UpdateCompanionInput,
        @Res() res: express.Response
    ) {
        data.companionId = companionId;

        this.logger.info({
            message: "Modification d'un accompagnant",
            context: "PUT /admission/companion/:companionId",
            companionId,
        });

        const companion = await this.service.updateCompanion(data);

        return res.status(HttpStatus.OK).json({
            message: "Accompagnant mis à jour avec succès",
            companion,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // DELETE /admission/companion/:companionId - Retire un accompagnant (soft delete)
    @Delete("companion/:companionId")
    async removeCompanion(
        @Param("companionId") companionId: string,
        @Body() data: RemoveCompanionInput,
        @Res() res: express.Response
    ) {
        data.companionId = companionId;

        this.logger.info({
            message: "Suppression douce d'un accompagnant",
            context: "DELETE /admission/companion/:companionId",
            companionId,
        });

        const result = await this.service.removeCompanion(data);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // GET /admission/:id/companion - Liste des accompagnants d'une admission
    @Get(":id/companion")
    async findCompanionsByAdmission(
        @Param("id") admissionId: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Consultation des accompagnants d'une admission",
            context: "GET /admission/:id/companion",
            admissionId,
        });

        const companions = await this.service.findCompanionsByAdmission({ admissionId });

        return res.status(HttpStatus.OK).json({
            message: "Accompagnants récupérés avec succès",
            companions,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }
}
