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
exports.ResponseTransformerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const nest_response_1 = require("./nest-response");
const core_1 = require("@nestjs/core");
let ResponseTransformerInterceptor = class ResponseTransformerInterceptor {
    constructor(adapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((controllerReponse) => {
            if (controllerReponse instanceof nest_response_1.NestResponse) {
                const httpContext = context.switchToHttp();
                const response = httpContext.getResponse();
                const { headers, status, body } = controllerReponse;
                const headerNames = Object.getOwnPropertyNames(headers);
                headerNames.forEach((headerName) => {
                    const headerValue = headers[headerName];
                    this.httpAdapter.setHeader(response, headerName, headerValue);
                });
                this.httpAdapter.status(response, status);
                return body;
            }
            return controllerReponse;
        }));
    }
};
ResponseTransformerInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], ResponseTransformerInterceptor);
exports.ResponseTransformerInterceptor = ResponseTransformerInterceptor;
//# sourceMappingURL=response-transformer.interceptor.js.map