import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { TokenModule } from "../token/token.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TokenModule, UserModule],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthGuard],
})
export class AuthModule {}
