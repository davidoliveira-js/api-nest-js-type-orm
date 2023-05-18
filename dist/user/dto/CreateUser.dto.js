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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const app_roles_1 = require("../../access-control/app.roles");
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'Informe um nome de usuário válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe um nome de usuário.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Informe um email válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe o campo email.' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Informe uma senha válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe uma senha.' }),
    (0, class_validator_1.Length)(6, 8, {
        message: 'A senha deve conter entre 6 e 8 catacteres.',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Informe créditos válidos.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe os créditos.' }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "credits", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(app_roles_1.Roles, { message: 'Informe um cargo válido.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=CreateUser.dto.js.map