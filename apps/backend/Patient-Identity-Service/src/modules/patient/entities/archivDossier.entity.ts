import * as typeorm from "typeorm"
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
@typeorm.Entity()
export class ArchivDossier {

    // Identifiant technique interne (clé primaire), généré automatiquement
    @typeorm.PrimaryGeneratedColumn("uuid")
    id!: string;


    // relation avec le patient 
    @typeorm.ManyToOne(() => Patient, (patient) => patient.archivDossier)
    patient!: typeorm.Relation<Patient>
    

    // Référence vers le dossier patient auquel ce document est rattaché
    @typeorm.Index()
    @typeorm.Column({ type: "uuid", nullable: true })
    dossierId?: string; 

    // Type de document sous forme libre (ex: "Ordonnance", "Analyse"...)
    @typeorm.Column({ type: "enum", enum : ["CNI", "PASSPORT", "ATTESTATION", "ACTE_NAISSANCE", "AUTRE"],nullable: true })
    typeDoc?: string;


    // Nom du fichier archivé
    @typeorm.Column({ length: 145, type: "varchar", nullable: true })
    name?: string;

    // Taille du fichier archivé
    @typeorm.Column({ length: 145, type: "varchar", nullable: true })
    taille?: string;

    // Extension du fichier archivé (ex: pdf, jpg...)
    @typeorm.Column({ length: 145, type: "varchar", nullable: true })
    extension?: string;

    // Date du document (ex: date d'émission du document archivé)
    @typeorm.Column({ type: "timestamp", nullable: true })
    date?: Date;

    // url du dossier
    @typeorm.Column({ length: 145, type: "varchar", nullable: true })
    url?: string;

    // Description libre du document archivé
    @typeorm.Column({ length: 145, type: "varchar", nullable: true })
    description?: string;

    // metadonnée systeme
    @typeorm.CreateDateColumn()
    createdAt!: Date;

    @typeorm.UpdateDateColumn()
    updatedAt!: Date;

    // date de suppression
    @typeorm.DeleteDateColumn()
    deleteAt? : Date

    // identifiant de la personne qui a crée
    @typeorm.Column({type : "uuid", nullable : true})
    createdBy? : string

    // identifiant de la personne qui a modifié
    @typeorm.Column({type : "uuid", nullable : true})
    updatedBy? : string

    // identifiant de la personne qui a supprimé
    @typeorm.Column({type : "uuid", nullable : true})
    deletedBy? : string
}
