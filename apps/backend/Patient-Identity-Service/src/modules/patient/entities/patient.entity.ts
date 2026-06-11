import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"



@Entity()
export class Patient {

    @PrimaryGeneratedColumn("uuid")
    id!: string; 

    // identité civile
    @Column({length : 255, type : "varchar"}) 
    nom!: string;

    @Column({length : 255, type : "varchar"})
    prenom!: string

    @Column({length : 255, type : "bit"})
    age!: number;

    @Column({type : "enum" , enum : ["M", "F"]})
    genre!: "M" | "F";

    // donné de contact 
    @Column({length : 255, type : "varchar"})
    email!: string 

    @Column({length : 255, type : "varchar"})
    numero!: string

    // identifiant unique 
    @Column({length : 255, type : "varchar", unique: true})
    numSecuSocial!: string

    @Column({length : 255 , type : "varchar", unique : true})
    numIdentityNational!: string

    // metadonnée systeme
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column({length : 255, type : "varchar", nullable : false})
    createdBy!: string 
}