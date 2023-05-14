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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const authentication_service_1 = require("./authentication.service");
const local_auth_guard_1 = require("../guards/local-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const max_attempts_guard_1 = require("../guards/max-attempts.guard");
let AuthenticationController = class AuthenticationController {
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(req) {
        const user = req.user;
        user.ip = req.body.ip;
        return await this.authService.signIn(user);
    }
    async validationStatusAuthCode(payload) {
        return await this.authService.validateStatusAuthenticationCode(payload);
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("signin"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "signIn", null);
__decorate([
    (0, common_1.UseGuards)(max_attempts_guard_1.MaxAttemptsGuard),
    (0, common_1.Post)("validation/code"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "validationStatusAuthCode", null);
AuthenticationController = __decorate([
    (0, swagger_1.ApiTags)("Auth"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map