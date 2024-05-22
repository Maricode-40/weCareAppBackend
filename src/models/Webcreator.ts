import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("webcreator")
export class Webcreator extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "user_id" })
  userId!: number;

  @Column({ name: "style" })
  style!: string;

  @Column({ name: "area" })
  area!: string;

  // Relation 1:1 users
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  users!: User;
}
