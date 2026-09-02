import { apiClient } from "@/lib/api-client";
import { type DisableMfa, type ResponseSetupMfa, type ResponseVerifyMfa, type VerifyMfa } from "../schema";



// api setup mfa
export async function SetupMfa(credentials: string): Promise<ResponseSetupMfa> {
    const response = await apiClient.post("auth/mfa/setup", credentials);
    return response.data;
}

// activation mfa
export async function EnableMfa(credentials : string): Promise<{message : string}>{
    const response = await apiClient.post("auth/mfa/enable", credentials)
    return response.data
}

// verification topt
export async function VerifyMfa(credentials : VerifyMfa): Promise<ResponseVerifyMfa>{
    const response = await apiClient.post("auth/mfa/verify", credentials)
    return response.data
}

// desactivation mfa
export async function DisableMfa(credentials : DisableMfa): Promise<{message : string}>{
    const response = await apiClient.post("auth/mfa/disable", credentials)
    return response.data
}


