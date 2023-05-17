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
exports.CreateAcquisitionDto = void 0;
const class_validator_1 = require("class-validator");
class CreateAcquisitionDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'Informe um ID de usuário válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe um ID de usuário.' }),
    __metadata("design:type", String)
], CreateAcquisitionDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Informe um ID de gift card válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe um ID de gift card.' }),
    __metadata("design:type", String)
], CreateAcquisitionDto.prototype, "giftCardId", void 0);
exports.CreateAcquisitionDto = CreateAcquisitionDto;
//# sourceMappingURL=CreateAcquisition.dto.js.map