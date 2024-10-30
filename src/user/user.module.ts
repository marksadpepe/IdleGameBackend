import { Module, forwardRef } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { GameModule } from "../game/game.module";
import { XpschedulerService } from "../xpscheduler/xpscheduler.service";
import { UserController } from "./user.controller";
import { TokenModule } from "../token/token.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TokenModule,
    TypeOrmModule.forFeature([UserEntity]),
    GameModule,
    forwardRef(() => AuthModule),
  ],
  providers: [UserService, XpschedulerService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
