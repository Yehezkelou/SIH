import * as crypto from 'crypto'





// numero de de sejour
export const GeneratedEncouterId = () => {

    // format [PREFIXE]-[DATE]-[SEQUENCE]
    
    const prefixe = 'AD';
    const year  = new Date().getFullYear().toString();
    const sequence = crypto.randomBytes(4).toString("hex").toUpperCase()


    return `${prefixe}-${year}${sequence}`;
}
