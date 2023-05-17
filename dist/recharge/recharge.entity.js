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
exports.RechargeEntity = void 0;
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
let RechargeEntity = class RechargeEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RechargeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'value', nullable: false }),
    __metadata("design:type", Number)
], RechargeEntity.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        default: "pending",
        nullable: false,
    }),
    __metadata("design:type", String)
], RechargeEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.recharges),
    __metadata("design:type", user_entity_1.UserEntity)
], RechargeEntity.prototype, "user", void 0);
RechargeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'recharges' })
], RechargeEntity);
exports.RechargeEntity = RechargeEntity;
//# sourceMappingURL=recharge.entity.js.map