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
exports.AuthenticationCommonService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../../users/entities/user.entity");
const hashing_service_1 = require("../hashing/hashing.service");
const config_1 = require("../../config");
const auth_entity_1 = require("../entities/auth.entity");
const crypto_1 = require("crypto");
const mail_service_1 = require("../../common/providers/mail/mail.service");
let AuthenticationCommonService = class AuthenticationCommonService {
    constructor(userModel, authModel, configService, hashingService, jwtService, mailService) {
        this.userModel = userModel;
        this.authModel = authModel;
        this.configService = configService;
        this.hashingService = hashingService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async validateAuthenticationCode(user, code, ip) { }
    async createSession(data) {
        try {
            const newRecord = new this.authModel(data);
            return await newRecord.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async updateSession(id, accessToken, refreshToken, ip) {
        try {
            return await this.authModel.findByIdAndUpdate(id, { accessToken, refreshToken, ip }, { new: true, runValidators: true }).exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async findByEmail(email) {
        try {
            const record = await this.userModel.findOne({ email }).exec();
            return record;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async generateValidAuthToken(id) {
        try {
            const validAuthToken = (0, crypto_1.randomBytes)(20).toString("hex");
            const hashedValidToken = (0, crypto_1.createHash)("sha256").update(validAuthToken).digest("hex");
            const validAuthExpireToken = new Date(Date.now() + 5 * 60 * 1000);
            await this.userModel.findByIdAndUpdate(id, { validAuthToken: hashedValidToken, validAuthExpire: validAuthExpireToken }, { new: true, runValidators: true }).exec();
            return hashedValidToken;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    generateJwtAccessToken(payload) {
        try {
            const accessToken = this.jwtService.signAsync(payload, {
                secret: this.configService.owner.jwtSecretOwner,
                expiresIn: this.configService.owner.jwtExpiresTimeOwner,
            });
            return accessToken;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    generateJwtRefreshToken(payload) {
        try {
            const refreshToken = this.jwtService.signAsync(payload, {
                secret: this.configService.owner.jwtSecretRefreshOwner,
                expiresIn: this.configService.owner.jwtRefereshExpiresTimeOwner,
            });
            return refreshToken;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async validAuthentication(user, ip) {
        try {
            const auth = await this.authModel.findOne({ user, ip });
            if (auth.authStatus && auth.saveDevice) {
                return true;
            }
            return false;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async validAuthToken(user, token) {
        try {
            const validToken = await this.authModel.findOne({ user, accessToken: token.trim() });
            if (validToken) {
                return true;
            }
            return false;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async findUserAuthenticated(payload) {
        try {
            const user = await this.userModel.findOne({ email: payload.email.trim() }).exec();
            if (!user) {
                throw new common_1.BadRequestException("Por favor ingrese un email y/o contraseña valida");
            }
            const isPasswordMatched = await this.hashingService.compare(payload.password.trim(), user.password);
            if (!isPasswordMatched) {
                throw new common_1.BadRequestException("Por favor ingrese un email y/o contraseña valida");
            }
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
AuthenticationCommonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(auth_entity_1.Auth.name)),
    __param(2, (0, common_1.Inject)(config_1.default.KEY)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model, void 0, hashing_service_1.HashingService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthenticationCommonService);
exports.AuthenticationCommonService = AuthenticationCommonService;
//# sourceMappingURL=auth.common.service.js.map