import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  xp: number;

  @Column()
  level: number;

  @Column({ type: "timestamp", nullable: true })
  last_seen_time: Date;
}
