import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { TokenService } from "../token/token.service";
import { JwtValidated } from "../common/types/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.includes("Bearer")) {
      throw new UnauthorizedException();
    }

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const userData: JwtValidated =
      this.tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw new UnauthorizedException();
    }

    // NOTE: saving user ID just in case
    req["userId"] = userData["userId"];

    return true;
  }
}
