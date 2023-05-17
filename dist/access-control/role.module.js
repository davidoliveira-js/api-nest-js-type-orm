"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessModule = void 0;
const common_1 = require("@nestjs/common");
const nest_access_control_1 = require("nest-access-control");
let RoleService = class RoleService {
    getRoles() {
        return Promise.resolve(['my-custom-role']);
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)()
], RoleService);
let RoleModule = class RoleModule {
};
RoleModule = __decorate([
    (0, common_1.Module)({
        providers: [RoleService],
        exports: [RoleService],
    })
], RoleModule);
let AccessModule = class AccessModule {
};
AccessModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_access_control_1.AccessControlModule.forRootAsync({
                imports: [RoleModule],
                inject: [RoleService],
                useFactory: async (roleService) => {
                    return new nest_access_control_1.RolesBuilder(await roleService.getRoles());
                },
            }),
        ],
    })
], AccessModule);
exports.AccessModule = AccessModule;
//# sourceMappingURL=role.module.js.map