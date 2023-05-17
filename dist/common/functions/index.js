"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractRefreshTokenFromBody = exports.extractAccessTokenFromHeader = void 0;
const extractAccessTokenFromHeader = (request) => {
    var _a, _b;
    const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
    return type === 'Bearer' ? token : undefined;
};
exports.extractAccessTokenFromHeader = extractAccessTokenFromHeader;
const extractRefreshTokenFromBody = (request) => {
    return request.body.refreshToken;
};
exports.extractRefreshTokenFromBody = extractRefreshTokenFromBody;
//# sourceMappingURL=index.js.map