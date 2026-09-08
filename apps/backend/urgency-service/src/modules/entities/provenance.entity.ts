import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProvenanceType } from "./urgency.enum";




// Provenance du patient (equivalent de la table legacy `provenance`).
// Reference le particulier / l'entreprise / l'institution qui adresse ou
// accompagne le patient aux urgences.
@Entity("Provenance")
export class Provenance {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    // libelle / designation de la provenance
    @Index()
    @Column({type : "varchar", length : 255})
    provenance!: string

    // telephone de contact
    @Column({type : "varchar", length : 30, nullable : true})
    tel!: string

    // nature de la provenance (equivalent tinyint entreprise)
    @Index()
    @Column({type : "enum", enum : ProvenanceType, default : ProvenanceType.INDIVIDUAL})
    type!: string

    // Audit
    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @DeleteDateColumn()
    deletedAt?: Date

    @Column({length : 255, type : "uuid", nullable : true})
    createdBy?: string

    @Column({length : 255, type : "uuid", nullable : true})
    updatedBy?: string

    @Column({length : 255, type : "uuid", nullable : true})
    deletedBy?: string

}
