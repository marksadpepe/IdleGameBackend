import * as bcrypt from "bcrypt";
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { UserTokenDto } from "../user/dto";
import { TokenService } from "../token/token.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async start(username: string, password: string): Promise<UserTokenDto> {
    const hashedPassword = await bcrypt.hash(password, 4);
    const user = await this.userService.createUser(username, hashedPassword);

    const tokens = this.tokenService.generateTokens({
      userId: user.id,
      userXp: user.xp,
      userLevel: user.level,
    });
    await this.tokenService.saveToken(user, tokens.refreshToken);

    return new UserTokenDto(user, tokens);
  }

  async enter(username: string, password: string): Promise<UserTokenDto> {
    const user = await this.userService.getUserByUsername(username);
    const isPwdValid = await bcrypt.compare(password, user.password);
    if (!isPwdValid) {
      throw new BadRequestException("Incorrect password");
    }

    await this.userService.updateLastSeenTime(user.id);

    const tokens = this.tokenService.generateTokens({
      userId: user.id,
      userXp: user.xp,
      userLevel: user.level,
    });
    await this.tokenService.saveToken(user, tokens.refreshToken);

    return new UserTokenDto(user, tokens);
  }

  async exit(refreshToken: string): Promise<object> {
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    if (!userData) {
      throw new UnauthorizedException();
    }

    await this.tokenService.removeToken(refreshToken);
    await this.userService.updateLastSeenTime(userData.userId);

    return {};
  }

  async refresh(refreshToken: string): Promise<UserTokenDto> {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getUserById(userData.userId);
    await this.tokenService.removeToken(refreshToken);

    const tokens = this.tokenService.generateTokens({
      userId: user.id,
      userXp: user.xp,
      userLevel: user.level,
    });
    await this.tokenService.saveToken(user, tokens.refreshToken);

    return new UserTokenDto(user, tokens);
  }

  getTokenFromHeaders(cookie: string | undefined): string {
    if (cookie === undefined) {
      throw new UnauthorizedException();
    }

    let token = "";
    const cookies = cookie.split(";");

    for (const c of cookies) {
      if (c.includes("refreshToken")) {
        const tmp = c.split("=");
        token = tmp[tmp.length - 1];
        break;
      }
    }

    return token;
  }
}
