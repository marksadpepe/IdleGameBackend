// NOTE: yes, it can be implemented in a much simpler way than it currently is, but anyway ( ͡° ͜ʖ ͡°)

import { registerAs } from "@nestjs/config";

export const TELEGRAM_CONFIGURATION_KEY = "telegram";

export type TelegramConfigType = {
  token: string;
};

export default registerAs(
  TELEGRAM_CONFIGURATION_KEY,
  (): TelegramConfigType => {
    const { TELEGRAM_TOKEN } = process.env;
    if (!TELEGRAM_TOKEN) {
      throw new Error("Telegram token was not specified");
    }

    return { token: TELEGRAM_TOKEN };
  },
);
