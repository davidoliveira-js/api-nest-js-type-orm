"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("@nestjs-modules/ioredis");
let RedisCacheService = class RedisCacheService {
    constructor(redis) {
        this.redis = redis;
    }
    async addRefreshTokenInWhiteList(refreshToken) {
        return await this.redis.set(`${"white-list-refresh-token"}:${refreshToken}`, "white-list-refresh-token", 'EX', 21600);
    }
    async getRefreshTokenFromWhiteList(refreshToken) {
        const value = await this.redis.get(`${"white-list-refresh-token"}:${refreshToken}`);
        return value !== null;
    }
    async removeRefreshTokenFromWhiteList(refreshToken) {
        return await this.redis.del(`${"white-list-refresh-token"}:${refreshToken}`);
    }
    async addAccessTokenInBlackList(accessToken) {
        return await this.redis.set(`${"black-list-access-token"}:${accessToken}`, "black-list-access-token", 'EX', 900);
    }
    async getAccessTokenFromBlackList(accessToken) {
        const value = await this.redis.get(`${"black-list-access-token"}:${accessToken}`);
        return value !== null;
    }
};
RedisCacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [Object])
], RedisCacheService);
exports.RedisCacheService = RedisCacheService;
//# sourceMappingURL=redis.service.js.map