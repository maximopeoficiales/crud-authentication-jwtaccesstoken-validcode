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
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../../users/entities/user.entity");
const auth_entity_1 = require("../entities/auth.entity");
const mail_service_1 = require("../../common/providers/mail/mail.service");
const utils_1 = require("../../common/utils");
const authentication_common_service_1 = require("./authentication.common.service");
let AuthenticationService = class AuthenticationService {
    constructor(userModel, authModel, mailService, authCommonService) {
        this.userModel = userModel;
        this.authModel = authModel;
        this.mailService = mailService;
        this.authCommonService = authCommonService;
    }
    async signIn(payload) {
        try {
            const data = { id: payload.id, role: payload.role, ip: payload.ip };
            const accessToken = await this.authCommonService.generateJwtAccessToken(data);
            const refreshToken = await this.authCommonService.generateJwtRefreshToken(data);
            const auth = await this.authModel.findOne({ user: payload.id, ip: payload.ip });
            const code = (0, utils_1.generateInternalCode)(6);
            if (auth) {
                if (auth && !auth.authStatus && !auth.saveDevice && auth.ip === payload.ip) {
                    await this.authCommonService.updateAuthenticationSession(auth.id, accessToken, refreshToken, code, payload.ip);
                }
            }
            else {
                await this.authCommonService.createAutheticationSession({ accessToken, refreshToken, code, ip: payload.ip, user: payload.id });
            }
            if (auth && auth.authStatus && auth.saveDevice && auth.ip === payload.ip) {
                return {
                    message: `Acceso autorizado`,
                    pending: false,
                    accessToken,
                    refreshToken,
                    user: payload,
                };
            }
            else {
                const messageHTML = `Se esta intentando ingresar de un dispositivo desconocido, por favor confirme que es usted, su código de seguridad es: \n\n${code}`;
                try {
                    await this.mailService.sendEmailWithDefaultFrom({
                        To: payload.email,
                        Subject: `Alerta - Inicio de sesión`,
                        Message: messageHTML,
                    });
                    return {
                        message: `Ingrese el código de seguridad enviado a su cuenta de correo: ${payload.email}`,
                        pending: true,
                    };
                }
                catch (error) {
                    await this.userModel.findByIdAndUpdate(payload.id, { validAuthToken: undefined, validAuthExpire: undefined }, { new: true, runValidators: true }).exec();
                    throw new common_1.InternalServerErrorException(error.message);
                }
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async validateStatusAuthenticationCode(payload) {
        try {
            const auth = await this.authModel.findOne({ user: payload.user, code: payload.code, ip: payload.ip, validAuthExpire: { $gt: Date.now() } }).exec();
            if (!auth) {
                throw new common_1.UnauthorizedException("El código es incorrecto o la sesión ya expiró");
            }
            await this.authModel.findByIdAndUpdate(auth.id, { saveDevice: true, authStatus: true }, { new: true, runValidators: true }).exec();
            return { message: `Acceso autorizado`, pending: false, accessToken: auth.accessToken, refreshToken: auth.refreshToken, user: payload.user };
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(auth_entity_1.Auth.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mail_service_1.MailService,
        authentication_common_service_1.AuthenticationCommonService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map