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

  private levelThreshold: number;
  private increaseLevelThresholdBy: number;

  initLevelConfig(levelThreshold: number, increaseLevelThresholdBy: number) {
    this.levelThreshold = levelThreshold;
    this.increaseLevelThresholdBy = increaseLevelThresholdBy;
  }

  // NOTE: start from here and move the logic below to another module
  addXp(xp: number): void {
    this.xp += xp;
    this.levelUpIfNeed();
  }

  private levelUpIfNeed(): void {
    while (this.xp >= this.levelThreshold) {
      this.xp -= this.levelThreshold;
      this.level += 1;
    }
    this.increaseLevelThreshold();
  }

  private increaseLevelThreshold(): void {
    this.levelThreshold +=
      this.levelThreshold * (this.increaseLevelThresholdBy / 100);
  }
}
