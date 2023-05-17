import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { RedisCacheService } from 'src/redis/redis.service';
export declare class AuthGuard implements CanActivate {
    private redisServices;
    private jwtService;
    private reflector;
    constructor(redisServices: RedisCacheService, jwtService: JwtService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
