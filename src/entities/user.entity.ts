import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  xp: number;

  @Column({ default: 1 })
  level: number;

  @Column({ type: "timestamp", default: "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: "CURRENT_TIMESTAMP" })
  last_seen_time: Date;
}
