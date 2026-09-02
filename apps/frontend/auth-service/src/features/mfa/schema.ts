import { LoginTypeReponss } from "../login/schema";

export interface ResponseSetupMfa{
    message : string;
    secret: string;
    otpAuthUrl : string
}

export interface VerifyMfa {
    mfaToken : string;
    code: string
}

export interface ResponseVerifyMfa {
    mfa : LoginTypeReponss
}

export interface DisableMfa{
    password : string;
    code: string;
}

