import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { GameModule } from "../game/game.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), GameModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
