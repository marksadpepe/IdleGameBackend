import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { GameService } from "../game/game.service";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class XpschedulerService {
  constructor(
    private readonly userService: UserService,
    private readonly gameService: GameService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleXpIncrease() {
    await this.userService.updateXpForAllUsers(this.gameService.xpPerMinute);
  }
}
