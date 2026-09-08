import * as typeorm from "typeorm";
import { AdmissionPayerType } from "./admission.enum";
import { Admission } from "./admission.entity";

@typeorm.Entity("AdmissionPayer")
export class AdmissionPayer {
    @typeorm.PrimaryGeneratedColumn('uuid')
    id!: string;

    // reference a l'admission
    @typeorm.Index()
    @typeorm.Column({type : "uuid"})
    admissionId!: string;

    // champ pour specifier le type de payeur
    @typeorm.Index()
    @typeorm.Column({type : "enum", enum : AdmissionPayerType})
    payerType!: string;

    // nom du payeur
    @typeorm.Index()
    @typeorm.Column({type: "varchar", length : 255, nullable : true})
    name!: string;

    // numero de police d'assurance 
    @typeorm.Index()
    @typeorm.Column({type: "varchar", length : 255, nullable : true})
    policyNumber!: string;

    // pourcentage des frais de sejour
    @typeorm.Index()
    @typeorm.Column({type: "numeric", nullable : true})
    coveragePercentage!: number;

    // limite de couvertrue des frais de sejour 
    @typeorm.Index()
    @typeorm.Column({type: "numeric", nullable : true})
    coverageLimit!: number;

    // date d'expiration de la couverture 
    @typeorm.Index()
    @typeorm.Column({type: "date", nullable : true})
    validUntil!: Date;

    // relation inverse
    @typeorm.ManyToOne(() => Admission, ad => ad.payers)
    @typeorm.JoinColumn({name : "admissionId"})
    admission!: typeorm.Relation<Admission>;

    @typeorm.CreateDateColumn()
    createdAt!: Date;

    @typeorm.UpdateDateColumn()
    updatedAt!: Date;

    @typeorm.Column({type : "uuid", nullable : true})
    createdBy?: string;

    @typeorm.Column({type : "uuid", nullable : true})
    updatedBy?: string;

    // Suppression douce
    @typeorm.DeleteDateColumn()
    deletedAt?: Date;

    @typeorm.Column({type : "uuid", nullable : true})
    deletedBy?: string;
}