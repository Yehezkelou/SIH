import { Column, CreateDateColumn, DeleteDateColumn, Entity,  Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MovementType } from "./admission.enum";
import { Encounter } from "./encounter.entity";




@Entity("EncounterMovement")
export class EncounterMovement {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    // reference vers l'encounter 
    @Index()
    @Column({type : "uuid", nullable : true})
    encounterId!: string

    @Index()
    @Column({type : "varchar", length : 255, nullable : true})
    encounterNumber!: string
    
    @Index()
    @Column({type : "enum", enum : MovementType})
    movementType!: MovementType

    // d'ou il viens 
    @Index()
    @Column({type : "uuid", nullable : true})
    fromDepartmentId!: string

    @Index()
    @Column({type : "uuid", nullable : true})
    fromRoomId!: string

    @Index()
    @Column({type : "uuid", nullable : true})
    fromBedId!: string

    // ou il va 
    @Index()
    @Column({type : "uuid", nullable : true})
    toDepartmentId!: string


    @Index()
    @Column({type : "uuid", nullable : true})
    toRoomId!: string

    @Index()
    @Column({type : "uuid", nullable : true})
    toBedId!: string

    // info du mouvement  

    @Index()
    @Column({type : "timestamp", nullable : true})
    movementDate!: Date  

    
    @Column({type : "uuid", nullable : true})
    movementBy!: string

    @Column({type : "text", nullable : true})
    reason!: string 
    

    // relation inverse (reutilise la colonne encounterId deja declaree ci-dessus)
    @ManyToOne(() => Encounter, encounter => encounter.movements)
    @JoinColumn({name : "encounterId"})
    encounter!: Encounter


    // date audit
    @CreateDateColumn()
    createdAt!: Date

    
    @UpdateDateColumn()
    updatedAt!: Date

    @DeleteDateColumn()
    deletedAt!: Date

    // utitilisateur audit
    @Column({length : 255, type : "uuid", nullable : true})
    updatedBy!: string

    @Column({length : 255, type : "uuid", nullable : true})
    deletedBy!: string

    @Column({length : 255, type : "uuid", nullable : true})
    createdBy!: string
    
}