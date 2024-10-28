import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TokenEntity } from "../entities/token.entity";
import { UserEntity } from "../entities/user.entity";
import { TokenDto } from "./dto/token.dto";
import { JWT_CONFIGURATION_KEY, JwtConfigType } from "../../configs";
import { JwtTokens, JwtPayload, JwtValidated } from "../common/types";

@Injectable()
export class TokenService {
  private readonly ttl: number;
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(TokenEntity) private tokenRep: Repository<TokenEntity>,
  ) {
    const token = this.configService.get<JwtConfigType>(JWT_CONFIGURATION_KEY, {
      infer: true,
    });
    this.ttl = token.jwtTtl;
    this.accessSecret = token.jwtAccessSecret;
    this.refreshSecret = token.jwtRefreshSecret;
  }

  generateTokens(payload: JwtPayload): JwtTokens {
    const accessToken = jwt.sign(payload, this.accessSecret, {
      expiresIn: `${this.ttl}m`,
    });
    const refreshToken = jwt.sign(payload, this.refreshSecret, {
      expiresIn: `${this.ttl}d`,
    });

    return { accessToken, refreshToken };
  }

  async saveToken(user: UserEntity, refreshToken: string): Promise<TokenDto> {
    const tokenData = await this.tokenRep.findOneBy({ user });
    if (tokenData) {
      tokenData.refresh_token = refreshToken;
      await this.tokenRep.save(tokenData);

      return new TokenDto(tokenData);
    }

    const token = new TokenEntity();
    token.refresh_token = refreshToken;
    token.user = user;
    await this.tokenRep.save(token);

    return new TokenDto(token);
  }

  async findToken(refreshToken: string): Promise<TokenDto | null> {
    const tokenData = await this.tokenRep.findOneBy({
      refresh_token: refreshToken,
    });
    if (!tokenData) {
      return null;
    }

    return new TokenDto(tokenData);
  }

  async removeToken(refreshToken: string): Promise<void> {
    await this.tokenRep.delete({ refresh_token: refreshToken });
  }

  validateAccessToken(accessToken: string): JwtValidated {
    try {
      const userData = jwt.verify(
        accessToken,
        this.accessSecret,
      ) as JwtValidated;
      return userData;
    } catch (err) {
      throw new Error(`Failed to validate access token: ${err}`);
    }
  }

  validateRefreshToken(refreshToken: string): JwtValidated {
    try {
      const userData = jwt.verify(
        refreshToken,
        this.refreshSecret,
      ) as JwtValidated;
      return userData;
    } catch (err) {
      throw new Error(`Failed to validate refresh token: ${err}`);
    }
  }
}
