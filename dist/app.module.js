"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const http_exception_filter_1 = require("./common/filters/http-exception-filter");
const response_transformer_interceptor_1 = require("./core/http/response-transformer.interceptor");
const acquisition_module_1 = require("./acquisitions/acquisition.module");
const giftCard_module_1 = require("./gitf-card/giftCard.module");
const recharge_module_1 = require("./recharge/recharge.module");
const ioredis_1 = require("@nestjs-modules/ioredis");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            ioredis_1.RedisModule.forRoot({
                config: {
                    url: 'redis://localhost:6379',
                },
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                username: 'root',
                password: 'root',
                database: 'db_api_estudo',
                entities: ['dist/**/*.entity.js'],
                synchronize: true,
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            acquisition_module_1.AcquisitionModule,
            giftCard_module_1.GiftCardModule,
            recharge_module_1.RechargeModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: common_1.ClassSerializerInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_transformer_interceptor_1.ResponseTransformerInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map