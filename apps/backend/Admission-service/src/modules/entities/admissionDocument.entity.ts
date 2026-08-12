import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdmissionDocumentType } from "./admission.enum";
import { Admission } from "./admission.entity";





@Entity("AdmissionDocument")
export class AdmissionDocument {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    // reference a l'admission
    @Index()
    @Column({type : "uuid"})
    admissionId!: string

   
    // url
    @Column({type : "varchar", length : 255, nullable : true})
    documentUrl!: string

    // champ pour l'admission document
    @Index()
    @Column({type : "enum" , enum : AdmissionDocumentType})
    documentType!: string

    // nom du document 
    @Index()
    @Column({type : "varchar", length : 255, nullable : true})
    documentName!: string

    // extension du document 
    @Index()
    @Column({type : "varchar", length : 255, nullable : true})
    documentExtension!: string

    // taille du document 
    @Index()
    @Column({type : "integer", nullable : true})
    documentSize!: number

    
    @Index()
    @Column({type : "timestamp", nullable : true})
    attachedAt!: Date

    // relation inverse 
     @ManyToOne(() => Admission, ad => ad.documents)
     @JoinColumn({name : "admissionId"})
     admission!: Admission


     @UpdateDateColumn()
     updatedAt!: Date

     @CreateDateColumn()
     createdAt!: Date

     @Column({length : 255, type : "varchar", nullable : true})
     createdBy?: string

     @Column({length : 255, type : "varchar", nullable : true})
     updatedBy?: string

     // Suppression douce : une piece jointe medico-legale n'est jamais supprimee physiquement
     @DeleteDateColumn()
     deletedAt?: Date

     @Column({length : 255, type : "varchar", nullable : true})
     deletedBy?: string
}