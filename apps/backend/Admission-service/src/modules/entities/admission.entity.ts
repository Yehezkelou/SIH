import {Column, CreateDateColumn, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"
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

    @Index()
    @Column({type : "string", nullable : true})
    encounterId!:string

    @Index()
    @Column({type : "uuid", nullable : true})
    doctorId!: string

    // champ propre a l'admission
    @Index()
    @Column({type : "enum", enum : AdmissionType, nullable : false})
    admissionType!: string

    @Index()
    @Column({type : "enum", enum : AdmissionStatus})
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

    // Relation au sein du meme microservice 

    // relation one to many avec les documents
    @OneToMany(() => AdmissionDocument, (doc) => doc.admissionId)
    documents!: AdmissionDocument[]

    // relation one to many avec les compagnons 
    @OneToMany(() => AdmissionCompanion, comp => comp.admissionId)
    companions!: AdmissionCompanion[]

    // relation one to many avec les payeurs 
    // parce que il peut avoir plusieur payeur (patient, assurance, entreprise)
    @OneToMany(() =>  AdmissionPayer, payer => payer.admissionId)
    payers!: AdmissionPayer[]


    // relation one to Many avec encounter 
    @OneToOne(() => Encounter, encounter => encounter.admissionId)
    encounters!: Encounter
    
}

