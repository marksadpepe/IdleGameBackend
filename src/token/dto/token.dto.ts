import { TokenEntity } from "../../entities/token.entity";

export class TokenDto {
  id: number;
  refreshToken: string;
  userId: number;

  constructor(token: TokenEntity) {
    this.id = token.id;
    this.refreshToken = token.refresh_token;
    this.userId = token.user.id;
  }
}
