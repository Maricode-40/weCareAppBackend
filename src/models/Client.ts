import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";

@Entity("clients")
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number; 

    @Column({ name: "user_id"})
    userId!: number;

    @Column({ name: "area"})
    area!: string;

    // Relation 1:1 with user
    @OneToOne(()=>User,(user) => user.id)
    @JoinColumn({ name: "user_id"})
    user!:User;


}
