import * as typeorm from "typeorm";
import { EncounterStatus } from "./admission.enum";
import { EncounterMovement } from "./encounterMovement.entity";
import { Admission } from "./admission.entity";

@typeorm.Entity("Encounter")
export class Encounter {

    @typeorm.PrimaryGeneratedColumn('uuid')
    id!: string;

    // reference vers le microservice Patient-Identity-Service
    @typeorm.Index()
    @typeorm.Column({type : "uuid" , nullable : true})
    patientId!: string;

    // reference numero patient 
    @typeorm.Index()
    @typeorm.Column({type : "varchar"})
    numeroPatient!: string;

    // reference vers l'admission
    @typeorm.Index()
    @typeorm.Column({type : "uuid", nullable : true})
    admissionId!: string;

    // relation inverse (Encounter porte la colonne admissionId)
    @typeorm.OneToOne(() => Admission, admission => admission.encounters)
    @typeorm.JoinColumn({name : "admissionId"})
    admission!: typeorm.Relation<Admission>;

    // numero de sejour
    @typeorm.Index()
    @typeorm.Column({type : "varchar", length : 255, nullable : true})
    encounterNumber!: string;

    // statut de sejour
    @typeorm.Index()
    @typeorm.Column({type : "enum", enum : EncounterStatus, default : EncounterStatus.ENCOUNTER_PENDING})
    encounterStatus!: string;

    // localisation actuel du patient
    @typeorm.Index()
    @typeorm.Column({type : "uuid", nullable : true})
    currentDepartmentId!: string;

    // la chambre actuelle
    @typeorm.Index()
    @typeorm.Column({type : "uuid", nullable : true})
    currentRoomId!: string;

    // le lit actuel
    @typeorm.Index()
    @typeorm.Column({type : "uuid", nullable : true})
    currentBedId!: string;

    // Date du sejour global 
    @typeorm.Index()
    @typeorm.Column({type : "timestamp", nullable : true})
    startDate!: Date;

    // date de fin du sejour
    @typeorm.Index()
    @typeorm.Column({type : "timestamp", nullable : true})
    endDate!: Date;

    // un encounter peut avoir plusieur mouvement
    @typeorm.OneToMany(() => EncounterMovement, (movement) => movement.encounter)
    movements!: typeorm.Relation<EncounterMovement[]>;

    // audit
    @typeorm.CreateDateColumn()
    createdAt!: Date;

    @typeorm.UpdateDateColumn()
    updatedAt!: Date;

    // Utilisateur/compte a l'origine de la creation de l'encounter
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
}