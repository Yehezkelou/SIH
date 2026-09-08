import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { ArrivalMode, TriageLevel, UrgencyStatus } from "./urgency.enum"
import { Triage } from "./triage.entity"
import { WaitDelay } from "./waitDelay.entity"
import { PatientMovement } from "./patientMovement.entity"
import { BedOccupancy } from "./bedOccupancy.entity"
import { DischargeInfo } from "./dischargeInfo.entity"




// Passage aux urgences : dossier central du parcours d'un patient a l'accueil
// des urgences. Le module Urgence ne possede pas de table dediee dans le legacy
// (il s'appuyait sur `admissions`) ; ici on le modelise en propre pour porter
// le triage et les indicateurs de temps (TA - Time to Admission, DMS - Duree
// Moyenne de Sejour).
@Entity("EmergencyEncounter")
export class EmergencyEncounter {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    // reference vers le microservice Patient-Identity-Service
    @Index()
    @Column({type : "uuid", nullable : true})
    patientId!: string

    // reference numero du patient (dossier)
    @Index()
    @Column({type : "varchar", length : 255, nullable : true})
    numeroPatient!: string

    // numero de passage lisible (reference papier/telephonique/facturation)
    @Index()
    @Column({type : "varchar", length : 255, unique : true, nullable : true})
    urgencyNumber!: string

    // reference vers l'admission generee si le passage debouche sur une hospitalisation
    // (le dossier admission vit dans le microservice Admission-service)
    @Index()
    @Column({type : "uuid", nullable : true})
    admissionId!: string

    // medecin urgentiste en charge
    @Index()
    @Column({type : "uuid", nullable : true})
    doctorId!: string

    // infirmier organisateur de l'accueil (IOA) ayant realise le triage
    @Index()
    @Column({type : "uuid", nullable : true})
    triageNurseId!: string

    // statut du passage
    @Index()
    @Column({type : "enum", enum : UrgencyStatus, default : UrgencyStatus.WAITING})
    urgencyStatus!: string

    // niveau de triage retenu (copie du dernier triage pour requetage rapide)
    @Index()
    @Column({type : "enum", enum : TriageLevel, nullable : true})
    triageLevel!: string

    // mode d'arrivee du patient
    @Index()
    @Column({type : "enum", enum : ArrivalMode, nullable : true})
    arrivalMode!: string

    // motif de recours / plainte principale
    @Index()
    @Column({type : "text", nullable : true})
    reason!: string

    // reference vers la provenance (voir Provenance)
    @Index()
    @Column({type : "uuid", nullable : true})
    provenanceId!: string

    // localisation actuelle du patient dans les urgences
    @Index()
    @Column({type : "uuid", nullable : true})
    currentZoneId!: string

    @Index()
    @Column({type : "uuid", nullable : true})
    currentBedId!: string

    // Dates du parcours et indicateurs de temps

    // heure d'arrivee / d'enregistrement aux urgences
    @Index()
    @Column({type : "timestamp", nullable : true})
    arrivalDate!: Date

    // heure de prise en charge medicale (sert au calcul du delai d'attente)
    @Index()
    @Column({type : "timestamp", nullable : true})
    careStartDate!: Date

    // heure de sortie des urgences
    @Index()
    @Column({type : "timestamp", nullable : true})
    dischargeDate!: Date

    // Time to Admission (minutes) : delai entre l'arrivee et l'admission/decision
    @Column({type : "int", nullable : true})
    timeToAdmission!: number

    // Duree du passage aux urgences (minutes) : arrivee -> sortie
    @Column({type : "int", nullable : true})
    lengthOfStay!: number

    // Relations internes au microservice

    // triage(s) realise(s) durant le passage
    @OneToMany(() => Triage, (triage) => triage.emergencyEncounter)
    triages!: Triage[]

    // suivi du delai d'attente / reception urgence
    @OneToOne(() => WaitDelay, (delay) => delay.emergencyEncounter)
    waitDelay!: WaitDelay

    // mouvements du patient au sein des urgences
    @OneToMany(() => PatientMovement, (movement) => movement.emergencyEncounter)
    movements!: PatientMovement[]

    // occupations de lit successives
    @OneToMany(() => BedOccupancy, (occupation) => occupation.emergencyEncounter)
    bedOccupancies!: BedOccupancy[]

    // informations de sortie
    @OneToOne(() => DischargeInfo, (info) => info.emergencyEncounter)
    dischargeInfo!: DischargeInfo

    // Audit
    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @Column({length : 255, type : "uuid", nullable : true})
    createdBy?: string

    @Column({length : 255, type : "uuid", nullable : true})
    updatedBy?: string

    // Suppression douce : un passage aux urgences n'est jamais supprime
    // physiquement (piece medico-legale), il est seulement marque supprime.
    @DeleteDateColumn()
    deletedAt?: Date

    @Column({length : 255, type : "uuid", nullable : true})
    deletedBy?: string

}
