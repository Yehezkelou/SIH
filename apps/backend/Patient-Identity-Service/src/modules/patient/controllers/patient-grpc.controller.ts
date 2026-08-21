import { Controller, UseGuards } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { PinoLogger } from "nestjs-pino";
import type { VerifyPatientRequest, VerifyPatientResponse } from "@org/contracts";
import { PatientInternalService } from "../services/patient-internal.service";
import { ServiceAuthGuard } from "../../../shared/guards/service-auth.guard";

@Controller()
export class PatientGrpcController {
  constructor(
    private readonly service: PatientInternalService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(PatientGrpcController.name);
  }

  
  @UseGuards(ServiceAuthGuard)
  @GrpcMethod("PatientInternal", "VerifyPatient")
  async verifyPatient(data: VerifyPatientRequest): Promise<VerifyPatientResponse> {
    this.logger.info({
      message: "Demande de vérification patient gRPC reçue",
      context: "PatientGrpcController:verifyPatient",
      data,
    });

    const result = await this.service.VerifyPatient(data);

    if (!result.exist || !result.response) {
      this.logger.warn({
        message: "Patient introuvable via gRPC",
        context: "PatientGrpcController:verifyPatient",
        patientId: data.patientId,
      });
      return { found: false };
    }

    return {
      found: true,
      patient: {
        id: result.response.id,
        numeroPatient: result.response.numeroPatient,
        nom: result.response.nom,
        prenom: result.response.prenom,
        statusDossier: result.response.statusDossier as "DEFINITIF" | "PROVISOIRE",
      },
    };
  }
}
