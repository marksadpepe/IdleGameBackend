import { applyDecorators } from "@nestjs/common";
import { ApiHeader } from "@nestjs/swagger";

export function ApiTelegramAuth() {
  return applyDecorators(
    ApiHeader({
      name: "x-telegram",
      description: "Telegram token for fake authorization",
      required: true,
    }),
  );
}
