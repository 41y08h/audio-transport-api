import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import User from "./User";

@Entity()
export default class Handshake extends BaseEntity {
  @PrimaryColumn()
  offerFromId: number;
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "offerFromId" })
  offerFrom: User;

  @PrimaryColumn()
  offerToId: number;
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "offerToId" })
  offerTo: User;

  @CreateDateColumn()
  createdAt: Date;
}
