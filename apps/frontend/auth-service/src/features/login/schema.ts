
// interface pour les request login
export interface LoginTypeInput {
    identifier:  string;
    password : string;
}

// interface pour la reponse 
export interface User {
    id : string;
    matricule : string;
    nom : string;
    prenom: string;
    personnelType : string;
    serviceAffectation : string | undefined;
    roles : string[];
    permissions: string[]
}
export interface LoginTypeReponss {
    message : string;
    accessToken : string;
    refreshToken: string;
    user : User;
}

