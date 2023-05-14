"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const session = require("express-session");
const owner_module_1 = require("./owner.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(owner_module_1.OwnerModule);
    app.setGlobalPrefix("api-owner");
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.use(session({
        secret: process.env.OWNER_SECRET_SESSION,
        resave: false,
        saveUninitialized: true,
    }));
    app.enableCors();
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map