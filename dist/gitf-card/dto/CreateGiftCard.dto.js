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
exports.CreateGiftCardDto = void 0;
const class_validator_1 = require("class-validator");
class CreateGiftCardDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'Informe um nome de gift card válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe um nome de gift card.' }),
    __metadata("design:type", String)
], CreateGiftCardDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Informe um preço válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe um preço.' }),
    __metadata("design:type", Number)
], CreateGiftCardDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Informe pin válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe o pin.' }),
    (0, class_validator_1.Length)(16),
    __metadata("design:type", String)
], CreateGiftCardDto.prototype, "pin", void 0);
exports.CreateGiftCardDto = CreateGiftCardDto;
//# sourceMappingURL=CreateGiftCard.dto.js.map