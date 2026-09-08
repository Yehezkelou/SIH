import { Observable } from "rxjs";
import type { Metadata } from "@grpc/grpc-js";

export const AUTH_PACKAGE = "auth";
export const AUTH_SERVICE = "AuthInternal";

export interface ValidateTokenRequest {
  accessToken: string;
}

export interface ValidateTokenResponse {
  isValid: boolean;
  userId: string;
  matricule: string;
  roles: string[];
  permissions: string[];
}

export interface GetUserRequest {
  userId: string;
}

export interface GrpcUserPersonnel {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  email: string;
  personnelType: string;
  specialite?: string;
  serviceAffectation?: string;
}

export interface GetUserResponse {
  found: boolean;
  user?: GrpcUserPersonnel;
}

// Interface gRPC consommée par les clients (via RxJS Observable)
export interface AuthInternalGrpc {
  ValidateToken(data: ValidateTokenRequest, metadata?: Metadata): Observable<ValidateTokenResponse>;
  GetUser(data: GetUserRequest, metadata?: Metadata): Observable<GetUserResponse>;
}
