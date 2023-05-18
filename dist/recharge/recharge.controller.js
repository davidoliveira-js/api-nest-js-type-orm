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
const nest_access_control_1 = require("nest-access-control");
const app_roles_1 = require("../access-control/app.roles");
let RechargeController = class RechargeController {
    constructor(rechargeService) {
        this.rechargeService = rechargeService;
    }
    async getAll() {
        const recharges = await this.rechargeService.findAllRecharges();
        return recharges;
    }
    async getOneById(id, userRoles, req) {
        const { user } = req;
        return await this.rechargeService.findOneRechargeById(id, userRoles, user.id);
    }
    async create(data, req, userRoles) {
        if (userRoles !== app_roles_1.Roles.ADMIN && data.userId !== req.user.id) {
            throw new common_1.ForbiddenException();
        }
        const newRechargeId = await this.rechargeService.createRecharge(data);
        return new nest_response_builder_1.NestResponseBuilder()
            .setStatus(common_1.HttpStatus.CREATED)
            .setHeaders({
            Location: `/recharges/${newRechargeId}`,
        })
            .setBody({ id: newRechargeId })
            .build();
    }
    async pay(rechargeId, req, userRoles) {
        const payment = await this.rechargeService.payRecharge(rechargeId, req.user.id, userRoles);
        if (!payment) {
            throw new common_1.InternalServerErrorException('Algo deu errado.');
        }
        return { id: rechargeId };
    }
};
__decorate([
    (0, nest_access_control_1.UseRoles)({
        resource: 'recharges',
        action: 'read',
        possession: 'any',
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RechargeController.prototype, "getAll", null);
__decorate([
    (0, nest_access_control_1.UseRoles)({
        resource: 'recharges',
        action: 'read',
        possession: 'own',
    }),
    (0, common_1.Get)('/:rechargeId'),
    __param(0, (0, common_1.Param)('rechargeId')),
    __param(1, (0, nest_access_control_1.UserRoles)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], RechargeController.prototype, "getOneById", null);
__decorate([
    (0, nest_access_control_1.UseRoles)({
        resource: 'recharges',
        action: 'create',
        possession: 'own',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, nest_access_control_1.UserRoles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateRecharge_dto_1.CreateRechargeDto, Object, String]),
    __metadata("design:returntype", Promise)
], RechargeController.prototype, "create", null);
__decorate([
    (0, nest_access_control_1.UseRoles)({
        resource: 'recharges',
        action: 'create',
        possession: 'own',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/:rechargeId'),
    __param(0, (0, common_1.Param)('rechargeId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, nest_access_control_1.UserRoles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], RechargeController.prototype, "pay", null);
RechargeController = __decorate([
    (0, common_1.Controller)('/recharges'),
    (0, common_1.UseGuards)(nest_access_control_1.ACGuard),
    __metadata("design:paramtypes", [recharge_service_1.RechargeService])
], RechargeController);
exports.RechargeController = RechargeController;
//# sourceMappingURL=recharge.controller.js.map