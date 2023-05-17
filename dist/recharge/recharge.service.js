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
exports.RechargeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recharge_entity_1 = require("./recharge.entity");
const user_service_1 = require("../user/user.service");
const ListRecharge_dto_1 = require("./dto/ListRecharge.dto");
let RechargeService = class RechargeService {
    constructor(rechargeRepository, userService) {
        this.rechargeRepository = rechargeRepository;
        this.userService = userService;
    }
    async findAllRecharges() {
        const data = await this.rechargeRepository.find({
            relations: { user: true },
        });
        const recharges = data.map((recharge) => {
            const { user } = recharge;
            return new ListRecharge_dto_1.ListRechargeDTO(recharge.id, recharge.value, recharge.status, { id: user.id, username: user.username });
        });
        return recharges;
    }
    async findOneRechargeById(rechargeId) {
        const data = await this.rechargeRepository.findOne({
            where: { id: rechargeId },
            relations: { user: true },
        });
        const { user } = data;
        const recharge = new ListRecharge_dto_1.ListRechargeDTO(data.id, data.value, data.status, { id: user.id, username: user.username });
        return recharge;
    }
    async createRecharge(data) {
        const rechargeUser = await this.userService.getOneUserById(data.userId);
        if (!rechargeUser) {
            throw new common_1.NotFoundException('Usuário não encontrado.');
        }
        const { id } = await this.rechargeRepository.save(Object.assign({ user: rechargeUser }, data));
        return id;
    }
    async payRecharge(rechargeId) {
        const recharge = await this.rechargeRepository.findOne({
            relations: { user: true },
            where: { id: rechargeId },
        });
        if (!recharge) {
            throw new common_1.NotFoundException('Recarga não encontrada.');
        }
        if (recharge.status === "payd") {
            throw new common_1.BadRequestException('Requisição inválida.');
        }
        if (recharge.status === "expired") {
            throw new common_1.BadRequestException('Cobrança expirada.');
        }
        return await this.rechargeRepository.manager.transaction(async (transactionalRechargeEntityManager) => {
            try {
                await transactionalRechargeEntityManager.update(recharge_entity_1.RechargeEntity, rechargeId, {
                    status: "payd",
                });
                const { user } = recharge;
                await this.userService.updateCredits(user.id, user.credits, recharge.value);
                return true;
            }
            catch (error) {
                throw new common_1.InternalServerErrorException('Algo deu errado.');
            }
        });
    }
};
RechargeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recharge_entity_1.RechargeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], RechargeService);
exports.RechargeService = RechargeService;
//# sourceMappingURL=recharge.service.js.map