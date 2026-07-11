import * as crypto from 'crypto'






export const GeneratedEncouterId = () => {

    // format [PREFIXE]-[DATE]-[SEQUENCE]
    
    const prefixe = 'EN';
    const year  = new Date().getFullYear().toString();
    const sequence = crypto.randomBytes(4).toString("hex").toUpperCase()


    return `${prefixe}-${year}-${sequence}`;
}