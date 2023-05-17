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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("./auth.module");
const core_1 = require("@nestjs/core");
const public_decorator_1 = require("../decorators/public.decorator");
const functions_1 = require("../common/functions");
const redis_service_1 = require("../redis/redis.service");
let AuthGuard = class AuthGuard {
    constructor(redisServices, jwtService, reflector) {
        this.redisServices = redisServices;
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        const request = context.switchToHttp().getRequest();
        const token = (0, functions_1.extractAccessTokenFromHeader)(request);
        if (isPublic) {
            return true;
        }
        const isAccessTokenInBlackList = await this.redisServices.getAccessTokenFromBlackList(token);
        if (!token || isAccessTokenInBlackList) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: auth_module_1.jwtConstants.secret,
            });
            request['user'] = payload;
        }
        catch (_a) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisCacheService,
        jwt_1.JwtService,
        core_1.Reflector])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map