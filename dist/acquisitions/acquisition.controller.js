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
exports.AcquisitionController = void 0;
const common_1 = require("@nestjs/common");
const acquisition_service_1 = require("./acquisition.service");
const nest_response_builder_1 = require("../core/http/nest-response-builder");
const CreateAcquisition_dto_1 = require("./dto/CreateAcquisition.dto");
const nest_access_control_1 = require("nest-access-control");
const app_roles_1 = require("../access-control/app.roles");
let AcquisitionController = class AcquisitionController {
    constructor(acquisitionService) {
        this.acquisitionService = acquisitionService;
    }
    async getAll() {
        const acquisitions = await this.acquisitionService.findAllAcquisitions();
        return acquisitions;
    }
    async getOneById(id, userRoles, req) {
        const acquisition = await this.acquisitionService.findOneAcquisitionById(id, userRoles, req.user.id);
        return acquisition;
    }
    async create(data, req, userRoles) {
        if (userRoles !== app_roles_1.Roles.ADMIN && data.userId !== req.user.id) {
            throw new common_1.ForbiddenException();
        }
        const newAcquisitionId = await this.acquisitionService.createAcquisition(data);
        return new nest_response_builder_1.NestResponseBuilder()
            .setStatus(common_1.HttpStatus.CREATED)
            .setHeaders({
            Location: `/acquisitions/${newAcquisitionId}`,
        })
            .setBody({ id: newAcquisitionId })
            .build();
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
], AcquisitionController.prototype, "getAll", null);
__decorate([
    (0, nest_access_control_1.UseRoles)({
        resource: 'recharges',
        action: 'read',
        possession: 'own',
    }),
    (0, common_1.Get)('/:acquisitionId'),
    __param(0, (0, common_1.Param)('acquisitionId')),
    __param(1, (0, nest_access_control_1.UserRoles)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AcquisitionController.prototype, "getOneById", null);
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
    __metadata("design:paramtypes", [CreateAcquisition_dto_1.CreateAcquisitionDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AcquisitionController.prototype, "create", null);
AcquisitionController = __decorate([
    (0, common_1.Controller)('/acquisitions'),
    (0, common_1.UseGuards)(nest_access_control_1.ACGuard),
    __metadata("design:paramtypes", [acquisition_service_1.AcquisitionService])
], AcquisitionController);
exports.AcquisitionController = AcquisitionController;
//# sourceMappingURL=acquisition.controller.js.map