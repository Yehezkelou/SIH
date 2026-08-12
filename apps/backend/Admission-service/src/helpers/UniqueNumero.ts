import * as crypto from 'crypto'


// numero d'admission lisible (Admission.admissionNumber)
// format [PREFIXE]-[ANNEE][SEQUENCE]
export const GeneratedAdmissionNumber = () => {

    const prefixe = 'AD';
    const year = new Date().getFullYear().toString();
    const sequence = crypto.randomBytes(4).toString("hex").toUpperCase()

    return `${prefixe}-${year}${sequence}`;
}

// numero de sejour lisible (Encounter.encounterNumber)
export const GeneratedEncounterNumber = () => {

    const prefixe = 'ENC';
    const year = new Date().getFullYear().toString();
    const sequence = crypto.randomBytes(4).toString("hex").toUpperCase()

    return `${prefixe}-${year}${sequence}`;
}
