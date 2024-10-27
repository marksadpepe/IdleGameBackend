import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { TokenService } from "../token/token.service";
import { UserTokenDto, UserDto } from "./dto";
import { ConfigService } from "@nestjs/config";
import { GameService } from "../game/game.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRep: Repository<UserEntity>,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly gameService: GameService,
  ) {}

  async createUser(username: string, password: string): Promise<UserTokenDto> {
    const candidate = await this.userRep.findOneBy({ username });
    if (candidate) {
      throw new ConflictException("User with such username already exists");
    }

    const user = new UserEntity(this.configService);
    user.username = username;
    user.password = password;
    await this.userRep.save(user);

    const tokens = this.tokenService.generateTokens({
      user_id: user.id,
      user_xp: user.xp,
      user_level: user.level,
    });
    await this.tokenService.saveToken(user, tokens.refreshToken);

    return new UserTokenDto(user, tokens);
  }

  async getUser(userId: number): Promise<UserDto> {
    const user = await this.userRep.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException("User with such username does not exists");
    }

    return new UserDto(user);
  }

  async updateXpForAllUsers(xp: number): Promise<void> {
    const users = await this.userRep.find();
    for (const user of users) {
      user.addXp(xp);
      await this.userRep.save(user);
    }
  }

  async updateXp(userId: number): Promise<UserDto> {
    const user = await this.userRep.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const accumulatedXp = this.gameService.calculateAccumulatedXp(
      user.last_seen_time,
    );
    user.addXp(accumulatedXp);
    user.last_seen_time = new Date();

    await this.userRep.save(user);

    return new UserDto(user);
  }

  // TODO: method to retrieve all users
  // TODO: method to delete user
}
