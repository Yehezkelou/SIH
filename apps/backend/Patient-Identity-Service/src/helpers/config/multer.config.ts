import {diskStorage} from "multer"
import * as fs from "fs"
import { extname } from "path"
import { HttpException, HttpStatus } from "@nestjs/common"


const MAX_SIZE_FILE = 5 * 1024 * 1024

// mime valide
const MIMETYPES  = ["application/pdf", "image/jpg", "image/jpeg", "image/png", "image/jpeg"]

// racine de stockage des dossiers patient
const UPLOAD_ROOT = "./upload/patient"

export const MulterConfiPatientFile = {

    storage : diskStorage({

        //destination
        destination : (req : any, file, cb) => {

            // un seul id de dossier genere par requete, partage par tous les fichiers de l'upload
            if(!req.dossierUploadId){
                req.dossierUploadId = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
            }

            const dest = `${UPLOAD_ROOT}/${req.dossierUploadId}`

            fs.mkdir(dest, { recursive : true }, (err) => {
                cb(err, dest)
            })
        },

        //filename 
        filename : (
            req,
            file,
            cb,
        ) => {

            // generer un suffix unique pour eviter les collision
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

            // recuperer l'extension
            const ext = extname(file.originalname);

            // appeler le callback
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)

        }
    }),

    limits : {
        fileSize : MAX_SIZE_FILE,
    },


    fileFilter : (req : Request, file : Express.Multer.File, cb : any) => {

        const validType = MIMETYPES.includes(file.mimetype)

        if(validType){
            cb(null, true)
        }else{
            cb(
                new HttpException("fichier invalide", HttpStatus.BAD_REQUEST),
                false
            )
        }
    }
}