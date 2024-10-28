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

  // NOTE: start from here and move the logic below to another module
  addXp(xp: number, lvlTh: number, lvlIncVal: number): number {
    this.xp += xp;
    const calcLvlTh = this.levelUpIfNeed(lvlTh, lvlIncVal);

    return calcLvlTh;
  }

  private levelUpIfNeed(levelThreshold: number, levelInc: number): number {
    while (this.xp >= levelThreshold) {
      this.xp -= levelThreshold;
      this.level += 1;
      levelThreshold += Math.round(levelThreshold * (levelInc / 100));
    }

    return levelThreshold;
  }
}
