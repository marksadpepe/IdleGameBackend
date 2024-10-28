import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { GameModule } from "../game/game.module";
import { XpschedulerService } from "../xpscheduler/xpscheduler.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), GameModule],
  providers: [UserService, XpschedulerService],
  exports: [UserService],
})
export class UserModule {}
