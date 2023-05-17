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
exports.GiftCardEntity = void 0;
const typeorm_1 = require("typeorm");
let GiftCardEntity = class GiftCardEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], GiftCardEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', length: 100, nullable: false }),
    __metadata("design:type", String)
], GiftCardEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pin', length: 255, nullable: false }),
    __metadata("design:type", String)
], GiftCardEntity.prototype, "pin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiration_date', default: new Date() }),
    __metadata("design:type", Date)
], GiftCardEntity.prototype, "expiration_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_available', default: true }),
    __metadata("design:type", Boolean)
], GiftCardEntity.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'price', nullable: false }),
    __metadata("design:type", Number)
], GiftCardEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", String)
], GiftCardEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", String)
], GiftCardEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", String)
], GiftCardEntity.prototype, "deletedAt", void 0);
GiftCardEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'giftcards' })
], GiftCardEntity);
exports.GiftCardEntity = GiftCardEntity;
//# sourceMappingURL=gifitCard.entity.js.map