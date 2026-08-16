import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class PatientHistory {

    // Identifiant technique de la ligne d'historique
    @PrimaryGeneratedColumn('uuid')
    id!: string

    // Référence vers le patient concerné (Patient.uniquePatientId)
    @Column()
    patientId!: string

    // État du dossier avant la modification (snapshot JSON), utile pour comparer/annuler
    @Column({type: "jsonb", nullable : true})
    oldData!: Record<string, any>

    // État du dossier après la modification (snapshot JSON)
    @Column({type: "jsonb", nullable : true})
    newData!: Record<string, any>

    // Date/heure à laquelle l'action a eu lieu
    @CreateDateColumn()
    createdAt!: Date

    // Type d'action effectuée sur le dossier patient
    @Column({ enum: ["DELETE", "UPDATE", "CREATE"] })
    action!: "DELETE" | "UPDATE" | "CREATE"

    // Identifiant de l'utilisateur/compte à l'origine de l'action
    @Column("uuid")
    changeBy!: string

}