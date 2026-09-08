import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AdmissionRepository } from "../repository/admission.repository";
import { PatientClientService } from "../integrations/patient.client";
import { MESSAGE_ERROR } from "../../helpers/messageError";
import {
    CreateAdmissionInput,
    UpdateAdmissionInput,
    findAdmissionByIdInput,
    findActiveAdmissionByPatientInput,
    AdmissionQueryInput,
    UpdateAdmissionStatusInput,
    DischargePatientInput,
    CancelAdmissionInput,
    SoftDeleteAdmissionInput,
} from "../validator/index";

@Injectable()
export class AdmissionService {

    constructor(
        private readonly admissionRepository: AdmissionRepository,
        private readonly patientClient: PatientClientService,
    ) {}

    // 1. Création d'une nouvelle admission
    async createNewAdmission(data: CreateAdmissionInput, files: Express.Multer.File[]) {
        const patient = await this.patientClient.verifyPatient({
            patientId: data.patientId,
            numeroPatient: data.numeroPatient,
        });

        if (!patient) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                code: MESSAGE_ERROR.ADMISSION_PATIENT_NOT_FOUND.CODE,
                message: MESSAGE_ERROR.ADMISSION_PATIENT_NOT_FOUND.MESSAGE,
            }, HttpStatus.BAD_REQUEST);
        }

        if (files && files.length > 0 && data.documents) {
            for (let i = 0; i < files.length; i++) {
                if (data.documents[i]) {
                    data.documents[i].documentExtension = files[i].mimetype;
                    data.documents[i].documentSize = files[i].size;
                    data.documents[i].documentName = files[i].originalname;
                    data.documents[i].documentUrl = files[i].path;
                }
            }
        }

        const result = await this.admissionRepository.createNewAdmission(data);

        if ("exist" in result && result.exist) {
            throw new HttpException({
                statusCode: HttpStatus.CONFLICT,
                code: MESSAGE_ERROR.ADMISSION_PATIENT_ALREADY_ACTIVE.CODE,
                message: MESSAGE_ERROR.ADMISSION_PATIENT_ALREADY_ACTIVE.MESSAGE,
                metadata: result.admission,
            }, HttpStatus.CONFLICT);
        }

        if ("numberGenerationFailed" in result) {
            throw new HttpException({
                statusCode: HttpStatus.CONFLICT,
                code: MESSAGE_ERROR.ADMISSION_NUMBER_GENERATION_FAILED.CODE,
                message: MESSAGE_ERROR.ADMISSION_NUMBER_GENERATION_FAILED.MESSAGE,
            }, HttpStatus.CONFLICT);
        }

        return result;
    }

    // 2. Recherche par ID
    async findAdmissionById(data: findAdmissionByIdInput) {
        const result = await this.admissionRepository.findAdmissionById(data);

        if (!result.existAdmission || !result.existing) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR.ADMISSION_NOT_FOUND.CODE,
                message: MESSAGE_ERROR.ADMISSION_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        return result.existing;
    }

    // 3. Recherche admission active d'un patient
    async findActiveAdmissionByPatient(data: findActiveAdmissionByPatientInput) {
        const result = await this.admissionRepository.findActiveAdmissionByPatient(data);

        if (!result.hasActiveAdmission || !result.admission) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR.ADMISSION_NOT_FOUND.CODE,
                message: "Aucune admission active n'a été trouvée pour ce patient.",
            }, HttpStatus.NOT_FOUND);
        }

        return result.admission;
    }

    // 4. Recherche filtrée + paginée
    async findAdmissions(query: AdmissionQueryInput) {
        return await this.admissionRepository.findAdmissions(query);
    }

    // 5. Modification générale d'une admission
    async updateAdmission(data: UpdateAdmissionInput, files?: Express.Multer.File[]) {
        const result = await this.admissionRepository.updateAdmission(data);

        if (!result.exist) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR.ADMISSION_NOT_FOUND.CODE,
                message: MESSAGE_ERROR.ADMISSION_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        if (result.locked) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                code: MESSAGE_ERROR.ADMISSION_LOCKED.CODE,
                message: MESSAGE_ERROR.ADMISSION_LOCKED.MESSAGE,
            }, HttpStatus.BAD_REQUEST);
        }

        return result;
    }

    // 6. Changement de statut d'une admission
    async updateAdmissionStatus(data: UpdateAdmissionStatusInput) {
        const result = await this.admissionRepository.updateAdmissionStatus(data);

        if (!result.existAdmission) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR.ADMISSION_NOT_FOUND.CODE,
                message: MESSAGE_ERROR.ADMISSION_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        if (result.invalidTransition) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                code: MESSAGE_ERROR.ADMISSION_STATUS_TRANSITION_FORBIDDEN.CODE,
                message: `${MESSAGE_ERROR.ADMISSION_STATUS_TRANSITION_FORBIDDEN.MESSAGE} (de ${result.currentStatus} vers ${result.targetStatus})`,
            }, HttpStatus.BAD_REQUEST);
        }

        return result.admission;
    }

    // 7. Sortie du patient (Discharge)
    async dischargePatient(data: DischargePatientInput) {
        const result = await this.admissionRepository.dischargePatient(data);

        if (!result.existAdmission) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR.ADMISSION_NOT_FOUND.CODE,
                message: MESSAGE_ERROR.ADMISSION_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        if (result.locked) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                code: MESSAGE_ERROR.ADMISSION_NOT_ACTIVE.CODE,
                message: MESSAGE_ERROR.ADMISSION_NOT_ACTIVE.MESSAGE,
            }, HttpStatus.BAD_REQUEST);
        }

        return result.admission;
    }

    // 8. Annulation métier d'une admission
    async cancelAdmission(data: CancelAdmissionInput) {
        const result = await this.admissionRepository.cancelAdmission(data);

        if (!result.existAdmission) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR.ADMISSION_NOT_FOUND.CODE,
                message: MESSAGE_ERROR.ADMISSION_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        if (result.locked) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                code: MESSAGE_ERROR.ADMISSION_LOCKED.CODE,
                message: "Impossible d'annuler une admission qui est déjà close ou sortie.",
            }, HttpStatus.BAD_REQUEST);
        }

        return result.admission;
    }

    // 9. Suppression douce d'une admission
    async softDeleteAdmission(data: SoftDeleteAdmissionInput) {
        const result = await this.admissionRepository.softDeleteAdmission(data);

        if (!result.existAdmission) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR.ADMISSION_NOT_FOUND.CODE,
                message: MESSAGE_ERROR.ADMISSION_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        return { message: "Admission supprimée avec succès (soft delete)" };
    }
}
