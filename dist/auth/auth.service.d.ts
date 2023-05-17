import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { RedisCacheService } from 'src/redis/redis.service';
export declare class AuthService {
    private readonly redisService;
    private usersService;
    private jwtService;
    constructor(redisService: RedisCacheService, usersService: UserService, jwtService: JwtService);
    createTokens(user: UserEntity): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    removeTokens(accessToken: string, refreshToken: string): Promise<void>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    validateUser(username: string, pass: string): Promise<any>;
    login(user: UserEntity): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: any, refreshToken: string): Promise<void>;
}
