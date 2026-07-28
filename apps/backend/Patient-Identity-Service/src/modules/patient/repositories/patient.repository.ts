import { DataSource, ILike, Repository } from "typeorm";
import { Patient } from "../entities/patient.entity";
import { Injectable } from "@nestjs/common";
import { CreatePatientInput, CreatePatientProvisoirInput, FindOnePatientInput, RegularizationPatientInput, SearchPatientInput, SoftDeleteOnePatientInput, UpdatePatientInput } from "../validator";
import { PatientIdGenerated } from "../../../helpers/func/uniquePatientIdGenerated";




@Injectable()
export class PatientRepository extends Repository<Patient> {

     
    //injecter la config qui permet de communiquer avec notre base donner 
    // et d y effectuer des methode 
    constructor(dataSource: DataSource) {
        super(Patient, dataSource.createEntityManager())
    }


    //creation d'un patient 
    async createNewPatient(data: CreatePatientInput) {


        // existing Patient 
            const existingPatient  = await this.findOne({
                where : [
                    {numIdentityNational : data.uniqueIdentity.numIdentityNational},
                    {numSecuSocial : data.uniqueIdentity.numSecuSocial},
                    {numCMU : data.uniqueIdentity.numeroCMU},
                    {numeroPassport : data.uniqueIdentity.numeroPassport}
                ]
            })

        if (existingPatient) {
            return {
                exist : true,
                existingPatient
            }
        } 
        
        const MaxFind = 5
        let numeroDossier = ""

        for(let i = 1; i <= MaxFind; i++){
            
            numeroDossier = PatientIdGenerated(data.identity.nom)
            const existing = this.findOne({
                where : {
                    uniquePatientId : numeroDossier
                }
            })
            
            if(!existing){
                break;
            }else{
                return {
                    existNumero: true,
                    existingNumero : existing,
                }
            }
        }

        // create patient 
        const patient = this.create({


            // identité propre
            nom: data.identity.nom,
            prenom: data.identity.prenom,
            age: data.identity.age,
            genre: data.identity.genre,
            dateNaissance : data.identity.dateNaissance.toDateString(),
            lieuNaissance : data.identity.lieuNaissance,

            //famille 
            nomPere : data.famille.nomPere,
            nomMere : data.famille.nomPere,
            tuteur : data.famille.tuteur,
            numeroPere : data.famille.numeroPere,
            numeroMere : data.famille.numeroMere,
            numeroTuteur : data.famille.numeroTuteur,

            // donnée de contact
            email: data.contact.email,
            numero: data.contact.numero,
            contactUrgence : data.contact.conctactUrgence,
            numeroSecondaire : data.contact.numeroSecondaire,
            

            // unique identité
            numIdentityNational: data.uniqueIdentity.numIdentityNational,
            numSecuSocial: data.uniqueIdentity.numSecuSocial,
            numeroPassport : data.uniqueIdentity.numeroPassport,
            numCMU : data.uniqueIdentity.numeroCMU,
            uniquePatientId : numeroDossier,


            createdBy: data.CreatedBy.createdBy
        })

        return await this.save(patient)

    }

    // create patient provisoire
    async createPatientProvisoir(data : CreatePatientProvisoirInput){


        const MAX_FIND = 5
        let numeroDossier = ""

        for(let i = 0; i< MAX_FIND; i++){
            const numeroDossier = PatientIdGenerated(data.identity.nom, true);

            const patient = await this.findOne({
                where : {
                    uniquePatientId : numeroDossier
                }
            })

            if(!patient){
                break;
            }else{
                return {
                    existNumero:true,
                    existingNumero : patient
                }
            }

        }

        const patient = await this.create({
            
            // status 
            statusDossier : "PROVISOIRE",

            // identité 
            nom : data.identity.nom,
            prenom : data.identity.prenom,
            genre : data.identity.genre,
            age : data.identity.age,

            // urgence 
            motifDossierProvisoire : data.urgence.motifProvisoir,
            serviceCreation : data.urgence.serviceCreation,
            signalement : data.urgence.signalement,

            // contact
            email : data.contact?.email,
            numero : data.contact?.numero,
            contactUrgence : data.contact?.contactUrgence,
            
            // numero dossier 
            uniquePatientId : numeroDossier,


            // delay du dossier patient 
            dateLimiteRegulation : new Date().getHours() + parseInt(process.env.PROVISIONAL_DOSSIER_DELAY_HOURS || "48"),
            
            // auteur
            createdBy : data.createdBy,
 
        })

        return await this.save(patient);
    }

