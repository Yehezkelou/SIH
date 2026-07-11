import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class PatientHistory {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    patientId!: string

    @Column({type: "jsonb", nullable : true})
    oldData!: Record<string, any>

    @Column({type: "jsonb", nullable : true})
    newData!: Record<string, any>

    @CreateDateColumn()
    createdAt!: Date

    @Column({ enum: ["DELETE", "UPDATE", "CREATE"] })
    action!: "DELETE" | "UPDATE" | "CREATE"

    @Column("uuid")
    changeBy!: string

}