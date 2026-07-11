import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EncounterStatus } from "./admission.enum";
import { EncounterMovement } from "./encounterMovement.entity";





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

    @Index()
    @Column({type : "enum", enum : EncounterStatus, default : EncounterStatus.ENCOUNTER_PENDING})
    encounterStatus!: string

    // localisation actuel du patient
    @Index()
    @Column({type : "uuid", nullable : true})
    currentDepartmentId!: string


    // la chambre actuel
    @Index()
    @Column({type : "uuid", nullable : true})
    currentRoom!: string

    // le lit actuel 
    @Index()
    @Column({type : "uuid", nullable : true})
    currentBed!: string

    // Date du sejour global 
    @Index()
    @Column({type : "timestamp", nullable : true})
    startDate!: Date

    @Index()
    @Column({type : "timestamp", nullable : true})
    endDate!: Date


    // un encounter peut avoir plusieur mouvement 
    @OneToMany(() => EncounterMovement, (movement) => movement.encounterId)
    movements!: EncounterMovement[]


    // audit 
    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date


}