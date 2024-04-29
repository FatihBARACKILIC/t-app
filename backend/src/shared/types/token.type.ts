export type RefreshToken = {
  refresh_token: string;
};

export type AccessToken = {
  access_token: string;
};

export type TokenType = AccessToken & RefreshToken & { expires_in: number };
