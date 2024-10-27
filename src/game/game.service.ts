import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GameConfigType, GAME_CONFIGURATION_KEY } from "../../configs";

@Injectable()
export class GameService {
  private readonly xpPerMinute: number;

  constructor(private readonly configService: ConfigService) {
    const gameConfig = this.configService.get<GameConfigType>(
      GAME_CONFIGURATION_KEY,
      { infer: true },
    );

    this.xpPerMinute = gameConfig.xpPerMinute;
  }

  calculateAccumulatedXp(userLastSeenTime: number): number {
    const currentTime = new Date().getTime();
    const timeDiff = Math.floor((currentTime - userLastSeenTime) / 1000 / 60);

    return timeDiff * this.xpPerMinute;
  }
}
