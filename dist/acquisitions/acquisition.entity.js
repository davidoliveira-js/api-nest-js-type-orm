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
exports.AcquisitionEntity = void 0;
const gifitCard_entity_1 = require("../gitf-card/gifitCard.entity");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
let AcquisitionEntity = class AcquisitionEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AcquisitionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'price', nullable: false }),
    __metadata("design:type", Number)
], AcquisitionEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", String)
], AcquisitionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", String)
], AcquisitionEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", String)
], AcquisitionEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.acquisitions, {
        nullable: false,
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], AcquisitionEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => gifitCard_entity_1.GiftCardEntity, {
        eager: true,
        cascade: true,
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", gifitCard_entity_1.GiftCardEntity)
], AcquisitionEntity.prototype, "giftCard", void 0);
AcquisitionEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'acquisitions' })
], AcquisitionEntity);
exports.AcquisitionEntity = AcquisitionEntity;
//# sourceMappingURL=acquisition.entity.js.map