    // regulariser patient provisoir
    async regularisationPatient(data : RegularizationPatientInput){

        const dossierProvisoir = await this.findOne({
            where : {
                id : data.patientId,
                uniquePatientId : data.numeroDossier,
            }
        })

        if(!dossierProvisoir){
            return {
                provisoirExist : false,
            }
        }else if(dossierProvisoir.statusDossier === "DEFINITIF"){
            return {
                status : true,
                dossierProvisoir
            }
        }


        const existingPatient = await this.findOne({
            where :[ 
                {numIdentityNational : data.uniqueIdentity.numIdentityNational || ""},
                {numSecuSocial : data.uniqueIdentity.numSecuSocial || ""},
                {numeroPassport : data.uniqueIdentity.numeroPassport || ""},
                {numCMU : data.uniqueIdentity.numeroCMU || ""},
            ]
        })
        

        if(existingPatient){
            return {
                exist : true,
                existingPatient
            }
        }

        //merge 
        
        const patient = this.merge(dossierProvisoir, {
            // status 
            statusDossier : "DEFINITIF",

            // identié
            nom : data.identity.nom,
            prenom : data.identity.prenom,
            age : data.identity.age,
            genre : data.identity.genre,
            dateNaissance : data.identity.dateNaissance.toDateString(),
            lieuNaissance : data.identity.lieuNaissance,

            // famille
            nomPere : data.famille?.nomPere,
            nomMere : data.famille?.nomMere,
            tuteur : data.famille?.tuteur,
            numeroPere : data.famille?.numeroPere,
            numeroMere : data.famille?.numeroMere,
            numeroTuteur : data.famille?.numeroTuteur,

            // contact
            email : data.contact?.email,
            numero : data.contact?.numero,
            contactUrgence : data.contact.conctactUrgence,
            numeroSecondaire : data.contact.numeroSecondaire,

            // unique identité
            numIdentityNational : data.uniqueIdentity.numIdentityNational,
            numSecuSocial : data.uniqueIdentity.numSecuSocial,
            numeroPassport : data.uniqueIdentity.numeroPassport,
            numCMU : data.uniqueIdentity.numeroCMU,

            //info d'audit 
            regularisBy : data.updatedBy,
            regularisAt : new Date(),

        });


        return await this.save(patient)
    }

    // update patient 
    async updatePatient(data: UpdatePatientInput) {

        // rechercher le patient concerné
        const existing = await this.findOne({
            where: { id: data.patientId, uniquePatientId : data.numeroDossier}
        })

        if (!existing) return null

        // merge faire la comparaison entre les ancienne donné et les nouvelle
        const patient = this.merge(existing, {

            // identité propre
            nom: data.identity?.nom,
            prenom: data.identity?.prenom,
            age: data.identity?.age,
            genre: data.identity?.genre,
            dateNaissance : data.identity?.dateNaissance?.toDateString(),
            lieuNaissance : data.identity?.lieuNaissance,

            // famille
            nomPere : data.famille?.nomPere,
            nomMere : data.famille?.nomMere,
            tuteur : data.famille?.tuteur,
            numeroPere : data.famille?.numeroPere,
            numeroMere : data.famille?.numeroMere,
            numeroTuteur : data.famille?.numeroTuteur,

            // contact
            email: data.contact?.email,
            numero: data.contact?.numero,
            contactUrgence : data.contact?.conctactUrgence,
            numeroSecondaire : data.contact?.numeroSecondaire,

            // unique identité
            numIdentityNational: data.uniqueIdentity?.numIdentityNational,
            numSecuSocial: data.uniqueIdentity?.numSecuSocial,
            numeroPassport : data.uniqueIdentity?.numeroPassport,
            numCMU : data.uniqueIdentity?.numeroCMU,

            // updatedBy
            updatedBy : data.updatedBy,
        })

        return await this.save(patient)
    }


    

    // trouver des patient selon un critere
    async findPatient(query: SearchPatientInput) {


        // recherche precise par champ unique
        if(query.numIdentityNational 
            || query.numSecuSocial 
            ||query.uniquePatientId
            || query.numCMU
            || query.numeroPassport
        ){

            const conditionsUnique = []

            if(query.numIdentityNational) conditionsUnique.push({numIdentityNational : query.numIdentityNational})
            if(query.numSecuSocial) conditionsUnique.push({numSecuSocial : query.numSecuSocial})
            if(query.uniquePatientId) conditionsUnique.push({uniquePatientId : query.uniquePatientId})
            if(query.numCMU) conditionsUnique.push({numCMU : query.numCMU})
            if(query.numeroPassport) conditionsUnique.push({numeroPassport : query.numeroPassport})



            const existing = await this.findOne({
                where : conditionsUnique
            })

            if(!existing) return null

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

        if(total === 0) return null

        return {
            total, 
            exactMatch : false,
            patients
        }

    }


    // trouver tout les patient
    async findAllPatient(page : number, limit : number){

        const [patients, total] = await this.findAndCount({
            order : {
                createdAt : "DESC",
                nom : "ASC",
                prenom : "ASC"
            },

            take : limit,
            skip : (page - 1) * limit

        })

        if(total === 0) return null

        return {
            total,
            patients
        }
    }


    // trouver un seul patient 
    async findOnePatient(data : FindOnePatientInput){

        const existing = await this.findOne({
            where : {
                uniquePatientId : data.numeroDossier,
                id : data.patientId
            }
        })

        if(!existing) return null

        return existing
    }

    // supression en douce du patient 
    async softDeletePatient(data : SoftDeleteOnePatientInput){
        const existing = await this.findOne({

            where : {
                id : data.patientId,
                uniquePatientId : data.numeroDossier,
                deletedAt : undefined
            }
        })

        if(!existing) return null

        existing.deletedBy = data.deletedBy

        return this.softDelete(existing)
    }

}


