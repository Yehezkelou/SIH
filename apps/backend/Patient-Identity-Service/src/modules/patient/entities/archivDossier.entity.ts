import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Patient } from "./patient.entity";


/**
 * Entité ArchivDossier (document archivé rattaché à un dossier patient)
 *
 * Représente un document numérisé (pièce d'identité, résultat d'examen,
 * ordonnance...) classé dans le dossier d'un patient. Ne stocke pas le
 * fichier lui-même, seulement ses métadonnées (nom, taille, extension...)
 * et une référence vers le dossier et le type de document.
 *
 * Référence : cahier_des_charges_patient_urgence.md - table `archiv_dossier`
 */
@Entity()
export class ArchivDossier {

    // Identifiant technique interne (clé primaire), généré automatiquement
    @PrimaryGeneratedColumn("uuid")
    id!: string;


    // relation avec le patient 
    @ManyToOne(() => Patient, (patient) => patient.archivDossier)
    patient!: Patient
    

    // Référence vers le dossier patient auquel ce document est rattaché
    @Index()
    @Column({ type: "uuid", nullable: true })
    dossierId?: string;

    // Type de document sous forme libre (ex: "Ordonnance", "Analyse"...)
    @Column({ type: "text", nullable: true })
    typeDoc?: string;

    // Référence vers le type de document (table type_doc)
    @Index()
    @Column({ type: "uuid", nullable: true })
    typeDocId?: string;

    // Nom du fichier archivé
    @Column({ length: 145, type: "varchar", nullable: true })
    name?: string;

    // Taille du fichier archivé
    @Column({ length: 145, type: "varchar", nullable: true })
    taille?: string;

    // Extension du fichier archivé (ex: pdf, jpg...)
    @Column({ length: 145, type: "varchar", nullable: true })
    extension?: string;

    // Date du document (ex: date d'émission du document archivé)
    @Column({ type: "timestamp", nullable: true })
    date?: Date;

    // Description libre du document archivé
    @Column({ length: 145, type: "varchar", nullable: true })
    description?: string;

    // metadonnée systeme
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
