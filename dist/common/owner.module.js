"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const config_2 = require("./common/config");
const Joi = require("joi");
const environments_1 = require("./common/environments");
const owner_controller_1 = require("./owner.controller");
const owner_service_1 = require("./owner.service");
const database_module_1 = require("../database/database.module");
let OwnerModule = class OwnerModule {
};
OwnerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: environments_1.environments[(_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) !== null && _b !== void 0 ? _b : "prod"],
                load: [config_2.default],
                isGlobal: true,
                validationSchema: Joi.object({
                    RESELLER_ACCESS_TOKEN: Joi.string().required(),
                    RESELLER_JWT_SECRET: Joi.string().required(),
                    RESELLER_JWT_SECRET_REFRESH: Joi.string().required(),
                    RESELLER_JWT_EXPIRES_TIME: Joi.string().required(),
                    RESELLER_JWT_REFRESH_EXPIRES_TIME: Joi.string().required(),
                    DATABASE_NAME: Joi.string().required(),
                    DATABASE_PORT: Joi.number().required(),
                }),
            }),
            microservices_1.ClientsModule.register([
                {
                    name: "SEEDER_SERVICE",
                    transport: microservices_1.Transport.REDIS,
                    options: {
                        host: process.env.NODE_ENV === "dev" ? "localhost" : "redis",
                        port: 6379,
                    },
                },
            ]),
            database_module_1.DatabaseModule,
        ],
        controllers: [owner_controller_1.OwnerController],
        providers: [owner_service_1.OwnerService],
    })
], OwnerModule);
exports.OwnerModule = OwnerModule;
//# sourceMappingURL=owner.module.js.map