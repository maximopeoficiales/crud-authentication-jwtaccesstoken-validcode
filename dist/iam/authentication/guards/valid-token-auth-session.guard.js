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
exports.ValidTokenAuthSessionGuard = void 0;
const common_1 = require("@nestjs/common");
const authentication_common_service_1 = require("../authentication.common.service");
let ValidTokenAuthSessionGuard = class ValidTokenAuthSessionGuard {
    constructor(authCommonService) {
        this.authCommonService = authCommonService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization.split(" ")[1];
        const user = req.user;
        const tokenIsValid = await this.authCommonService.validAuthToken(user.id, token);
        if (!tokenIsValid)
            throw new common_1.UnauthorizedException("Unauthorized");
        return tokenIsValid;
    }
};
ValidTokenAuthSessionGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(authentication_common_service_1.AuthenticationCommonService)),
    __metadata("design:paramtypes", [authentication_common_service_1.AuthenticationCommonService])
], ValidTokenAuthSessionGuard);
exports.ValidTokenAuthSessionGuard = ValidTokenAuthSessionGuard;
//# sourceMappingURL=valid-token-auth-session.guard.js.map