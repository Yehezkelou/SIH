import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query, Res, UploadedFiles, UseGuards } from "@nestjs/common";
import { UserAuthGuard } from "../../shared/guards/user-auth.guard";
import { VerifyPersonnelGuard, VerifyPersonnel } from "../../shared/guards/verify-personnel.guard";
import { AdmissionService } from "../services/admission.service";
import { PinoLogger } from "nestjs-pino";
import { UseAdmissionFiles } from "../../helpers/decorator/AdmissionFile.decorator";
import * as express from "express";
import {
    type CreateAdmissionInput,
    type UpdateAdmissionInput,
    type AdmissionQueryInput,
    type UpdateAdmissionStatusInput,
    type DischargePatientInput,
    type CancelAdmissionInput,
    type SoftDeleteAdmissionInput,
} from "../validator";

@Controller("admission")
@UseGuards(UserAuthGuard)
export class AdmissionController {
    constructor(
        private readonly service: AdmissionService,
        private readonly logger: PinoLogger
    ) {
        this.logger.setContext(AdmissionController.name);
    }

    // POST /admission - Créer une admission
    @Post()
    @UseAdmissionFiles()
    @UseGuards(VerifyPersonnelGuard)
    @VerifyPersonnel("admission.doctorId")
    async createNewAdmission(
        @Body() data: CreateAdmissionInput,
        @UploadedFiles() files: Express.Multer.File[],
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Création d'une nouvelle admission",
            context: "POST /admission",
            patientId: data.patientId,
        });

        const admission = await this.service.createNewAdmission(data, files);

        return res.status(HttpStatus.CREATED).json({
            message: "Admission créée avec succès",
            admission,
            status: HttpStatus.CREATED,
            timeStamp: new Date().toISOString(),
        });
    }

    // GET /admission/search - Recherche filtrée et paginée
    @Get("search")
    async findAdmissions(
        @Query() query: AdmissionQueryInput,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Recherche d'admissions filtrée et paginée",
            context: "GET /admission/search",
            query,
        });

        const result = await this.service.findAdmissions(query);

        return res.status(HttpStatus.OK).json({
            message: "Admissions récupérées avec succès",
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // GET /admission/active/:patientId - Récupère l'admission active d'un patient
    @Get("active/:patientId")
    async findActiveAdmissionByPatient(
        @Param("patientId") patientId: string,
        @Query("numeroPatient") numeroPatient: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Recherche de l'admission active d'un patient",
            context: "GET /admission/active/:patientId",
            patientId,
            numeroPatient,
        });

        const admission = await this.service.findActiveAdmissionByPatient({ patientId, numeroPatient });

        return res.status(HttpStatus.OK).json({
            message: "Admission active récupérée avec succès",
            admission,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // GET /admission/:id - Détail complet d'une admission par ID
    @Get(":id")
    async findAdmissionById(
        @Param("id") admissionId: string,
        @Query("admissionNumber") admissionNumber: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Consultation du détail d'une admission",
            context: "GET /admission/:id",
            admissionId,
            admissionNumber,
        });

        const admission = await this.service.findAdmissionById({ admissionId, admissionNumber });

        return res.status(HttpStatus.OK).json({
            message: "Détail de l'admission récupéré avec succès",
            admission,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // PUT /admission/:id - Modifier les détails d'une admission
    @Put(":id")
    @UseAdmissionFiles()
    async updateAdmission(
        @Param("id") id: string,
        @Body() data: UpdateAdmissionInput,
        @UploadedFiles() files: Express.Multer.File[],
        @Res() res: express.Response
    ) {
        data.admissionId = id;

        this.logger.info({
            message: "Mise à jour d'une admission",
            context: "PUT /admission/:id",
            admissionId: id,
        });

        const result = await this.service.updateAdmission(data, files);

        return res.status(HttpStatus.OK).json({
            message: "Admission mise à jour avec succès",
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // PATCH /admission/:id/status - Changer le statut d'une admission
    @Patch(":id/status")
    async updateAdmissionStatus(
        @Param("id") id: string,
        @Body() data: UpdateAdmissionStatusInput,
        @Res() res: express.Response
    ) {
        data.admissionId = id;

        this.logger.info({
            message: "Mise à jour du statut d'une admission",
            context: "PATCH /admission/:id/status",
            admissionId: id,
            newStatus: data.newStatus,
        });

        const admission = await this.service.updateAdmissionStatus(data);

        return res.status(HttpStatus.OK).json({
            message: "Statut de l'admission mis à jour avec succès",
            admission,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // PUT /admission/:id/discharge - Sortie du patient
    @Put(":id/discharge")
    async dischargePatient(
        @Param("id") id: string,
        @Body() data: DischargePatientInput,
        @Res() res: express.Response
    ) {
        data.admissionId = id;

        this.logger.info({
            message: "Sortie du patient (Discharge)",
            context: "PUT /admission/:id/discharge",
            admissionId: id,
        });

        const admission = await this.service.dischargePatient(data);

        return res.status(HttpStatus.OK).json({
            message: "Sortie du patient effectuée avec succès",
            admission,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // PATCH /admission/:id/cancel - Annuler une admission
    @Patch(":id/cancel")
    async cancelAdmission(
        @Param("id") id: string,
        @Body() data: CancelAdmissionInput,
        @Res() res: express.Response
    ) {
        data.admissionId = id;

        this.logger.info({
            message: "Annulation métier d'une admission",
            context: "PATCH /admission/:id/cancel",
            admissionId: id,
            reason: data.reason,
        });

        const admission = await this.service.cancelAdmission(data);

        return res.status(HttpStatus.OK).json({
            message: "Admission annulée avec succès",
            admission,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // DELETE /admission/:id - Suppression douce d'une admission
    @Delete(":id")
    async softDeleteAdmission(
        @Param("id") id: string,
        @Body() data: SoftDeleteAdmissionInput,
        @Res() res: express.Response
    ) {
        data.admissionId = id;

        this.logger.info({
            message: "Suppression douce d'une admission",
            context: "DELETE /admission/:id",
            admissionId: id,
        });

        const result = await this.service.softDeleteAdmission(data);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }
}
