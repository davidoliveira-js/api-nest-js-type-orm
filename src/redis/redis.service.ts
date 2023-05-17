import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { RedisPrefixes, RedisTTLs } from './redis.enum';

@Injectable()
export class RedisCacheService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async addRefreshTokenInWhiteList(refreshToken: string) {
    return await this.redis.set(
      `${RedisPrefixes.WhiteListRefreshToken}:${refreshToken}`,
      RedisPrefixes.WhiteListRefreshToken,
      'EX',
      RedisTTLs.WhiteListRefreshToken
    );
  }

  async getRefreshTokenFromWhiteList(refreshToken: string) {
    const value = await this.redis.get(
      `${RedisPrefixes.WhiteListRefreshToken}:${refreshToken}`
    );
    return value !== null;
  }

  async removeRefreshTokenFromWhiteList(refreshToken: string) {
    return await this.redis.del(
      `${RedisPrefixes.WhiteListRefreshToken}:${refreshToken}`
    );
  }

  async addAccessTokenInBlackList(accessToken: string) {
    return await this.redis.set(
      `${RedisPrefixes.BlackListAccessToken}:${accessToken}`,
      RedisPrefixes.BlackListAccessToken,
      'EX',
      RedisTTLs.BlackListAccessToken
    );
  }

  async getAccessTokenFromBlackList(accessToken: string) {
    const value = await this.redis.get(
      `${RedisPrefixes.BlackListAccessToken}:${accessToken}`
    );
    return value !== null;
  }
}
