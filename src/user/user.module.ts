import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { TokenModule } from "../token/token.module";
import { GameModule } from "../game/game.module";

@Module({
  imports: [TokenModule, TypeOrmModule.forFeature([UserEntity]), GameModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
