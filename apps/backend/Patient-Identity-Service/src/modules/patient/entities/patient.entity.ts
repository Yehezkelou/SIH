import * as typeorm from "typeorm"
import { ArchivDossier } from "./archivDossier.entity";


/**
 * Entité Patient (dossier d'identité)
 *
 * C'est le dossier "maître" (MPI - Master Patient Index) qui sert à
 * identifier de façon unique une personne dans tout le système hospitalier.
 * Toutes les autres entités (admissions, consultations, factures...)
 * pointeront vers ce patient via son id ou son uniquePatientId.
 *
 * Référence : cahier_des_charges_patient_urgence.md - table `dossiers`
 */
@typeorm.Entity()
export class Patient {

    // Identifiant technique interne (clé primaire), généré automatiquement
    @typeorm.PrimaryGeneratedColumn("uuid")
    id!: string;

    // NDPU (numéro de dossier patient unique)
    // C'est l'identifiant "métier" du patient, celui qu'on montre/utilise au quotidien
    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", unique: true, nullable: false })
    uniquePatientId!: string;

    // identifiant du dossier patient absorbé
    @typeorm.Column({type : "uuid", nullable : true})
    mergeIntoPatientId?: string

    
    // ===== identité civile =====

    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar" })
    nom!: string;

    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar" })
    prenom!: string

    @typeorm.Index()
    @typeorm.Column({ type: "integer" })
    age!: number;

    @typeorm.Index()
    @typeorm.Column({ type: "enum", enum: ["M", "F"] })
    genre!: "M" | "F";

    // Date de naissance : champ clé pour identifier/rapprocher un patient
    // (contrairement à "age" qui devient obsolète avec le temps)
    @typeorm.Index()
    @typeorm.Column({ type: "date", nullable: true })
    dateNaissance?: string;

    // Lieu de naissance (ville/commune), utile pour lever les doublons homonymes
    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    lieuNaissance?: string;

    // lien entre le patient et ses dossiers
    @typeorm.OneToMany(() => ArchivDossier, (archivDossier) => archivDossier.patient)
    archivDossier?: typeorm.Relation<ArchivDossier[]>



    // ===== filiation =====
    // Utile pour identifier un patient mineur ou distinguer deux homonymes
    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    nomPere?: string;

    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    nomMere?: string;

    @typeorm.Index()
    @typeorm.Column({type: "varchar", length : 255, nullable : true})
    tuteur?: string

    @typeorm.Index()
    @typeorm.Column({length : 255, type : "varchar", nullable : true})
    numeroPere? : string

    @typeorm.Index()
    @typeorm.Column({length : 255, type : "varchar", nullable : true})
    numeroMere? : string

    @typeorm.Index()
    @typeorm.Column({length : 255, type : "varchar", nullable : true})
    numeroTuteur? : string

    // ===== donné de contact =====
    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar" , nullable : true})
    email?: string

    // Numéro de téléphone principal du patient
    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar" , nullable : true})
    numero?: string

    // Numéro de téléphone secondaire (facultatif)
    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    numeroSecondaire?: string;

    // Contact à joindre en cas d'urgence (parent, tuteur, proche...)
    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    contactUrgence?: string;

    // identifiant unique
    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", unique: true , nullable : true})
    numSecuSocial?: string

    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", unique: true , nullable : true})
    numIdentityNational?: string

    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", unique: true , nullable : true})
    numeroPassport?: string

    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", unique: true , nullable : true})
    numCMU?: string

    // champs concernant les dossier provisoir 
    @typeorm.Column({type : "enum", enum : ["PROVISOIRE", "DEFINITIF"],  default: "DEFINITIF"})
    statusDossier! : "PROVISOIRE" | "DEFINITIF"

    // motif du provisoir 
    @typeorm.Column({type : "enum", enum : ["URGENCE_VITAL", "PATIENT_INCONSCIENT", "IDENTITE_INCONNUE", "MINEUR_NON_ACCOMPAGNE", "PANNE_SYSTEME", "AUTRE"], nullable : true})
    motifDossierProvisoire? : "URGENCE_VITAL" | "PATIENT_INCONSCIENT" | "IDENTITE_INCONNUE" | "MINEUR_NON_ACCOMPAGNE" | "PANNE_SYSTEME" | "AUTRE"

    // service a l'origine de la creation 
    @typeorm.Column({type : "varchar", length : 255, nullable : true})
    serviceCreation!: string

    // quelque motif pour identifier le patient inconscient/inconnu 
    @typeorm.Column({type : "text", nullable : true})
    signalement!: string

    // date limite de regularisation 
    @typeorm.Column({type : "timestamp", nullable : true})
    dateLimiteRegulation!: Date

    // date de regularisation 
    @typeorm.Column({type : "timestamp", nullable : true})
    regularisAt!: Date 

    // utilisateur qui a fait la regularisation 
    @typeorm.Column({type : "varchar", length : 255, nullable : true})
    regularisBy!: string

    // metadonnée systeme
    @typeorm.CreateDateColumn()
    createdAt!: Date;

    @typeorm.UpdateDateColumn()
    updatedAt!: Date;

    // Utilisateur/compte à l'origine de la création du dossier
    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    createdBy!: string

    // Utilisateur/compte à l'origine de la dernière modification du dossier
    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    updatedBy?: string;

    // Suppression douce (soft delete) : un dossier patient n'est jamais
    // supprimé physiquement, on le marque juste comme "supprimé" à cette date.
    // TypeORM ignore automatiquement les lignes où deletedAt est renseigné.
    @typeorm.DeleteDateColumn()
    deletedAt?: Date;

    // Utilisateur/compte à l'origine de la suppression du dossier
    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    deletedBy?: string;
}