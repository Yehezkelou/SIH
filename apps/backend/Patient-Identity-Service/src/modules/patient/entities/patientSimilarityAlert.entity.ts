import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";


/**
 * Entité PatientSimilarityAlert
 *
 * Alerte generée par le cron de detection de doublons (scan de similarité).
 * Chaque ligne represente une paire de dossiers Patient probablement
 * identiques, avec le detail du score qui a mené a l'alerte, consultable
 * par le personnel pour decider d'une fusion (cf. PatientMergeLog).
 */

@Entity("PatientSimilarityAlert")
@Unique(["patientAId", "patientBId"])
export class PatientSimilarityAlert {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    // id du dossier patient, toujours le plus petit des deux id de la paire
    @Index()
    @Column({ type: "uuid" })
    patientAId!: string

    // id de l'autre dossier patient de la paire
    @Index()
    @Column({ type: "uuid" })
    patientBId!: string

    // numero de dossier du patient A, pour affichage direct sans jointure
    @Column({ type: "varchar", length: 255, nullable: true })
    numeroDossierA!: string

    // numero de dossier du patient B, pour affichage direct sans jointure
    @Column({ type: "varchar", length: 255, nullable: true })
    numeroDossierB!: string

    // score de similarité global de la paire, de 0 a 100
    @Index()
    @Column({ type: "integer" })
    score!: number

    // niveau de priorité derivé du score, stocké pour filtrage rapide
    @Column({ type: "enum", enum: ["MODEREE", "FORTE"] })
    niveau!: "MODEREE" | "FORTE"

    // detail du score par champ comparé (nom, prenom, dateNaissance...)
    @Column({ type: "jsonb", nullable: true })
    matchedFields!: Record<string, any>

    // etat de traitement de l'alerte par le personnel
    @Index()
    @Column({ type: "enum", enum: ["EN_ATTENTE", "CONFIRMEE_FUSION", "IGNOREE", "FAUX_POSITIF"], default: "EN_ATTENTE" })
    status!: "EN_ATTENTE" | "CONFIRMEE_FUSION" | "IGNOREE" | "FAUX_POSITIF"

    // date de detection de l'alerte par le cron
    @CreateDateColumn()
    detectedAt!: Date

    // date a laquelle le personnel a traité l'alerte
    @Column({ type: "timestamp", nullable: true })
    reviewedAt!: Date

    // utilisateur/compte ayant traité l'alerte
    @Column({ type: "uuid", nullable: true })
    reviewedBy!: string
}
