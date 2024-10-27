import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { GAME_CONFIGURATION_KEY, GameConfigType } from "../../configs";

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

  constructor(private readonly configService: ConfigService) {
    const gameConfig = this.configService.get<GameConfigType>(
      GAME_CONFIGURATION_KEY,
      { infer: true },
    );
    this.levelThreshold = gameConfig.levelThreshold;
    this.increaseLevelThresholdBy = gameConfig.levelThresholdIncreaseBy;
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
