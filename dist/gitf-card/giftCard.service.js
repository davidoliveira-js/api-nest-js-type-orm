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
exports.GiftCardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const gifitCard_entity_1 = require("./gifitCard.entity");
const ListGiftCardUser_dto_1 = require("./dto/ListGiftCardUser.dto");
const ListGiftCardAdmin_dto_1 = require("./dto/ListGiftCardAdmin.dto ");
const app_roles_1 = require("../access-control/app.roles");
let GiftCardService = class GiftCardService {
    constructor(giftCardRepository) {
        this.giftCardRepository = giftCardRepository;
    }
    async hashPin(pin) {
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(pin, salt);
        return hash;
    }
    async findAllGiftCards(userRoles) {
        const data = await this.giftCardRepository.find({
            where: userRoles !== app_roles_1.Roles.ADMIN ? { isAvailable: true } : {},
        });
        const giftCards = data.map((giftCard) => {
            return userRoles === app_roles_1.Roles.ADMIN
                ? new ListGiftCardAdmin_dto_1.ListGiftCardAdminDto(giftCard.id, giftCard.name, giftCard.price, giftCard.pin, giftCard.expiration_date, giftCard.isAvailable)
                : new ListGiftCardUser_dto_1.ListGiftCardUserDto(giftCard.id, giftCard.name, giftCard.price);
        });
        return giftCards;
    }
    async findOneGiftCardById(giftCardId, userRoles) {
        const data = await this.giftCardRepository.findOne({
            where: userRoles === app_roles_1.Roles.ADMIN
                ? { id: giftCardId }
                : { id: giftCardId, isAvailable: true },
        });
        if (!data) {
            throw new common_1.NotFoundException();
        }
        const giftCard = userRoles === app_roles_1.Roles.ADMIN
            ? new ListGiftCardAdmin_dto_1.ListGiftCardAdminDto(data.id, data.name, data.price, data.pin, data.expiration_date, data.isAvailable)
            : new ListGiftCardUser_dto_1.ListGiftCardUserDto(data.id, data.name, data.price);
        return giftCard;
    }
    async getOneGiftCardById(giftCardId) {
        return await this.giftCardRepository.findOne({
            where: { id: giftCardId },
        });
    }
    async createGiftCard(data) {
        data.pin = await this.hashPin(data.pin);
        const { id } = await this.giftCardRepository.save(data);
        return id;
    }
    async updateGiftCard(giftCardId, data) {
        const updatedGiftCard = (await this.giftCardRepository.update(giftCardId, data)).affected;
        if (!updatedGiftCard) {
            throw new common_1.NotFoundException();
        }
        return;
    }
    async deleteGiftCard(giftCardId) {
        try {
            const deletedGiftCard = (await this.giftCardRepository.delete(giftCardId)).affected;
            if (!deletedGiftCard) {
                throw new common_1.NotFoundException();
            }
            return;
        }
        catch (error) {
            if (error instanceof typeorm_2.QueryFailedError) {
                throw new common_1.BadRequestException();
            }
            throw new common_1.InternalServerErrorException();
        }
    }
};
GiftCardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(gifitCard_entity_1.GiftCardEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GiftCardService);
exports.GiftCardService = GiftCardService;
//# sourceMappingURL=giftCard.service.js.map