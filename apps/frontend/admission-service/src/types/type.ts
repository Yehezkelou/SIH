


export interface CurrentUser {
    id: string;
    matricule: string;
    email: string;
    nom: string;
    prenom: string;
    personnelType: string;
    serviceAffectation?: string;
    roles: string[];
    permissions: string[];
}

export interface MeResponse {
    user: CurrentUser;
    status: number;
    timeStamp: string;
} 