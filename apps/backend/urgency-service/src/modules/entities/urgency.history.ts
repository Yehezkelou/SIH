import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";




// Historique des modifications d'un passage aux urgences (piste d'audit
// medico-legale, sur le meme modele que AdmissionHistory).
@Entity("UrgencyHistory")
export class UrgencyHistory {

    @PrimaryGeneratedColumn("uuid")
    id! : string

    // reference vers le passage aux urgences
    @Index()
    @Column({type : "uuid", nullable : false})
    emergencyEncounterId! : string

    // id patient
    @Index()
    @Column({type : "uuid", nullable : true})
    patientId! : string

    // numero patient
    @Column({type : "varchar", nullable : true})
    numeroPatient! : string

    // numero de passage
    @Column({type : "varchar", nullable : true})
    urgencyNumber! : string

    // etat avant modification
    @Column({type : "jsonb", nullable : false})
    oldData! : Record<string , any>

    // etat apres modification
    @Column({type : "jsonb", nullable : false})
    newData! : Record<string , any>

    // date de l'action
    @CreateDateColumn()
    createdAt! : Date

    // action realisee
    @Column({type : "enum" , enum : ["DELETE", "CREATE", "UPDATE"]})
    action!: "DELETE" | "UPDATE" | "CREATE"

    // celui qui a fait l'action
    @Column({type : "uuid", nullable : true})
    changedBy! : string
}
