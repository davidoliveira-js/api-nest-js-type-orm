"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftCardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const giftCard_controller_1 = require("./giftCard.controller");
const giftCard_service_1 = require("./giftCard.service");
const gifitCard_entity_1 = require("./gifitCard.entity");
let GiftCardModule = class GiftCardModule {
};
GiftCardModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([gifitCard_entity_1.GiftCardEntity])],
        controllers: [giftCard_controller_1.GiftCardController],
        providers: [giftCard_service_1.GiftCardService],
        exports: [giftCard_service_1.GiftCardService],
    })
], GiftCardModule);
exports.GiftCardModule = GiftCardModule;
//# sourceMappingURL=giftCard.module.js.map