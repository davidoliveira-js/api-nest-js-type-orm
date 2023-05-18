"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = exports.Roles = void 0;
const nest_access_control_1 = require("nest-access-control");
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "admin";
    Roles["USER"] = "user";
})(Roles = exports.Roles || (exports.Roles = {}));
exports.roles = new nest_access_control_1.RolesBuilder();
exports.roles
    .grant(Roles.USER)
    .createOwn(['acquisitions', 'recharges'])
    .readOwn(['users', 'acquisitions', 'recharges'])
    .readAny('giftCards')
    .updateOwn(['users'])
    .grant(Roles.ADMIN)
    .createAny(['users', 'acquisitions', 'giftCards', 'recharges'])
    .readAny(['users', 'acquisitions', 'giftCards', 'recharges'])
    .updateAny(['users', 'giftCards'])
    .deleteAny(['users', 'giftCards']);
//# sourceMappingURL=app.roles.js.map