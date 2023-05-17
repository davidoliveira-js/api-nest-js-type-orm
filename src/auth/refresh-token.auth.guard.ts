import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { extractRefreshTokenFromBody } from 'src/common/functions';
import { RedisCacheService } from 'src/redis/redis.service';

@Injectable()
export class RefreshTokenAuthGuard implements CanActivate {
  constructor(private redisServices: RedisCacheService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractRefreshTokenFromBody(request);

    const isRefreshTokenInWhiteList =
      await this.redisServices.getRefreshTokenFromWhiteList(token);

    if (!isRefreshTokenInWhiteList) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
