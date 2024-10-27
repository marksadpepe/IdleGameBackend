import { registerAs } from "@nestjs/config";

export const JWT_CONFIGURATION_KEY = "jwt";

export type JwtConfigType = {
  jwtAccessSecret: string;
  jwtRefreshSecret: string;
  jwtTtl: number;
};

export default registerAs(JWT_CONFIGURATION_KEY, (): JwtConfigType => {
  const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_TTL } = process.env;

  if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error("JWT secret keys were not specified");
  }

  const parsedJwtTtl = parseInt(JWT_TTL ?? "");
  if (typeof parsedJwtTtl !== "number" || isNaN(parsedJwtTtl)) {
    throw new Error("Incorrect JWT TTL format");
  }

  return {
    jwtAccessSecret: JWT_ACCESS_SECRET,
    jwtRefreshSecret: JWT_REFRESH_SECRET,
    jwtTtl: parsedJwtTtl,
  };
});
