import * as typeorm from "typeorm";
import { Admission } from "./admission.entity";
import { Relationship } from "./admission.enum";

@typeorm.Entity("admissionCompanion")
export class AdmissionCompanion {
    @typeorm.PrimaryGeneratedColumn('uuid')
    id!: string;

    // reference a l'admission
    @typeorm.Index()
    @typeorm.Column({type : "uuid"})
    admissionId!: string;

    @typeorm.Index()
    @typeorm.Column({type : "varchar", length : 255, nullable : true})
    firstName!: string;

    @typeorm.Index()
    @typeorm.Column({type : "varchar", length : 255, nullable : true})
    lastName!: string;

    @typeorm.Index()
    @typeorm.Column({type : "varchar", length : 255, nullable : true})
    phoneNumber!: string;

    @typeorm.Index()
    @typeorm.Column({type : "enum", enum : Relationship, nullable : true})
    relationship!: Relationship;

    @typeorm.Index()
    @typeorm.Column({type : "varchar", length : 255, nullable : true})
    address!: string;

    // relation inverse
    @typeorm.ManyToOne(() => Admission, ad => ad.companions)
    @typeorm.JoinColumn({name : "admissionId"})
    admission!: typeorm.Relation<Admission>;

    @typeorm.CreateDateColumn()
    createdAt!: Date;

    @typeorm.UpdateDateColumn()
    updatedAt!: Date;

    @typeorm.Column({length : 255, type : "varchar", nullable : true})
    createdBy?: string;

    @typeorm.Column({length : 255, type : "varchar", nullable : true})
    updatedBy?: string;

    // Suppression douce
    @typeorm.DeleteDateColumn()
    deletedAt?: Date;

    @typeorm.Column({length : 255, type : "varchar", nullable : true})
    deletedBy?: string;
}