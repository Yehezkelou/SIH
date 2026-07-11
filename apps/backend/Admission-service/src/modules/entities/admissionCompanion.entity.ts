import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";






@Entity("admissionCompanion")
export class AdmissionCompanion {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    // reference a l'admission
    @Index()
    @Column({type : "uuid"})
    admissionId!: string

    @Index()
    @Column({type :"string", nullable : true})
    firstName!: string

    @Index()
    @Column({type : "string", nullable : true})
    lastName!: string

    @Index()
    @Column({type : "string", nullable : true})
    phoneNumber!: string


    @Index()
    @Column({type : "string", nullable : true})
    relationship!: string

    @Index()
    @Column({type : "string", nullable : true})
    address!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

}