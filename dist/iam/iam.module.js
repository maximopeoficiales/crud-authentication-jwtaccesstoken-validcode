"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamModule = void 0;
const common_1 = require("@nestjs/common");
const hashing_service_1 = require("./hashing/hashing.service");
const bcrypt_service_1 = require("./hashing/bcrypt.service");
const authentication_controller_1 = require("./authentication/authentication.controller");
const authentication_service_1 = require("./authentication/authentication.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../users/entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const config_2 = require("../config");
const auth_entity_1 = require("./entities/auth.entity");
const local_strategy_1 = require("./strategies/local.strategy");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const jwtrefresh_strategy_1 = require("./strategies/jwtrefresh.strategy");
const mail_module_1 = require("../common/providers/mail/mail.module");
const authentication_common_service_1 = require("./authentication/authentication.common.service");
const passport_1 = require("@nestjs/passport");
let IamModule = class IamModule {
};
IamModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mail_module_1.MailModule,
            passport_1.PassportModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: auth_entity_1.Auth.name,
                    schema: auth_entity_1.AuthSchema,
                },
                {
                    name: user_entity_1.User.name,
                    schema: user_entity_1.UserSchema,
                },
            ]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_2.default.KEY],
                useFactory: async (configService) => {
                    return {
                        secret: configService.owner.jwtSecretOwner,
                        signOptions: {
                            expiresIn: configService.owner.jwtExpiresTimeOwner,
                        },
                    };
                },
            }),
        ],
        providers: [{ provide: hashing_service_1.HashingService, useClass: bcrypt_service_1.BcryptService }, authentication_service_1.AuthenticationService, authentication_common_service_1.AuthenticationCommonService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, jwtrefresh_strategy_1.JwtRefreshTokenStrategy],
        controllers: [authentication_controller_1.AuthenticationController],
        exports: [authentication_service_1.AuthenticationService, authentication_common_service_1.AuthenticationCommonService],
    })
], IamModule);
exports.IamModule = IamModule;
//# sourceMappingURL=iam.module.js.map