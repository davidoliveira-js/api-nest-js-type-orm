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
exports.UpdateUserDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateUserDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'Informe um nome de usuário válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe um nome de usuário.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Informe um email válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe o campo email.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Informe uma senha válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe uma senha.' }),
    (0, class_validator_1.Length)(6, 8, {
        message: 'A senha deve conter entre 6 e 8 catacteres.',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Informe créditos válidos.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe os créditos.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "credits", void 0);
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=UpdateUser.dto.js.map