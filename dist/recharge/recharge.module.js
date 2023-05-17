"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RechargeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const recharge_controller_1 = require("./recharge.controller");
const recharge_service_1 = require("./recharge.service");
const recharge_entity_1 = require("./recharge.entity");
const user_module_1 = require("../user/user.module");
const giftCard_module_1 = require("../gitf-card/giftCard.module");
let RechargeModule = class RechargeModule {
};
RechargeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([recharge_entity_1.RechargeEntity]),
            user_module_1.UserModule,
            giftCard_module_1.GiftCardModule,
        ],
        controllers: [recharge_controller_1.RechargeController],
        providers: [recharge_service_1.RechargeService],
        exports: [recharge_service_1.RechargeService],
    })
], RechargeModule);
exports.RechargeModule = RechargeModule;
//# sourceMappingURL=recharge.module.js.map