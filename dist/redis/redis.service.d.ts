import { Redis } from '@nestjs-modules/ioredis';
export declare class RedisCacheService {
    private readonly redis;
    constructor(redis: Redis);
    addRefreshTokenInWhiteList(refreshToken: string): Promise<"OK">;
    getRefreshTokenFromWhiteList(refreshToken: string): Promise<boolean>;
    removeRefreshTokenFromWhiteList(refreshToken: string): Promise<number>;
    addAccessTokenInBlackList(accessToken: string): Promise<"OK">;
    getAccessTokenFromBlackList(accessToken: string): Promise<boolean>;
}
