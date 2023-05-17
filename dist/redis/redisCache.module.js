"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConfigModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_redis_1 = require("nestjs-redis");
let RedisConfigModule = class RedisConfigModule {
};
RedisConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_redis_1.RedisModule.register({
                host: 'localhost',
                port: 6379,
                db: 0,
            }),
        ],
        exports: [nestjs_redis_1.RedisModule],
    })
], RedisConfigModule);
exports.RedisConfigModule = RedisConfigModule;
//# sourceMappingURL=redisCache.module.js.map