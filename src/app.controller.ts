import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ApiTelegramAuth } from "./common/decorators";

@ApiTags("")
@ApiTelegramAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Get hello from the app" })
  @ApiResponse({
    status: 200,
    description: "User progress has been succsessfully retrieved",
  })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error",
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
