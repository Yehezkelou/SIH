import {Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"
import { AdmissionStatus, AdmissionType } from "./admission.enum"
import { AdmissionDocument } from "./admissionDocument.entity"
import { AdmissionCompanion } from "./admissionCompanion.entity"
import { AdmissionPayer } from "./admissionPayer.entity"
import { Encounter } from "./encounter.entity"





@Entity("admission")
export class Admission {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    // reference vers le microservice Patient-Identity-Service
    @Index()
    @Column({type : "uuid"})
    patientId!: string

    // numero d'admission lisible (equivalent de Patient.uniquePatientId),
    // utilise par le personnel pour reference papier/telephonique/facturation
    @Index()
    @Column({type : "varchar", length : 255, unique : true, nullable : true})
    admissionNumber!: string

    @Index()
    @Column({type : "uuid", nullable : true})
    doctorId!: string

    // champ propre a l'admission
    @Index()
    @Column({type : "enum", enum : AdmissionType, nullable : false})
    admissionType!: string

    @Index()
    @Column({type : "enum", enum : AdmissionStatus, default : AdmissionStatus.PENDING})
    admissionStatus!: string

    @Index()
    @Column({type : "text", nullable : true})
    reason!: string


    // Date 
    @Index()
    @Column({type : "timestamp", nullable : true})
    admissionDate!: Date

    @Index()
    @Column({type : "timestamp", nullable : true})
    expectedDischarge!: Date

    @Index()
    @Column({type : "timestamp", nullable : true})
    actualDischarge!: Date 

    // Audit 
    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    // Utilisateur/compte a l'origine de la creation de l'admission
    @Column({length : 255, type : "varchar", nullable : true})
    createdBy?: string

    // Utilisateur/compte a l'origine de la derniere modification
    @Column({length : 255, type : "varchar", nullable : true})
    updatedBy?: string

    // Suppression douce : un dossier d'admission n'est jamais supprime
    // physiquement (piece medico-legale), il est seulement marque supprime.
    @DeleteDateColumn()
    deletedAt?: Date

    // Utilisateur/compte a l'origine de la suppression
    @Column({length : 255, type : "varchar", nullable : true})
    deletedBy?: string

    // Relation au sein du meme microservice

    // relation one to many avec les documents
    @OneToMany(() => AdmissionDocument, (doc) => doc.admission)
    documents!: AdmissionDocument[]

    // relation one to many avec les compagnons
    @OneToMany(() => AdmissionCompanion, comp => comp.admission)
    companions!: AdmissionCompanion[]

    // relation one to many avec les payeurs
    // parce que il peut avoir plusieur payeur (patient, assurance, entreprise)
    @OneToMany(() =>  AdmissionPayer, payer => payer.admission)
    payers!: AdmissionPayer[]


    // relation one to one avec encounter (Encounter porte la colonne admissionId)
    @OneToOne(() => Encounter, encounter => encounter.admission)
    encounters!: Encounter
    
}

