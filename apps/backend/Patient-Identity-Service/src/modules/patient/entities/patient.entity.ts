import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"



@Entity()
export class Patient {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    // NDPU (numéro de dossier patient unique)
    @Index()
    @Column({ length: 255, type: "varchar", unique: true, nullable: false })
    uniquePatientId!: string;


    // identité civile
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

    // donné de contact 
    @Index()
    @Column({ length: 255, type: "varchar" })
    email!: string

    @Index()
    @Column({ length: 255, type: "varchar" })
    numero!: string

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

    @Column({ length: 255, type: "varchar", nullable: true })
    createdBy!: string
}