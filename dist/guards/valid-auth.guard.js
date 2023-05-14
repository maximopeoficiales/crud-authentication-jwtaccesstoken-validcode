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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
let ValidAuthGuard = class ValidAuthGuard {
    constructor(authService) {
        this.authService = authService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const authIsValid = await this.authService.validAuthentication(user.id);
        if (!authIsValid)
            throw new common_1.HttpException("Acceso no permitido", common_1.HttpStatus.FORBIDDEN);
        return authIsValid;
    }
};
ValidAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_service_1.AuthService)),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], ValidAuthGuard);
exports.ValidAuthGuard = ValidAuthGuard;
//# sourceMappingURL=valid-auth.guard.js.map