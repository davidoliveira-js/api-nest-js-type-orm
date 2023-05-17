export const enum Tokens {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
}

export const enum RedisPrefixes {
  BlackListAccessToken = 'black-list-access-token',
  WhiteListRefreshToken = 'white-list-refresh-token',
}

export const enum RedisTTLs {
  BlackListAccessToken = 900,
  WhiteListRefreshToken = 21600,
}
