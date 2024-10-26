import { registerAs } from "@nestjs/config";

export const SERVER_CONFIGURATION_KEY = "server";

export type ServerConfigType = {
  port: number;
  prefix: string;
};

export default registerAs(SERVER_CONFIGURATION_KEY, (): ServerConfigType => {
  const { SERVER_PORT, SERVER_API_PREFIX } = process.env;

  if (!SERVER_API_PREFIX) {
    throw new Error("Incorrect server API prefix format");
  }

  const parsedPort = parseInt(SERVER_PORT ?? "");
  if (typeof parsedPort !== "number" || isNaN(parsedPort)) {
    throw new Error("Incorrect server port format");
  }

  return { port: parsedPort, prefix: SERVER_API_PREFIX };
});
