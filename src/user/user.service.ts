import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "./dto";
import { UserEntity } from "../entities/user.entity";
import { GameService } from "../game/game.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRep: Repository<UserEntity>,
    private readonly gameService: GameService,
  ) {}

  async createUser(username: string, password: string): Promise<UserEntity> {
    const candidate = await this.userRep.findOneBy({ username });
    if (candidate) {
      throw new ConflictException("User with such username already exists");
    }

    const user = new UserEntity();
    user.username = username;
    user.password = password;
    user.initLevelConfig(
      this.gameService.levelThreshold,
      this.gameService.levelIncValue,
    );

    await this.userRep.save(user);

    return user;
  }

  async getUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRep.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async getUserByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRep.findOneBy({ username });
    if (!user) {
      throw new NotFoundException("User with such username does not exists");
    }

    return user;
  }

  async updateLastSeenTime(userId: number): Promise<void> {
    const user = await this.userRep.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.last_seen_time = new Date();
    await this.userRep.save(user);
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
