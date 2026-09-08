import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DischargeOutcome } from "./urgency.enum";
import { EmergencyEncounter } from "./emergencyEncounter.entity";




// Informations de sortie des urgences (equivalent de la table legacy
// `info_sorties`). Precise le devenir du patient a la fin de son passage.
@Entity("DischargeInfo")
export class DischargeInfo {

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

    // devenir du patient (remplace les tinyint deces/transfert/guerison/evade/autre)
    @Index()
    @Column({type : "enum", enum : DischargeOutcome})
    outcome!: string

    // etablissement externe de destination (equivalent etablissementexterne_id)
    @Index()
    @Column({type : "uuid", nullable : true})
    externalEstablishmentId!: string

    // service externe de destination (equivalent serviceexterne_id)
    @Index()
    @Column({type : "uuid", nullable : true})
    externalServiceId!: string

    // service interne de destination (equivalent serviceinterne_id)
    @Index()
    @Column({type : "uuid", nullable : true})
    internalServiceId!: string

    // diagnostic de sortie (equivalent diagnostic_id)
    @Index()
    @Column({type : "uuid", nullable : true})
    diagnosticId!: string

    // autre motif de sortie (equivalent autremotif_id)
    @Index()
    @Column({type : "uuid", nullable : true})
    otherReasonId!: string

    // description libre / consignes de sortie
    @Column({type : "text", nullable : true})
    description!: string

    // date/heure de sortie
    @Index()
    @Column({type : "timestamp", nullable : true})
    dischargeDate!: Date

    // relation inverse (DischargeInfo porte la colonne emergencyEncounterId)
    @OneToOne(() => EmergencyEncounter, (encounter) => encounter.dischargeInfo)
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
