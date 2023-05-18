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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const CreateUser_dto_1 = require("./dto/CreateUser.dto");
const UpdateUser_dto_1 = require("./dto/UpdateUser.dto");
const nest_response_builder_1 = require("../core/http/nest-response-builder");
const nest_access_control_1 = require("nest-access-control");
const public_decorator_1 = require("../decorators/public.decorator");
const app_roles_1 = require("../access-control/app.roles");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAll() {
        return await this.userService.findAllUsers();
    }
    async getOneById(id, userRoles, req) {
        if (userRoles !== app_roles_1.Roles.ADMIN && req.user.id !== id) {
            throw new common_1.ForbiddenException();
        }
        return await this.userService.findOneUserById(id);
    }
    async create(data) {
        const newUserId = await this.userService.createUser(data);
        return new nest_response_builder_1.NestResponseBuilder()
            .setStatus(common_1.HttpStatus.CREATED)
            .setHeaders({
            Location: `/users/${newUserId}`,
        })
            .setBody({ id: newUserId })
            .build();
    }
    async update(data, id, userRoles, req) {
        if (userRoles !== app_roles_1.Roles.ADMIN && id !== req.user.id) {
            throw new common_1.ForbiddenException();
        }
        return await this.userService.updateUser(id, data);
    }
    async delete(id) {
        return await this.userService.deleteUser(id);
    }
};
__decorate([
    (0, nest_access_control_1.UseRoles)({
        resource: 'users',
        action: 'read',
        possession: 'any',
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    (0, nest_access_control_1.UseRoles)({
        resource: 'users',
        action: 'read',
        possession: 'own',
    }),
    (0, common_1.Get)('/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, nest_access_control_1.UserRoles)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOneById", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, nest_access_control_1.UseRoles)({
        resource: 'users',
        action: 'update',
        possession: 'own',
    }),
    (0, common_1.Put)('/:userId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, nest_access_control_1.UserRoles)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateUser_dto_1.UpdateUserDto, String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, nest_access_control_1.UseRoles)({
        resource: 'users',
        action: 'read',
        possession: 'any',
    }),
    (0, common_1.Delete)('/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, common_1.Controller)('/users'),
    (0, common_1.UseGuards)(nest_access_control_1.ACGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map