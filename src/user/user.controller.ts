import { Controller, UseGuards, Get, Post, Req } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { UserService } from "./user.service";
import { UserDto } from "./dto";
import { Request } from "express";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ApiTelegramAuth } from "../common/decorators";

interface UserRequest extends Request {
  userId: number;
}

@ApiTags("")
@ApiTelegramAuth()
@Controller("")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Retrieves user progress" })
  @ApiResponse({
    status: 200,
    description: "User progress has been succsessfully retrieved",
  })
  @ApiResponse({
    status: 404,
    description: "User Not Found",
  })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error",
  })
  @Get("progress")
  async progress(@Req() req: UserRequest): Promise<UserDto> {
    const user = await this.userService.getUserById(req.userId);
    return new UserDto(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Gain XP when user was inactive" })
  @ApiResponse({
    status: 200,
    description: "User XP has been succsessfully earned",
  })
  @ApiResponse({
    status: 404,
    description: "User Not Found",
  })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error",
  })
  @Post("earn")
  async earn(@Req() req: UserRequest): Promise<UserDto> {
    const user = await this.userService.updateXp(req.userId);
    return new UserDto(user);
  }
}
