import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RedisCacheService } from 'src/redis/redis.service';
export declare class RefreshTokenAuthGuard implements CanActivate {
    private redisServices;
    constructor(redisServices: RedisCacheService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
