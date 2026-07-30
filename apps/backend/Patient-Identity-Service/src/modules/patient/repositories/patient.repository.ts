import { DataSource, ILike, Repository } from "typeorm";
import { Patient } from "../entities/patient.entity";
import { Injectable } from "@nestjs/common";
import { CreatePatientInput, CreatePatientProvisoirInput, FindOnePatientInput, MergePatientInput, RegularizationPatientInput, SearchPatientInput, SoftDeleteOnePatientInput, UpdatePatientInput } from "../validator";
import { PatientIdGenerated } from "../../../helpers/func/uniquePatientIdGenerated";
import { toEntitySnapshot } from "../../../helpers/entitySnapshot";
import { ArchivDossier } from "../entities/archivDossier.entity";
import { id } from "zod/locales";
import { PatientMergeLog } from "../entities/patientMergeLog.entity";



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
                    existNumero: true,
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
        if (query.statusDossier) { whereObject["statusDossier"] = query.statusDossier}

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

    // fusion du patient 
    async fusionPatient(data : MergePatientInput){

        const patient = this.dataSource.transaction(async (manager) => {

            // la source 
            const source = await manager.findOne(Patient, {
                where : {id : data.sourcePatientId},
                withDeleted : false
            }) 

            // cible 
            const target = await manager.findOne(Patient, {
                where : {id : data.targetPatientId}, 
                withDeleted : false
            })

            if(!target){
                return {
                    targetNotFound : true
                }
            }else if(target.mergeIntoPatientId){
                return {
                    alreadyMerge : true,
                    patient : target
                }
            }
            
            if(!source) {
                return {
                    sourceNotFound : true
                }
            }else if(source.mergeIntoPatientId){
                return {
                    alreadyMerge : true,
                    patient : source
                }
            }

            //  instantane
            const snapShotSource = toEntitySnapshot(source, this.metadata)
            const snapShotTargetBefore = toEntitySnapshot(target, this.metadata)

    
            // merge 
            const patient = this.merge(target, {

                // identité 
                nom : data.ChampsAConserver?.identity?.nom ?? target.nom ?? source.nom,
                prenom : data.ChampsAConserver?.identity?.prenom ?? target.prenom ?? source.prenom,
                dateNaissance : data.ChampsAConserver?.identity?.dateNaissance.toDateString() ?? target.dateNaissance ?? source.dateNaissance,
                lieuNaissance : data.ChampsAConserver?.identity?.lieuNaissance ?? target.lieuNaissance ?? source.lieuNaissance,
                age : data.ChampsAConserver?.identity?.age ?? target.age ?? source.age,
                genre : data.ChampsAConserver?.identity?.genre ?? target.genre ?? source.genre,

                // famille
                nomPere : data.ChampsAConserver?.famille?.nomPere ?? target.nomPere ?? source.nomPere,
                nomMere : data.ChampsAConserver?.famille?.nomMere ?? target.nomMere ?? source.nomMere,
                tuteur : data.ChampsAConserver?.famille?.tuteur ?? target.tuteur ?? source.tuteur,
                numeroPere : data.ChampsAConserver?.famille?.numeroPere ?? target.numeroPere ?? source.numeroPere,
                numeroMere : data.ChampsAConserver?.famille?.numeroMere ?? target.numeroMere ?? source.numeroMere,
                numeroTuteur : data.ChampsAConserver?.famille?.numeroTuteur ?? target.numeroTuteur ?? source.numeroTuteur,

                // contact
                email : data.ChampsAConserver?.contact?.email ?? target.email ?? source.email,
                numero : data.ChampsAConserver?.contact?.numero ?? target.numero ?? source.numero,
                contactUrgence : data.ChampsAConserver?.contact?.conctactUrgence ?? target.contactUrgence ?? source.contactUrgence,
                numeroSecondaire : data.ChampsAConserver?.contact?.numeroSecondaire ?? target.numeroSecondaire ?? source.numeroSecondaire,

                // unique identity
                numIdentityNational : data.ChampsAConserver?.uniqueIdentity?.numIdentityNational ?? target.numIdentityNational ?? source.numIdentityNational,
                numSecuSocial : data.ChampsAConserver?.uniqueIdentity?.numSecuSocial ?? target.numSecuSocial ?? source.numSecuSocial,
                numeroPassport : data.ChampsAConserver?.uniqueIdentity?.numeroPassport ?? target.numeroPassport ?? source.numeroPassport,
                numCMU : data.ChampsAConserver?.uniqueIdentity?.numeroCMU ?? target.numCMU ?? source.numCMU,
            })

            // deplacer les dossier vers la cible 

            this.manager.update(ArchivDossier, {
                patient : {
                    id : source.id
                }, 
        
            },
            {
                patient : target , dossierId : target.id 
            } 
        )

        // mettre ajour l'id du dossier absorbé 
        source.mergeIntoPatientId = target.id

        // softe delete de la source 
        this.manager.softDelete(Patient , source)

        // insere patient mergeLog
        const patientMergeLog = this.manager.create(PatientMergeLog, {

            // identité
            sourceNumeroDossier : source.uniquePatientId,
            sourcePatientId : source.id,
            targetNumeroDossier : target.uniquePatientId,
            targetPatientId : target.id,

            // snapShot
            sourceSnapShot : snapShotSource,
            targetSnapShotAfter : toEntitySnapshot(patient, this.metadata),
            targetSnapShotBefore : snapShotTargetBefore,

            // raison de la fusion 
            motifFusion : data.motifFusion,

            // auteur
            mergedBy : data.mergeBy
        })

        manager.save(PatientMergeLog, patientMergeLog)

        return {
            target : patient,
            mergeLog : PatientMergeLog 
        }
    })
    }
    
}



 