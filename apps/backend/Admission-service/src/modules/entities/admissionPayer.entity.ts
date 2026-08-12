import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdmissionPayerType } from "./admission.enum";
import { Admission } from "./admission.entity";







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

    // nom du payeur
    @Index()
    @Column({type: "varchar", length : 255, nullable : true})
    name!: string

    // numero de police d'assurance 
    @Index()
    @Column({type: "varchar", length : 255, nullable : true})
    policyNumber!: string

    // pourcentage des frais de sejour
    @Index()
    @Column({type: "numeric", nullable : true})
    coveragePercentage!: number

    // limite de couvertrue des frais de sejour 
    @Index()
    @Column({type: "numeric", nullable : true})
    coverageLimit!: number

    // date d'expiration de la couverture 
    @Index()
    @Column({type: "date", nullable : true})
    validUntil!: Date

    // relation inverse
    @ManyToOne(() => Admission, ad => ad.payers)
    @JoinColumn({name : "admissionId"})
    admission!: Admission

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @Column({length : 255, type : "varchar", nullable : true})
    createdBy?: string

    @Column({length : 255, type : "varchar", nullable : true})
    updatedBy?: string

    // Suppression douce : conserve la trace d'un payeur retire (piece comptable)
    @DeleteDateColumn()
    deletedAt?: Date

    @Column({length : 255, type : "varchar", nullable : true})
    deletedBy?: string

}