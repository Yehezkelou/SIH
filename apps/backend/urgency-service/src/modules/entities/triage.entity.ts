import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TriageLevel } from "./urgency.enum";
import { EmergencyEncounter } from "./emergencyEncounter.entity";




// Triage IOA : evaluation de la gravite a l'accueil des urgences. Un passage
// peut faire l'objet de plusieurs triages (re-evaluation), on garde donc
// l'historique complet.
@Entity("Triage")
export class Triage {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    // reference vers le passage aux urgences
    @Index()
    @Column({type : "uuid"})
    emergencyEncounterId!: string

    // niveau de gravite attribue
    @Index()
    @Column({type : "enum", enum : TriageLevel})
    triageLevel!: string

    // plainte principale / motif de recours evalue
    @Column({type : "text", nullable : true})
    chiefComplaint!: string

    // Constantes vitales relevees au triage
    @Column({type : "numeric", nullable : true})
    temperature!: number // en degres Celsius

    @Column({type : "int", nullable : true})
    heartRate!: number // battements/min

    @Column({type : "int", nullable : true})
    respiratoryRate!: number // cycles/min

    @Column({type : "int", nullable : true})
    systolicBloodPressure!: number // mmHg

    @Column({type : "int", nullable : true})
    diastolicBloodPressure!: number // mmHg

    @Column({type : "int", nullable : true})
    oxygenSaturation!: number // SpO2 en %

    @Column({type : "int", nullable : true})
    painScore!: number // echelle 0-10

    @Column({type : "int", nullable : true})
    glasgowComaScale!: number // score de Glasgow 3-15

    // observations libres de l'IOA
    @Column({type : "text", nullable : true})
    notes!: string

    // heure du triage (sert au calcul du delai porte/triage)
    @Index()
    @Column({type : "timestamp", nullable : true})
    triagedAt!: Date

    // infirmier organisateur de l'accueil ayant realise le triage
    @Index()
    @Column({type : "uuid", nullable : true})
    triagedBy!: string

    // relation inverse
    @ManyToOne(() => EmergencyEncounter, (encounter) => encounter.triages)
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
