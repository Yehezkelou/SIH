import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


/**
 * Entité Patient (dossier d'identité)
 *
 * C'est le dossier "maître" (MPI - Master Patient Index) qui sert à
 * identifier de façon unique une personne dans tout le système hospitalier.
 * Toutes les autres entités (admissions, consultations, factures...)
 * pointeront vers ce patient via son id ou son uniquePatientId.
 *
 * Référence : cahier_des_charges_patient_urgence.md - table `dossiers`
 */
@Entity()
export class Patient {

    // Identifiant technique interne (clé primaire), généré automatiquement
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    // NDPU (numéro de dossier patient unique)
    // C'est l'identifiant "métier" du patient, celui qu'on montre/utilise au quotidien
    @Index()
    @Column({ length: 255, type: "varchar", unique: true, nullable: false })
    uniquePatientId!: string;

    // Ancien numéro de dossier (repris de l'ancien système lors d'une migration)
    // Sert uniquement de trace/référence historique, pas d'identifiant actif
    @Column({ length: 255, type: "varchar", nullable: true })
    ancienNumeroDossier?: string;


    // ===== identité civile =====

    @Index()
    @Column({ length: 255, type: "varchar" })
    nom!: string;

    @Index()
    @Column({ length: 255, type: "varchar" })
    prenom!: string

    @Index()
    @Column({ type: "integer" })
    age!: number;

    @Index()
    @Column({ type: "enum", enum: ["M", "F"] })
    genre!: "M" | "F";

    // Date de naissance : champ clé pour identifier/rapprocher un patient
    // (contrairement à "age" qui devient obsolète avec le temps)
    @Index()
    @Column({ type: "date", nullable: true })
    dateNaissance?: string;

    // Lieu de naissance (ville/commune), utile pour lever les doublons homonymes
    @Column({ length: 255, type: "varchar", nullable: true })
    lieuNaissance?: string;

    // Chemin/URL vers la photo d'identité du patient (vérification visuelle au guichet)
    @Column({ length: 255, type: "varchar", nullable: true })
    photo?: string;


    // ===== filiation =====
    // Utile pour identifier un patient mineur ou distinguer deux homonymes

    @Column({ length: 255, type: "varchar", nullable: true })
    nomPere?: string;

    @Column({ length: 255, type: "varchar", nullable: true })
    nomMere?: string;


    // ===== donné de contact =====

    @Index()
    @Column({ length: 255, type: "varchar" })
    email!: string

    // Numéro de téléphone principal du patient
    @Index()
    @Column({ length: 255, type: "varchar" })
    numero!: string

    // Numéro de téléphone secondaire (facultatif)
    @Column({ length: 255, type: "varchar", nullable: true })
    numeroSecondaire?: string;

    // Contact à joindre en cas d'urgence (parent, tuteur, proche...)
    @Column({ length: 255, type: "varchar", nullable: true })
    contactUrgence?: string;

    // identifiant unique
    @Index()
    @Column({ length: 255, type: "varchar", unique: true })
    numSecuSocial!: string

    @Index()
    @Column({ length: 255, type: "varchar", unique: true })
    numIdentityNational!: string

    // metadonnée systeme
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    // Utilisateur/compte à l'origine de la création du dossier
    @Column({ length: 255, type: "varchar", nullable: true })
    createdBy!: string

    // Utilisateur/compte à l'origine de la dernière modification du dossier
    @Column({ length: 255, type: "varchar", nullable: true })
    updatedBy?: string;

    // Suppression douce (soft delete) : un dossier patient n'est jamais
    // supprimé physiquement, on le marque juste comme "supprimé" à cette date.
    // TypeORM ignore automatiquement les lignes où deletedAt est renseigné.
    @DeleteDateColumn()
    deletedAt?: Date;

    // Utilisateur/compte à l'origine de la suppression du dossier
    @Column({ length: 255, type: "varchar", nullable: true })
    deletedBy?: string;
}