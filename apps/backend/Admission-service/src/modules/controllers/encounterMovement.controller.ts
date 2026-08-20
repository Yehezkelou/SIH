import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from "@nestjs/common";
import { EncounterMovementService } from "../services/encounterMovement.service";
import { PinoLogger } from "nestjs-pino";
import * as express from "express";
import type { CreateMovementInput } from "../validator";

@Controller("admission/encounter")
export class EncounterMovementController {
    constructor(
        private readonly service: EncounterMovementService,
        private readonly logger: PinoLogger
    ) {
        this.logger.setContext(EncounterMovementController.name);
    }

    // POST /admission/encounter/:encounterId/movement - Enregistrer un déplacement
    @Post(":encounterId/movement")
    async createMovement(
        @Param("encounterId") encounterId: string,
        @Body() data: CreateMovementInput,
        @Res() res: express.Response
    ) {
        data.encounterId = encounterId;

        this.logger.info({
            message: "Enregistrement d'un mouvement de patient",
            context: "POST /admission/encounter/:encounterId/movement",
            encounterId,
            movementType: data.movementType,
        });

        const movement = await this.service.createMovement(data);

        return res.status(HttpStatus.CREATED).json({
            message: "Mouvement enregistré avec succès",
            movement,
            status: HttpStatus.CREATED,
            timeStamp: new Date().toISOString(),
        });
    }

    // GET /admission/encounter/:encounterId/movement - Historique des déplacements
    @Get(":encounterId/movement")
    async findMovementsByEncounter(
        @Param("encounterId") encounterId: string,
        @Query("numeroEncounter") numeroEncounter: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Consultation de l'historique des déplacements",
            context: "GET /admission/encounter/:encounterId/movement",
            encounterId,
            numeroEncounter,
        });

        const movements = await this.service.findMovementsByEncounter({ encounterId, numeroEncounter });

        return res.status(HttpStatus.OK).json({
            message: "Historique des déplacements récupéré avec succès",
            movements,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }
}
