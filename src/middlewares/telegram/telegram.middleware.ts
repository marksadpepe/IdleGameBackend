import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  TELEGRAM_CONFIGURATION_KEY,
  TelegramConfigType,
} from "../../../configs";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class TelegramMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { token } = this.config.get<TelegramConfigType>(
      TELEGRAM_CONFIGURATION_KEY,
      { infer: true },
    );
    const reqTgToken = req.headers.authorization;

    if (token !== reqTgToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return next();
  }
}
