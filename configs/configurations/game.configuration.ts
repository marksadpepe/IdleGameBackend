import { registerAs } from "@nestjs/config";

export const GAME_CONFIGURATION_KEY = "game";

export type GameConfigType = {
  xpPerMinute: number;
  levelThreshold: number;
  levelThresholdIncreaseBy: number;
};

export default registerAs(GAME_CONFIGURATION_KEY, (): GameConfigType => {
  const { XP_PER_MINUTE, LEVEL_THRESHOLD, LEVEL_THRESHOLD_INCREASE_BY } =
    process.env;

  const parsedXp = parseInt(XP_PER_MINUTE ?? "");
  if (typeof parsedXp !== "number" || isNaN(parsedXp)) {
    throw new Error("Incorrect XP per minute value");
  }

  const parsedLevel = parseInt(LEVEL_THRESHOLD ?? "");
  if (typeof parsedLevel !== "number" || isNaN(parsedLevel)) {
    throw new Error("Incorrect level threshold value");
  }

  const parsedIncrease = parseInt(LEVEL_THRESHOLD_INCREASE_BY ?? "");
  if (typeof parsedIncrease !== "number" || isNaN(parsedIncrease)) {
    throw new Error("Incorrect increase level threshold value");
  }

  return {
    xpPerMinute: parsedXp,
    levelThreshold: parsedLevel,
    levelThresholdIncreaseBy: parsedIncrease,
  };
});
