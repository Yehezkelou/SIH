import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MovementDirection } from "./urgency.enum";
import { EmergencyEncounter } from "./emergencyEncounter.entity";




// Mouvement du patient au sein des urgences (equivalent de la table legacy
// `mouvementpatients`). Chaque entree/sortie de zone ou de service est tracee.
@Entity("PatientMovement")
export class PatientMovement {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    // reference vers le passage aux urgences (remplace admission_id)
    @Index()
    @Column({type : "uuid"})
    emergencyEncounterId!: string

    // sens du mouvement : entree ou sortie (equivalent entreesortie)
    @Index()
    @Column({type : "enum", enum : MovementDirection, default : MovementDirection.ENTRY})
    direction!: string

    // date/heure du mouvement (equivalent dateheure)
    @Index()
    @Column({type : "timestamp"})
    movementDate!: Date

    // service/zone concerne par le mouvement (equivalent service_id)
    @Index()
    @Column({type : "uuid", nullable : true})
    serviceId!: string

    // service/zone de provenance (equivalent service_id_provenance)
    @Index()
    @Column({type : "uuid", nullable : true})
    fromServiceId!: string

    // motif du mouvement (equivalent motif)
    @Column({type : "varchar", length : 255, nullable : true})
    reason!: string

    // diagnostic associe au mouvement (equivalent diagnostic)
    @Column({type : "varchar", length : 255, nullable : true})
    diagnostic!: string

    // relation inverse
    @ManyToOne(() => EmergencyEncounter, (encounter) => encounter.movements)
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
