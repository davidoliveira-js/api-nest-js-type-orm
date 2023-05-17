"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = exports.AppRoles = void 0;
const nest_access_control_1 = require("nest-access-control");
var AppRoles;
(function (AppRoles) {
    AppRoles["ADMIN"] = "admin";
    AppRoles["USER"] = "user";
})(AppRoles = exports.AppRoles || (exports.AppRoles = {}));
exports.roles = new nest_access_control_1.RolesBuilder();
exports.roles
    .grant(AppRoles.ADMIN)
    .readAny(['users'])
    .createAny(['users'])
    .updateAny(['users'])
    .deleteAny(['users'])
    .grant(AppRoles.USER)
    .readOwn(['users']);
//# sourceMappingURL=app.roles.js.map