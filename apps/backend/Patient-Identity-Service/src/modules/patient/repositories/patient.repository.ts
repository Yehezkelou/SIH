import { DataSource, ILike, Raw, Repository } from "typeorm";
import { Patient } from "../entities/patient.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePatientInput, SearchPatientInput, UpdatePatientInput } from "../validator";
import { PatientIdGenerated } from "../../../helpers/func/uniquePatientIdGenerated";



@Injectable()
export class PatientRepository extends Repository<Patient> {

     
    //injecter la config qui permet de communiquer avec notre base donner 
    // et d y effectuer des methode 
    constructor(private dataSource: DataSource) {
        super(Patient, dataSource.createEntityManager())
    }


    //creation d'un patient 
    async createNewPatient(data: CreatePatientInput) {


        // existing Patient 
            const existingPatient  = await this.findOne({
                where : [
                    {numIdentityNational : data.uniqueIdentity.numIdentityNational},
                    {numSecuSocial : data.uniqueIdentity.numSecuSocial}
                ]
            })

        if (existingPatient) {

            // on retourne l'exception avec la cause et la description 
            throw new HttpException({
                message : "PATIENT ALREADY EXIST",
                data : existingPatient
            }, HttpStatus.BAD_REQUEST)
        }

        
        let patientId = ""
        let isUnique = false 

        while(!isUnique){

            patientId = PatientIdGenerated(data.identity.prenom)

            const existingPatientId = await this.findOne({
                where : {uniquePatientId : patientId}
            })

            if(!existingPatientId){
                isUnique = true 
            }
        }

        // create patient 
        const patient = this.create({

            nom: data.identity.nom,
            prenom: data.identity.prenom,
            age: data.identity.age,
            genre: data.identity.genre,

            email: data.contact.email,
            numero: data.contact.numero,

            numIdentityNational: data.uniqueIdentity.numIdentityNational,
            numSecuSocial: data.uniqueIdentity.numSecuSocial,
            uniquePatientId : patientId,

            createdBy: data.CreatedBy.createdBy
        })

        return await this.save(patient)

    }


    // update patient 
    async updatePatient(data: UpdatePatientInput, Id: string, patientId : string) {

        // rechercher le patient concerné
        const existing = await this.findOne({
            where: { id: Id, uniquePatientId : patientId}
        })

        if (!existing) throw new HttpException("PATIENT NOT FOUND", HttpStatus.NOT_FOUND)


        // merge faire la comparaison entre les ancienne donné et les nouvelle
        const patient = this.merge(existing, {
            nom: data.identity?.nom,
            prenom: data.identity?.prenom,
            age: data.identity?.age,
            genre: data.identity?.genre,

            numero: data.contact?.numero
        })

        return await this.save(patient)
    }



    // trouver des patient selon un critere
    async findPatient(query: SearchPatientInput) {


        // recherche precise par champ unique
        if(query.numIdentityNational || query.numSecuSocial ||query.uniquePatientId){

            const conditionsUnique = []

            if(query.numIdentityNational) conditionsUnique.push({numIdentityNational : query.numIdentityNational})
            if(query.numSecuSocial) conditionsUnique.push({numSecuSocial : query.numSecuSocial})
            if(query.uniquePatientId) conditionsUnique.push({uniquePatientId : query.uniquePatientId})


            const existing = await this.findOne({
                where : conditionsUnique
            })

            if(!existing) throw new HttpException("PATIENT NOT FOUND", HttpStatus.NOT_FOUND)

            return {
                total : 1,
                exactMatch : true,
                patients : [existing]
            }
        }

        
        // recherche flou 
        const whereObject: any = {}

        if (query.nom) {
            whereObject["nom"] = ILike(`%${query.nom}%`)
        }

        if (query.prenom) {
            whereObject["prenom"] = ILike(`%${query.prenom}%`)
        }

        if (query.age) { whereObject["age"] = query.age}
        if (query.genre) { whereObject["genre"] = query.genre }
        if (query.email) { whereObject["email"] = query.email }
        if (query.numero) { whereObject["numero"] = query.numero }

        const [patients, total] = await this.findAndCount({
            where: { ...whereObject },

            order: {
                createdAt: query?.sort === "desc" ? 'DESC' : "ASC",
                nom: "ASC",
                prenom: "ASC"
            },

            take: query.limit,
            skip: (query.page - 1) * query.limit

        })

        if(total === 0){
            throw new HttpException("PATIENT NOT FOUND", HttpStatus.NOT_FOUND)
        }

        return {
            total, 
            exactMatch : false,
            patients
        }

    }


    // trouver tout les patient
    async findAllPatient(){

        const [patients, total] = await this.findAndCount({
            order : {
                createdAt : "DESC",
                nom : "ASC",
                prenom : "ASC"
            },

            take : 20,
            skip : 0

        })

        if(total === 0){
            throw new HttpException("PATIENT NOT FOUND", HttpStatus.NOT_FOUND)
        }

        return {total, patients}
    }
}


