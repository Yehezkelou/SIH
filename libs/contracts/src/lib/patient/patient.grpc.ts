import { Observable } from "rxjs";
import type { Metadata } from "@grpc/grpc-js";

export const PATIENT_PACKAGE = "patient";
export const PATIENT_SERVICE = "PatientInternal";

export interface VerifyPatientRequest {
  patientId: string;
  numeroPatient: string;
}

export interface GrpcPatient {
  id: string;
  numeroPatient: string;
  nom: string;
  prenom: string;
  statusDossier: "DEFINITIF" | "PROVISOIRE";
}

export interface VerifyPatientResponse {
  found: boolean;
  patient?: GrpcPatient;
}

// Interface gRPC consommée par le client Admission-service (via RxJS Observable)
export interface PatientInternalGrpc {
  VerifyPatient(data: VerifyPatientRequest, metadata?: Metadata): Observable<VerifyPatientResponse>;
}

