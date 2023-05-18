import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RedisCacheService } from 'src/redis/redis.service';
export declare class RoleService {
    private readonly redisService;
    private usersService;
    private jwtService;
    constructor(redisService: RedisCacheService, usersService: UserService, jwtService: JwtService);
}
