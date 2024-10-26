import { registerAs } from "@nestjs/config";

export const SERVER_CONFIGURATION_KEY = "server";

export type ServerConfigType = {
  port: number;
};

export default registerAs(SERVER_CONFIGURATION_KEY, (): ServerConfigType => {
  const { SERVER_PORT } = process.env;

  const parsedPort = parseInt(SERVER_PORT ?? "");
  if (typeof parsedPort !== "number" || isNaN(parsedPort)) {
    throw new Error("Incorrect server port format");
  }

  return { port: parsedPort };
});
