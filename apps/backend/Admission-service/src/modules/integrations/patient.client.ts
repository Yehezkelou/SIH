import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import {
    GetPatientInput,
    PatientSharedResponseInput,
    PatientSharedResponseSchema,
    PatientInternalGrpc,
} from "@org/contracts";
import { MESSAGE_ERROR_INTEGRATION } from "../../helpers/messageError";

@Injectable()
export class PatientClientService implements OnModuleInit {
    private patientGrpc!: PatientInternalGrpc;

    constructor(
        @Inject("PATIENT_PACKAGE") private readonly client: ClientGrpc
    ) {}

    onModuleInit() {
        // Récupération de l'interface gRPC du service "PatientInternal"
        this.patientGrpc = this.client.getService<PatientInternalGrpc>("PatientInternal");
    }

    async verifyPatient(data: GetPatientInput): Promise<PatientSharedResponseInput | null> {
        try {
            // 1. Appel binaire gRPC ultra-rapide
            const res = await lastValueFrom(this.patientGrpc.VerifyPatient(data));

            // 2. Si res.found est false ➔ patient inexistant
            if (!res.found || !res.patient) {
                return null;
            }

            // 3. Validation de sécurité Zod
            const parsed = PatientSharedResponseSchema.safeParse(res.patient);
            if (!parsed.success) {
                throw new HttpException(
                    { message: "Rupture de contrat applicatif", detail: parsed.error.message },
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }

            return parsed.data;
        } catch (error: any) {
            // Code gRPC status 5 = NOT_FOUND
            if (error?.code === 5) return null;

            throw new HttpException(
                {
                    statusCode: HttpStatus.SERVICE_UNAVAILABLE,
                    message: MESSAGE_ERROR_INTEGRATION.INTEGRATION_PATIENT_NOT_FOUND.MESSAGE,
                    code: MESSAGE_ERROR_INTEGRATION.INTEGRATION_PATIENT_NOT_FOUND.CODE,
                    detail: error?.message,
                },
                HttpStatus.SERVICE_UNAVAILABLE
            );
        }
    }
}