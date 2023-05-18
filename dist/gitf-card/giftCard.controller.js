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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftCardController = void 0;
const common_1 = require("@nestjs/common");
const giftCard_service_1 = require("./giftCard.service");
const nest_response_builder_1 = require("../core/http/nest-response-builder");
const CreateGiftCard_dto_1 = require("./dto/CreateGiftCard.dto");
const UpdateGiftCard_dto_1 = require("./dto/UpdateGiftCard.dto");
const nest_access_control_1 = require("nest-access-control");
let GiftCardController = class GiftCardController {
    constructor(giftCardService) {
        this.giftCardService = giftCardService;
    }
    async getAll(userRoles) {
        const giftCards = await this.giftCardService.findAllGiftCards(userRoles);
        return giftCards;
    }
    async getOneById(id, userRoles) {
        const giftCard = await this.giftCardService.findOneGiftCardById(id, userRoles);
        return giftCard;
    }
    async create(data) {
        const newGiftCardId = await this.giftCardService.createGiftCard(data);
        return new nest_response_builder_1.NestResponseBuilder()
            .setStatus(common_1.HttpStatus.CREATED)
            .setHeaders({
            Location: `/giftCards/${newGiftCardId}`,
        })
            .setBody({ id: newGiftCardId })
            .build();
    }
    async update(data, id) {
        return await this.giftCardService.updateGiftCard(id, data);
    }
    async delete(id) {
        return await this.giftCardService.deleteGiftCard(id);
    }
};
__decorate([
    (0, nest_access_control_1.UseRoles)({
        resource: 'giftCards',
        action: 'read',
        possession: 'any',
    }),
    (0, common_1.Get)(),
    __param(0, (0, nest_access_control_1.UserRoles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "getAll", null);
__decorate([
    (0, nest_access_control_1.UseRoles)({
        resource: 'giftCards',
        action: 'read',
        possession: 'any',
    }),
    (0, common_1.Get)('/:giftCardId'),
    __param(0, (0, common_1.Param)('giftCardId')),
    __param(1, (0, nest_access_control_1.UserRoles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "getOneById", null);
__decorate([
    (0, nest_access_control_1.UseRoles)({
        resource: 'giftCards',
        action: 'create',
        possession: 'any',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateGiftCard_dto_1.CreateGiftCardDto]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "create", null);
__decorate([
    (0, nest_access_control_1.UseRoles)({
        resource: 'giftCards',
        action: 'update',
        possession: 'any',
    }),
    (0, common_1.Put)('/:giftCardId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('giftCardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateGiftCard_dto_1.UpdateGiftCardDto, String]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "update", null);
__decorate([
    (0, nest_access_control_1.UseRoles)({
        resource: 'giftCards',
        action: 'delete',
        possession: 'any',
    }),
    (0, common_1.Delete)('/:giftCardId'),
    __param(0, (0, common_1.Param)('giftCardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "delete", null);
GiftCardController = __decorate([
    (0, common_1.Controller)('/gift-cards'),
    (0, common_1.UseGuards)(nest_access_control_1.ACGuard),
    __metadata("design:paramtypes", [giftCard_service_1.GiftCardService])
], GiftCardController);
exports.GiftCardController = GiftCardController;
//# sourceMappingURL=giftCard.controller.js.map