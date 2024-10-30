import { Module } from "@nestjs/common";
import { XpschedulerService } from "./xpscheduler.service";
import { UserModule } from "../user/user.module";
import { GameModule } from "../game/game.module";

@Module({
  imports: [UserModule, GameModule],
  providers: [XpschedulerService],
})
export class XpschedulerModule {}
