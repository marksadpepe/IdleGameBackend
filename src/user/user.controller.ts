import { Controller, UseGuards, Get, Post, Req } from '@nestjs/common';
import {AuthGuard} from "../auth/auth.guard";
import {UserService} from "./user.service";
import {UserDto} from "./dto";
import {Request} from "express";

interface UserRequest extends Request {
  userId: number;
};

@Controller('')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("progress")
  async progress(@Req() req: UserRequest): Promise<UserDto> {
    const user = await this.userService.getUserById(req.userId);
    return new UserDto(user);
  }

  @Post("earn")
  async earn(@Req() req: UserRequest): Promise<UserDto> {
    const user = await this.userService.updateXp(req.userId);
    return new UserDto(user);
  }
}
