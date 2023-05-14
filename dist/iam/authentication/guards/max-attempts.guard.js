"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxAttemptsGuard = void 0;
const common_1 = require("@nestjs/common");
let MaxAttemptsGuard = class MaxAttemptsGuard {
    constructor() {
        this.maxAttempts = 3;
        this.blockIncreaseInMinutes = 5;
        this.resetTime = null;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        let attempts = request.session.attempts || 0;
        let blockDurationInMinutes = request.session.blockDurationInMinutes || 1;
        const currentTime = Date.now();
        if (this.resetTime && currentTime < this.resetTime) {
            throw new common_1.UnauthorizedException(`Se ha excedito el limite de intentos por favor vuelva en ${blockDurationInMinutes} minutos`);
        }
        if (this.resetTime && currentTime >= this.resetTime) {
            attempts = 0;
            this.resetTime = null;
        }
        if (attempts >= this.maxAttempts) {
            const blockTime = currentTime + blockDurationInMinutes * 60 * 1000;
            this.resetTime = blockTime;
            request.session.blockDurationInMinutes = blockDurationInMinutes * this.blockIncreaseInMinutes;
            throw new common_1.UnauthorizedException(`Se ha excedito el limite de intentos por favor vuelva en ${blockDurationInMinutes} minutos`);
        }
        request.session.attempts = attempts + 1;
        return true;
    }
};
MaxAttemptsGuard = __decorate([
    (0, common_1.Injectable)()
], MaxAttemptsGuard);
exports.MaxAttemptsGuard = MaxAttemptsGuard;
//# sourceMappingURL=max-attempts.guard.js.map