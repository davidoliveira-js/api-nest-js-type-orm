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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../common/functions");
const redis_service_1 = require("../redis/redis.service");
let RefreshTokenAuthGuard = class RefreshTokenAuthGuard {
    constructor(redisServices) {
        this.redisServices = redisServices;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = (0, functions_1.extractRefreshTokenFromBody)(request);
        const isRefreshTokenInWhiteList = await this.redisServices.getRefreshTokenFromWhiteList(token);
        if (!isRefreshTokenInWhiteList) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
};
RefreshTokenAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisCacheService])
], RefreshTokenAuthGuard);
exports.RefreshTokenAuthGuard = RefreshTokenAuthGuard;
//# sourceMappingURL=refresh-token.auth.guard.js.map