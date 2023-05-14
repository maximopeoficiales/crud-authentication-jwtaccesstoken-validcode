import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import * as Joi from "joi";
import { environments } from "./common/environments";
import { OwnerController } from "./owner.controller";
import { OwnerService } from "./owner.service";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./users/users.module";
import { IamModule } from "./iam/iam.module";
import config from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env?.NODE_ENV ?? "prod"],
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        OWNER_ACCESS_TOKEN: Joi.string().required(),
        OWNER_JWT_SECRET: Joi.string().required(),
        OWNER_JWT_SECRET_REFRESH: Joi.string().required(),
        OWNER_JWT_EXPIRES_TIME: Joi.string().required(),
        OWNER_JWT_REFRESH_EXPIRES_TIME: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),

    DatabaseModule,
    UsersModule,
    IamModule,
  ],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}
