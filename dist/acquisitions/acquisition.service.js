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
exports.AcquisitionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const acquisition_entity_1 = require("./acquisition.entity");
const ListAcquisition_dto_1 = require("./dto/ListAcquisition.dto");
const user_service_1 = require("../user/user.service");
const giftCard_service_1 = require("../gitf-card/giftCard.service");
const UpdateUser_dto_1 = require("../user/dto/UpdateUser.dto");
let AcquisitionService = class AcquisitionService {
    constructor(acquisitionRepository, userService, giftCardService) {
        this.acquisitionRepository = acquisitionRepository;
        this.userService = userService;
        this.giftCardService = giftCardService;
    }
    async findAllAcquisitions() {
        const data = await this.acquisitionRepository.find({
            relations: { user: true, giftCard: true },
        });
        const acquisitions = data.map((acquisition) => {
            const { giftCard, user } = acquisition;
            return new ListAcquisition_dto_1.ListAcquisitionDTO(acquisition.id, acquisition.price, { id: giftCard.id, name: giftCard.name }, { id: user.id, username: user.username });
        });
        return acquisitions;
    }
    async findOneAcquisitionById(acquisitionId) {
        const data = await this.acquisitionRepository.findOne({
            where: { id: acquisitionId },
            relations: { giftCard: true, user: true },
        });
        const { giftCard, user } = data;
        const acquisition = new ListAcquisition_dto_1.ListAcquisitionDTO(data.id, data.price, { id: giftCard.id, name: giftCard.name }, { id: user.id, username: user.username });
        return acquisition;
    }
    async createAcquisition(data) {
        const acquisitionUser = await this.userService.getOneUserById(data.userId);
        const acquisitionGiftCard = await this.giftCardService.getOneGiftCardById(data.giftCardId);
        if (!acquisitionUser) {
            throw new common_1.NotFoundException('Usuário não encontrado.');
        }
        if (!acquisitionGiftCard) {
            throw new common_1.NotFoundException('Gift card não encontrado.');
        }
        return await this.acquisitionRepository.manager.transaction(async (transactionalAcquisitionManager) => {
            const newAcquisition = new acquisition_entity_1.AcquisitionEntity();
            newAcquisition.price = acquisitionGiftCard.price;
            newAcquisition.giftCard = acquisitionGiftCard;
            newAcquisition.user = acquisitionUser;
            const id = await transactionalAcquisitionManager.save(newAcquisition);
            const user = new UpdateUser_dto_1.UpdateUserDto();
            user.credits =
                acquisitionUser.credits - acquisitionGiftCard.price;
            await this.userService.updateUser(data.userId, user);
            return id;
        });
    }
};
AcquisitionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(acquisition_entity_1.AcquisitionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        giftCard_service_1.GiftCardService])
], AcquisitionService);
exports.AcquisitionService = AcquisitionService;
//# sourceMappingURL=acquisition.service.js.map