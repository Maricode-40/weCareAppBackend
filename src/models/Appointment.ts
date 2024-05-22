import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Webcreator } from "./Webcreator";
import { Client } from "./Client";

@Entity("appointments")
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "day_date" })
  dayDate!: Date;

  @Column({ name: "webcreator_id" })
  webcreatorId!: number;

  @Column({ name: "client_id" })
  clientId!: number;

  @Column({ name: "description" })
  description!: string;

  @Column({ name: "price" })
  price!: number;

  //relation N:1 with webcreator
  @ManyToOne(() => Webcreator, (webcreator) => webcreator.id)
  @JoinColumn({ name: "webcreator_id" })
  webcreator!: Webcreator;

  //relation N:1 with artist
  @ManyToOne(() => Client, (client) => client.id)
  @JoinColumn({ name: "client_id" })
  client!: Client;
}
