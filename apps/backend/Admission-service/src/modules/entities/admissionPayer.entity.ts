import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdmissionPayerType } from "./admission.enum";







@Entity("AdmissionPayer")
export class AdmissionPayer {
    @PrimaryGeneratedColumn('uuid')
    id!: string


    // reference a l'admission
    @Index()
    @Column({type : "uuid"})
    admissionId!: string

    // champ pour specifier le type de payeur
    @Index()
    @Column({type : "enum", enum : AdmissionPayerType})
    payerType!: string

    @Index()
    @Column({type: "string", nullable : true})
    name!: string

    @Index()
    @Column({type: "string", nullable : true})
    policyNumber!: string

    @Index()
    @Column({type: "number", nullable : true})
    coveragePercentage!: number

    @Index()
    @Column({type: "number", nullable : true})
    coverageLimit!: number

    @Index()
    @Column({type: "date", nullable : true})
    validUntil!: Date


    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date 
    
}