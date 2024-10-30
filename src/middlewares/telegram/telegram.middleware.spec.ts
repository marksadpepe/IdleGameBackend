import { TelegramMiddleware } from "./telegram.middleware";

describe("TelegramMiddleware", () => {
  it("should be defined", () => {
    expect(new TelegramMiddleware()).toBeDefined();
  });
});
