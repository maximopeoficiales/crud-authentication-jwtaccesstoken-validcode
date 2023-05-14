"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)("config", () => {
    var _a, _b, _c, _d, _e;
    return {
        mongo: {
            dbname: (_a = process.env) === null || _a === void 0 ? void 0 : _a.DATABASE_NAME,
            user: (_b = process.env) === null || _b === void 0 ? void 0 : _b.DB_USERNAME,
            password: (_c = process.env) === null || _c === void 0 ? void 0 : _c.DB_PASSWORD,
            port: process === null || process === void 0 ? void 0 : process.env.DATABASE_PORT,
            hostname: (_d = process.env) === null || _d === void 0 ? void 0 : _d.HOST_NAME,
            connection: process.env.DB_CONNECTION,
            params: (_e = process.env) === null || _e === void 0 ? void 0 : _e.PARAMS,
        },
        hosting: {
            clientHostOwner: process.env.CLIENT_HOST_OWNER,
            clientHostReseller: process.env.CLIENT_HOST_RESELLER,
            clientHostTenant: process.env.CLIENT_HOST_TENANT,
        },
        owner: {
            accessTokenOwner: process.env.OWNER_ACCESS_TOKEN,
            jwtSecretOwner: process.env.OWNER_JWT_SECRET,
            jwtExpiresTimeOwner: process.env.OWNER_JWT_EXPIRES_TIME,
            jwtSecretRefreshOwner: process.env.OWNER_JWT_SECRET_REFRESH,
            jwtRefereshExpiresTimeOwner: process.env.OWNER_JWT_REFRESH_EXPIRES_TIME,
            Owner_Port: process.env.OWNER_PORT,
            Owner_Host: process.env.OWNER_HOST,
        },
    };
});
//# sourceMappingURL=config.js.map