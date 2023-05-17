import { RedisService as RedisApiService } from 'nestjs-redis';
export declare class RedisCacheService {
    private readonly redisService;
    constructor(redisService: RedisApiService);
    set(key: string, value: string): Promise<string>;
    get(key: string): Promise<string | null>;
}
