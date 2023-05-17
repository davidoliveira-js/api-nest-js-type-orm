import * as bcrypt from 'bcryptjs';
import {
  Body,
  Injectable,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { RedisCacheService } from 'src/redis/redis.service';
import { extractAccessTokenFromHeader } from 'src/common/functions';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisCacheService,
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async createTokens(user: UserEntity) {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      timeStamp: new Date().getTime(),
    };
    const accessToken = await this.jwtService.signAsync({
      ...payload,
      tokenType: 'accessToken',
    });

    const refreshToken = await this.jwtService.signAsync({
      ...payload,
      tokenType: 'refreshToken',
    });

    await this.redisService.addRefreshTokenInWhiteList(refreshToken);

    return { accessToken, refreshToken };
  }

  async removeTokens(accessToken: string, refreshToken: string) {
    await this.redisService.addAccessTokenInBlackList(accessToken);
    await this.redisService.removeRefreshTokenFromWhiteList(
      refreshToken
    );
    return;
  }

  async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneUserByUsername(
      username
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordCorrect = await this.comparePassword(
      pass,
      user.password
    );
    if (isPasswordCorrect) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(
    user: UserEntity
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return await this.createTokens(user);
  }

  async logout(@Request() req, refreshToken: string) {
    const accessToken = extractAccessTokenFromHeader(req);
    this.removeTokens(accessToken, refreshToken);
    return;
  }
}
