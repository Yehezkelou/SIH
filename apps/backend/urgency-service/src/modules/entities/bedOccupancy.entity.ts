import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EmergencyEncounter } from "./emergencyEncounter.entity";




// Occupation de lit aux urgences (equivalent de la table legacy
// `occupation_lit`). Trace l'affectation d'un lit/brancard a un passage, avec
// les dates d'occupation et de liberation.
@Entity("BedOccupancy")
export class BedOccupancy {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    // reference vers le passage aux urgences (equivalent admission_id)
    @Index()
    @Column({type : "uuid"})
    emergencyEncounterId!: string

    // reference vers le lit/brancard occupe (equivalent lit_id)
    @Index()
    @Column({type : "uuid"})
    bedId!: string

    // date/heure d'occupation du lit
    @Index()
    @Column({type : "timestamp", nullable : true})
    occupiedAt!: Date

    // date/heure de liberation du lit (null tant qu'il est occupe)
    @Index()
    @Column({type : "timestamp", nullable : true})
    releasedAt!: Date

    // relation inverse
    @ManyToOne(() => EmergencyEncounter, (encounter) => encounter.bedOccupancies)
    @JoinColumn({name : "emergencyEncounterId"})
    emergencyEncounter!: EmergencyEncounter

    // Audit
    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @DeleteDateColumn()
    deletedAt?: Date

    @Column({length : 255, type : "uuid", nullable : true})
    createdBy?: string

    @Column({length : 255, type : "uuid", nullable : true})
    updatedBy?: string

    @Column({length : 255, type : "uuid", nullable : true})
    deletedBy?: string

}
