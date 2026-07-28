import * as crypto from "crypto"



export const PatientIdGenerated = (name: string, isProvisoir : boolean = false) : string => {

    // Format [PREFIXE]-[ISO_DATE]-[STARWITH(NOM)]-[SEQUENCE]

    const prefixe = isProvisoir ? "PPI" :  "SIH" 
    const year = new Date().getFullYear().toString()
   
    // on securise la premier lettre du nom
    const firstLetterNom = name && name.length > 0 ? name.charAt(0).toUpperCase() : "X"

    // on genere une sequence aléatoire sécurisé et courte 
    // utilisation de randomBytes(4)
    const sequence = crypto.randomBytes(4).toString("hex").toUpperCase();

    

    // resultat : 
    return `${prefixe}-${year}-${firstLetterNom}-${sequence}`
}