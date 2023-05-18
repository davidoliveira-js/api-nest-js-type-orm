"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuardModule = void 0;
const common_1 = require("@nestjs/common");
const nest_access_control_1 = require("nest-access-control");
const app_roles_1 = require("./app.roles");
let RolesGuardModule = class RolesGuardModule {
};
RolesGuardModule = __decorate([
    (0, common_1.Module)({
        imports: [nest_access_control_1.AccessControlModule.forRoles(app_roles_1.roles)],
    })
], RolesGuardModule);
exports.RolesGuardModule = RolesGuardModule;
//# sourceMappingURL=role.module.js.map