import { UserEntity } from "../../entities/user.entity";
import { JwtTokens } from "../../common/types";

export class UserTokenDto {
  id: number;
  username: string;
  xp: number;
  level: number;
  createdAt: number;
  lastSeenTime: number;
  accessToken: string;
  refreshToken: string;

  constructor(user: UserEntity, tokens: JwtTokens) {
    this.id = user.id;
    this.username = user.username;
    this.xp = user.xp;
    this.level = user.level;
    this.createdAt = user.created_at.getTime();
    this.lastSeenTime = user.last_seen_time.getTime();
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
  }
}
