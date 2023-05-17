export declare const enum Tokens {
    AccessToken = "accessToken",
    RefreshToken = "refreshToken"
}
export declare const enum RedisPrefixes {
    BlackListAccessToken = "black-list-access-token",
    WhiteListRefreshToken = "white-list-refresh-token"
}
export declare const enum RedisTTLs {
    BlackListAccessToken = 900,
    WhiteListRefreshToken = 21600
}
