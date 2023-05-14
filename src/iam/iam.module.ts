import { Module } from "@nestjs/common";
import { HashingService } from "./hashing/hashing.service";
import { BcryptService } from "./hashing/bcrypt.service";
import { AuthenticationController } from "./authentication/authentication.controller";
import { AuthenticationService } from "./authentication/authentication.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigType } from "@nestjs/config";
import config from "src/config";
import { Auth, AuthSchema } from "./entities/auth.entity";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { MailModule } from "src/common/providers/mail/mail.module";
import { AuthenticationCommonService } from "./authentication/authentication.common.service";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    MailModule,
    PassportModule,
    MongooseModule.forFeature([
      {
        name: Auth.name,
        schema: AuthSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.owner.jwtSecretOwner,
          signOptions: {
            expiresIn: configService.owner.jwtExpiresTimeOwner,
          },
        };
      },
    }),
  ],
  providers: [{ provide: HashingService, useClass: BcryptService }, AuthenticationService, AuthenticationCommonService, LocalStrategy, JwtStrategy],
  controllers: [AuthenticationController],
  exports: [AuthenticationService, AuthenticationCommonService],
})
export class IamModule {}
