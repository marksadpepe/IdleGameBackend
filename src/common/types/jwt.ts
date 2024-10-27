export type JwtTokens = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayload = {
  user_id: number;
  user_xp: number;
  user_level: number;
};

export type JwtValidated = JwtPayload & {
  iat: number;
  exp: number;
};
