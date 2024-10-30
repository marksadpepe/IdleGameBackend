import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GameConfigType, GAME_CONFIGURATION_KEY } from "../../configs";

@Injectable()
export class GameService {
  public readonly xpPerMinute: number;
  public levelThreshold: number;
  public readonly levelIncValue: number;

  constructor(private readonly configService: ConfigService) {
    const gameConfig = this.configService.get<GameConfigType>(
      GAME_CONFIGURATION_KEY,
      { infer: true },
    );

    this.xpPerMinute = gameConfig.xpPerMinute;
    this.levelThreshold = gameConfig.levelThreshold;
    this.levelIncValue = gameConfig.levelThresholdIncreaseBy;
  }

  calculateAccumulatedXp(userLastSeenTime: Date): number {
    const currentTime = new Date().getTime();
    const timeDiff = Math.floor(
      (currentTime - userLastSeenTime.getTime()) / 1000 / 60,
    );

    return timeDiff * this.xpPerMinute;
  }
}
