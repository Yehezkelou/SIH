import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EmergencyEncounter } from "./emergencyEncounter.entity";




// Delai d'attente / reception urgence (equivalent de la table legacy
// `delai_attente`). Trace le moment de reception du patient aux urgences afin
// de calculer les indicateurs de temps (Time to Admission).
@Entity("WaitDelay")
export class WaitDelay {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    // reference vers le passage aux urgences (remplace id_admission/num_admission)
    @Index()
    @Column({type : "uuid"})
    emergencyEncounterId!: string

    // numero de passage lisible (equivalent num_admission)
    @Index()
    @Column({type : "varchar", length : 255, nullable : true})
    urgencyNumber!: string

    // date/heure de reception du patient
    @Index()
    @Column({type : "timestamp"})
    receptionDate!: Date

    // personnel ayant receptionne le patient (equivalent id_personnel)
    @Index()
    @Column({type : "uuid", nullable : true})
    receivedBy!: string

    // agent de reception urgence ayant mis a jour (equivalent
    // id_updated_login_reception_urgence)
    @Index()
    @Column({type : "uuid", nullable : true})
    receptionUpdatedBy!: string

    // relation inverse (WaitDelay porte la colonne emergencyEncounterId)
    @OneToOne(() => EmergencyEncounter, (encounter) => encounter.waitDelay)
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
