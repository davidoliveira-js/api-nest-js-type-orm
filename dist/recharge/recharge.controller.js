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
exports.RechargeController = void 0;
const common_1 = require("@nestjs/common");
const recharge_service_1 = require("./recharge.service");
const CreateRecharge_dto_1 = require("./dto/CreateRecharge.dto");
const nest_response_builder_1 = require("../core/http/nest-response-builder");
let RechargeController = class RechargeController {
    constructor(rechargeService) {
        this.rechargeService = rechargeService;
    }
    async getAll() {
        const recharges = await this.rechargeService.findAllRecharges();
        return recharges;
    }
    async getOneById(id) {
        const recharge = await this.rechargeService.findOneRechargeById(id);
        if (!recharge) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: 'Recarga não encontrado.',
            });
        }
        return recharge;
    }
    async create(data) {
        const newRechargeId = await this.rechargeService.createRecharge(data);
        return new nest_response_builder_1.NestResponseBuilder()
            .setStatus(common_1.HttpStatus.CREATED)
            .setHeaders({
            Location: `/recharges/${newRechargeId}`,
        })
            .setBody({ id: newRechargeId })
            .build();
    }
    async pay(rechargeId) {
        const payment = await this.rechargeService.payRecharge(rechargeId);
        if (!payment) {
            throw new common_1.InternalServerErrorException('Algo deu errado.');
        }
        return;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RechargeController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/:rechargeId'),
    __param(0, (0, common_1.Param)('rechargeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RechargeController.prototype, "getOneById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateRecharge_dto_1.CreateRechargeDto]),
    __metadata("design:returntype", Promise)
], RechargeController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/:rechargeId'),
    __param(0, (0, common_1.Param)('rechargeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RechargeController.prototype, "pay", null);
RechargeController = __decorate([
    (0, common_1.Controller)('/recharges'),
    __metadata("design:paramtypes", [recharge_service_1.RechargeService])
], RechargeController);
exports.RechargeController = RechargeController;
//# sourceMappingURL=recharge.controller.js.map