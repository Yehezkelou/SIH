import * as typeorm from "typeorm";
import { AdmissionStatus, AdmissionType } from "./admission.enum";
import { AdmissionDocument } from "./admissionDocument.entity";
import { AdmissionCompanion } from "./admissionCompanion.entity";
import { AdmissionPayer } from "./admissionPayer.entity";
import { Encounter } from "./encounter.entity";

@typeorm.Entity("admission")
export class Admission {

    @typeorm.PrimaryGeneratedColumn("uuid")
    id!: string;

    // reference vers le microservice Patient-Identity-Service
    @typeorm.Index()
    @typeorm.Column({type : "uuid"})
    patientId!: string;

    // reference numero du patient 
    @typeorm.Index()
    @typeorm.Column({type : "varchar"})
    numeroPatient!: string;

    // numero d'admission lisible
    @typeorm.Index()
    @typeorm.Column({type : "varchar", length : 255, unique : true, nullable : true})
    admissionNumber!: string;

    @typeorm.Index()
    @typeorm.Column({type : "uuid", nullable : true})
    doctorId!: string;

    // champ propre a l'admission
    @typeorm.Index()
    @typeorm.Column({type : "enum", enum : AdmissionType, nullable : false})
    admissionType!: string;

    @typeorm.Index()
    @typeorm.Column({type : "enum", enum : AdmissionStatus, default : AdmissionStatus.PENDING})
    admissionStatus!: string;

    @typeorm.Index()
    @typeorm.Column({type : "text", nullable : true})
    reason!: string;

    // Date 
    @typeorm.Index()
    @typeorm.Column({type : "timestamp", nullable : true})
    admissionDate!: Date;

    @typeorm.Index()
    @typeorm.Column({type : "timestamp", nullable : true})
    expectedDischarge!: Date;

    @typeorm.Index()
    @typeorm.Column({type : "timestamp", nullable : true})
    actualDischarge!: Date;

    // Audit 
    @typeorm.CreateDateColumn()
    createdAt!: Date;

    @typeorm.UpdateDateColumn()
    updatedAt!: Date;

    // Utilisateur/compte a l'origine de la creation de l'admission
    @typeorm.Column({type : "uuid", nullable : true})
    createdBy?: string;

    // Utilisateur/compte a l'origine de la derniere modification
    @typeorm.Column({type : "uuid", nullable : true})
    updatedBy?: string;

    // Suppression douce
    @typeorm.DeleteDateColumn()
    deletedAt?: Date;

    // Utilisateur/compte a l'origine de la suppression
    @typeorm.Column({type : "uuid", nullable : true})
    deletedBy?: string;

    // Relations
    @typeorm.OneToMany(() => AdmissionDocument, (doc) => doc.admission)
    documents!: typeorm.Relation<AdmissionDocument[]>;

    @typeorm.OneToMany(() => AdmissionCompanion, comp => comp.admission)
    companions!: typeorm.Relation<AdmissionCompanion[]>;

    @typeorm.OneToMany(() =>  AdmissionPayer, payer => payer.admission)
    payers!: typeorm.Relation<AdmissionPayer[]>;

    @typeorm.OneToOne(() => Encounter, encounter => encounter.admission)
    encounters!: typeorm.Relation<Encounter>;
}
