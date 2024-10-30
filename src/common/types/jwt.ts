export type JwtTokens = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayload = {
  userId: number;
  userXp: number;
  userLevel: number;
};

export type JwtValidated = JwtPayload & {
  iat: number;
  exp: number;
};
