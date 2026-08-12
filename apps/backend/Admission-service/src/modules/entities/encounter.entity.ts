import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EncounterStatus } from "./admission.enum";
import { EncounterMovement } from "./encounterMovement.entity";
import { Admission } from "./admission.entity";





@Entity("Encounter")
export class Encounter {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    // reference vers le microservice  Patient-Identity-Service
    @Index()
    @Column({type : "uuid" , nullable : true})
    patientId!: string

    // reference vers l'admission
    @Index()
    @Column({type : "uuid", nullable : true})
    admissionId!: string

    // relation inverse (Encounter porte la colonne admissionId)
    @OneToOne(() => Admission, admission => admission.encounters)
    @JoinColumn({name : "admissionId"})
    admission!: Admission

    // numero de sejour
    @Index()
    @Column({type : "varchar", length : 255, nullable : true})
    encounterNumber!: string

    // statut de sejour
    @Index()
    @Column({type : "enum", enum : EncounterStatus, default : EncounterStatus.ENCOUNTER_PENDING})
    encounterStatus!: string

    // localisation actuel du patient
    @Index()
    @Column({type : "uuid", nullable : true})
    currentDepartmentId!: string


    // la chambre actuelle
    @Index()
    @Column({type : "uuid", nullable : true})
    currentRoomId!: string

    // le lit actuel
    @Index()
    @Column({type : "uuid", nullable : true})
    currentBedId!: string

    // Date du sejour global 
    @Index()
    @Column({type : "timestamp", nullable : true})
    startDate!: Date

    // date de fin du sejour
    @Index()
    @Column({type : "timestamp", nullable : true})
    endDate!: Date


    // un encounter peut avoir plusieur mouvement
    @OneToMany(() => EncounterMovement, (movement) => movement.encounter)
    movements!: EncounterMovement[]


    // audit
    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    // Utilisateur/compte a l'origine de la creation de l'encounter
    @Column({length : 255, type : "varchar", nullable : true})
    createdBy?: string

    // Utilisateur/compte a l'origine de la derniere modification
    @Column({length : 255, type : "varchar", nullable : true})
    updatedBy?: string

    // Suppression douce : un sejour n'est jamais supprime physiquement
    @DeleteDateColumn()
    deletedAt?: Date

    // Utilisateur/compte a l'origine de la suppression
    @Column({length : 255, type : "varchar", nullable : true})
    deletedBy?: string

}