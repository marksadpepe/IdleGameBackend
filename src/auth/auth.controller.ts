import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseFilters,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { EnterDto } from "./dto/enter.dto";
import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";
import { JWT_CONFIGURATION_KEY, JwtConfigType } from "../../configs";
import { AuthGuard } from "./auth.guard";
import {AllExceptionsFilter} from "../exceptions/AllExceptionsFilter";

@UseFilters(AllExceptionsFilter)
@Controller("")
export class AuthController {
  private readonly maxAgeValue: number;

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    const jwtConfig = this.configService.get<JwtConfigType>(
      JWT_CONFIGURATION_KEY,
      {
        infer: true,
      },
    );
    this.maxAgeValue = jwtConfig.jwtTtl * 24 * 60 * 60 * 1000;
  }

  @UsePipes(new ValidationPipe())
  @Post("start")
  async start(@Body() dto: EnterDto, @Res() res: Response) {
    const { username, password } = dto;
    const userData = await this.authService.start(username, password);

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: this.maxAgeValue,
      httpOnly: true,
    });

    return res.status(201).json({ user: userData });
  }

  @UsePipes(new ValidationPipe())
  @Post("enter")
  async enter(@Body() dto: EnterDto, @Res() res: Response) {
    const { username, password } = dto;
    const userData = await this.authService.enter(username, password);

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: this.maxAgeValue,
      httpOnly: true,
    });

    return res.status(200).json({ user: userData });
  }

  @UseGuards(AuthGuard)
  @Post("exit")
  async exit(@Req() req: Request, @Res() res: Response) {
    const token = this.authService.getTokenFromHeaders(req.headers.cookie);

    await this.authService.exit(token);
    res.clearCookie("refreshToken");

    return res.status(200).json({});
  }

  @Post("refresh-token")
  async refresh(@Req() req: Request, @Res() res: Response) {
    const token = this.authService.getTokenFromHeaders(req.headers.cookie);
    const userData = await this.authService.refresh(token);

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: this.maxAgeValue,
      httpOnly: true,
    });

    return res.status(200).json({ user: userData });
  }
}
