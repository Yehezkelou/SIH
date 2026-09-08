import { BadRequestException } from "@nestjs/common"
import * as fs from "fs"
import {diskStorage,} from "multer"
import { extname } from "path"


// taille des fichiers
const MAX_SIZE_FILE = 10 * 1024 * 1024


// mime valide 
const MIMETYPES = ["application/pfd", "image/jpeg", "image/png", "image/jpg"]

// racine de stokage des dossier patient 
const UPLOAD_ROOT = "./upload/admission"

export const MulterConfigAdmissionFile = {

    storage : diskStorage({

        // destination 
        destination : (req: any, file, cb) => {

            // un seul id de dossier genere par requete

            if(!req.dossierUploadId){
                req.dossierUploadId = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
            }

            const dest = `${UPLOAD_ROOT}/${req.dossierUploadId}`

            fs.mkdir(dest, {recursive : true}, (err) => {
                cb(err, dest)
            })
            
        },

        // fileName 
        filename : (req, file, cb) =>  {

            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)

            const ext = extname(file.originalname);

            // appeler le callback 
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
        }
    }),

    limits : {
        fileSize : MAX_SIZE_FILE
    },

    fileFilter : (req: Request, file : Express.Multer.File, cb: any) => {

        // verifier les mimesype 

        const valideFile = MIMETYPES.includes(file.mimetype)

        if(valideFile){
            cb(null, true)
        }else{
            cb(new BadRequestException("Fichier invalide, seut format autoriser: pdf, png, jpeg, jpg"), false)
        }
    }
}