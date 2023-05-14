import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as session from "express-session";

import { OwnerModule } from "./owner.module";

async function bootstrap() {
  const app = await NestFactory.create(OwnerModule);

  app.setGlobalPrefix("api-owner");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // Es opcional pero envia una alerta al front que un campo no esta en el whitelist (lo que existe en el back)
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(
    session({
      secret: process.env.OWNER_SECRET_SESSION,
      resave: false,
      saveUninitialized: true,
    }),
  );

  app.enableCors();
  await app.listen(4000);
}
bootstrap();
