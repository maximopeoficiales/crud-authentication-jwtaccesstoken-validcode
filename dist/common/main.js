"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const owner_module_1 = require("../owner.module");
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
    app.connectMicroservice({
        transport: microservices_1.Transport.REDIS,
        options: {
            host: process.env.NODE_ENV === "dev" ? "localhost" : "redis",
            port: 6379,
        },
    });
    await app.startAllMicroservices();
    app.enableCors();
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map