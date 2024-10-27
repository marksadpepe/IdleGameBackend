import { UserEntity } from "../../entities/user.entity";

export class UserDto {
  id: number;
  username: string;
  xp: number;
  level: number;
  createdAt: number;
  lastSeenTime: number;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.username = user.username;
    this.xp = user.xp;
    this.level = user.level;
    this.createdAt = user.created_at.getTime();
    this.lastSeenTime = user.last_seen_time.getTime();
  }
}
