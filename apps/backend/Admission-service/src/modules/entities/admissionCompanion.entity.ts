import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Admission } from "./admission.entity";
import { Relationship } from "./admission.enum";




@Entity("admissionCompanion")
export class AdmissionCompanion {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    // reference a l'admission
    @Index()
    @Column({type : "uuid"})
    admissionId!: string

    @Index()
    @Column({type : "varchar", length : 255, nullable : true})
    firstName!: string

    @Index()
    @Column({type : "varchar", length : 255, nullable : true})
    lastName!: string

    @Index()
    @Column({type : "varchar", length : 255, nullable : true})
    phoneNumber!: string


    @Index()
    @Column({type : "enum", enum : Relationship, nullable : true})
    relationship!: Relationship

    @Index()
    @Column({type : "varchar", length : 255, nullable : true})
    address!: string

    // relation inverse
    @ManyToOne(() => Admission, ad => ad.companions)
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

    // Suppression douce : conserve la trace d'un accompagnant retire
    @DeleteDateColumn()
    deletedAt?: Date

    @Column({length : 255, type : "varchar", nullable : true})
    deletedBy?: string

}