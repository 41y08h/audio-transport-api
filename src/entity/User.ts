import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import Handshake from "./Handshake";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createdAt: number;

  @OneToMany(() => Handshake, (handshake) => handshake.offerFrom)
  offers: Handshake[];

  @OneToMany(() => Handshake, (handshake) => handshake.offerTo)
  offersTo: Handshake[];
}
