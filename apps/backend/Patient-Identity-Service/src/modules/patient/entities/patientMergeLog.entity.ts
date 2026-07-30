import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";


@Entity("PatientMergeLog")
export class PatientMergeLog {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    // id du dossier source 
    @Column({type : 'uuid', nullable : true})
    sourcePatientId!: string

    // numero de dossier source 
    @Column({type : "varchar", length : 255, nullable : true})
    sourceNumeroDossier!: string

    // id du dossier conservé 
    @Index()
    @Column({type : "uuid", nullable : true})
    targetPatientId!: string

    // numero du dossier conservé 
    @Column({type : "varchar", length : 255, nullable : true})
    targetNumeroDossier!: string

    // capture des donnée sources 
    @Column({type : "jsonb", nullable : true})
    sourceSnapShot!: Record<string , any>

    // capture de la cible avant  
    @Column({type : "jsonb", nullable : true})
    targetSnapShotBefore!: Record<string , any>

    // capture de la cible apres 
    @Column({type : "jsonb", nullable : true})
    targetSnapShotAfter!: Record<string , any>

    // dossier physique rataché 
    @Column({type : "jsonb", nullable : true })
    dossierList!: Record<string , any>

    @Column({type : "enum" , enum : ["DOUBLON_REGULARISATION", "DOUBLON_DETECTE_SIMILARITE", "DOUBLON_MANUEL"]})
    motifFusion!: "DOUBLON_REGULARISATION" | "DOUBLON_DETECTE_SIMILARITE" | "DOUBLON_MANUEL"


    // date de fusion
    @CreateDateColumn()
    mergeAt!: Date
    
    // qui a effectuer la fusion 
    @Column({type : "varchar", length : 255})
    mergedBy!: string 

}