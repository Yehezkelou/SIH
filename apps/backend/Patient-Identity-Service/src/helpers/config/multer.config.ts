import {} from "multer"



const MAX_SIZE_FILE = 5 * 1024 * 1024

const MIMETYPES  = ["application/pdf", "image/jpg", "image/jpeg", "image/png", "image/jpeg"]

const PATH_FILES = "./uploads/patients"



const  MulterConfiPatientFile = {

    destination : PATH_FILES
}