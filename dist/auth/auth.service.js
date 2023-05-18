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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt = require("bcryptjs");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const redis_service_1 = require("../redis/redis.service");
const functions_1 = require("../common/functions");
let AuthService = class AuthService {
    constructor(redisService, usersService, jwtService) {
        this.redisService = redisService;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async createTokens(user) {
        const payload = {
            id: user.id,
            username: user.username,
            roles: user.role,
            timeStamp: new Date().getTime(),
        };
        const accessToken = await this.jwtService.signAsync(Object.assign(Object.assign({}, payload), { tokenType: 'accessToken' }), { expiresIn: 900 });
        const refreshToken = await this.jwtService.signAsync(Object.assign(Object.assign({}, payload), { tokenType: 'refreshToken' }), { expiresIn: 900 });
        await this.redisService.addRefreshTokenInWhiteList(refreshToken);
        return { accessToken, refreshToken };
    }
    async removeTokens(accessToken, refreshToken) {
        await this.redisService.addAccessTokenInBlackList(accessToken);
        await this.redisService.removeRefreshTokenFromWhiteList(refreshToken);
        return;
    }
    async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
    async validateUser(username, pass) {
        const user = await this.usersService.findOneUserByUsername(username);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const isPasswordCorrect = await this.comparePassword(pass, user.password);
        if (isPasswordCorrect) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        throw new common_1.UnauthorizedException();
    }
    async login(user) {
        return await this.createTokens(user);
    }
    async logout(req, refreshToken) {
        const accessToken = (0, functions_1.extractAccessTokenFromHeader)(req);
        this.removeTokens(accessToken, refreshToken);
        return;
    }
};
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "logout", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisCacheService,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map