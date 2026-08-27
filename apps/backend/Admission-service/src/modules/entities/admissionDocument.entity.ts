import * as typeorm from "typeorm";
import { AdmissionDocumentType } from "./admission.enum";
import { Admission } from "./admission.entity";

@typeorm.Entity("AdmissionDocument")
export class AdmissionDocument {

    @typeorm.PrimaryGeneratedColumn("uuid")
    id!: string;

    // reference a l'admission
    @typeorm.Index()
    @typeorm.Column({type : "uuid"})
    admissionId!: string;

    // url
    @typeorm.Column({type : "varchar", length : 255, nullable : true})
    documentUrl!: string;

    // champ pour l'admission document
    @typeorm.Index()
    @typeorm.Column({type : "enum" , enum : AdmissionDocumentType})
    documentType!: string;

    // nom du document 
    @typeorm.Index()
    @typeorm.Column({type : "varchar", length : 255, nullable : true})
    documentName!: string;

    // extension du document 
    @typeorm.Index()
    @typeorm.Column({type : "varchar", length : 255, nullable : true})
    documentExtension!: string;

    // taille du document 
    @typeorm.Index()
    @typeorm.Column({type : "integer", nullable : true})
    documentSize!: number;

    @typeorm.Index()
    @typeorm.Column({type : "timestamp", nullable : true})
    attachedAt!: Date;

    // relation inverse 
    @typeorm.ManyToOne(() => Admission, ad => ad.documents)
    @typeorm.JoinColumn({name : "admissionId"})
    admission!: typeorm.Relation<Admission>;

    @typeorm.UpdateDateColumn()
    updatedAt!: Date;

    @typeorm.CreateDateColumn()
    createdAt!: Date;

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