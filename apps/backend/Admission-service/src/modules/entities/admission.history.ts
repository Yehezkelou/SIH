import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";





@Entity("AdmissionHistory")
export class AdmissionHistory {

    @PrimaryGeneratedColumn("uuid")
    id! : string

    // id admission
    @Column({type : "uuid", nullable : false})
    admissionId! : string

    // id patient 
    @Column({type : "uuid" , nullable : false})
    patientId! : string

    // numero patient
    @Column({type : "varchar", nullable : false})
    numeroPatient! : string

    // numero admission
    @Column({type : "varchar", nullable : false})
    admissionNumber! : string


    // old data 
    @Column({type : "jsonb", nullable : false})
    oldData! : Record<string , any>

    // new data 
    @Column({type : "jsonb", nullable : false})
    newData! : Record<string , any>
    
    // data 
    @CreateDateColumn()
    createdAt! : Date

    // Action 
    @Column({type : "enum" , enum : ["DELETE", "CREATE", "UPDATE"]})
    action!: "DELETE"| "UPDATE"| "CREATE"

    // celui qui a fait l'action
    @Column({type : "uuid", nullable : true})
    changedBy! : string
}
