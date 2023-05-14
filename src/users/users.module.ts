import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/user.entity";
import { BcryptService } from "src/iam/hashing/bcrypt.service";
import { HashingService } from "src/iam/hashing/hashing.service";
import { IamModule } from "src/iam/iam.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    IamModule,
  ],
  controllers: [UsersController],
  providers: [{ provide: HashingService, useClass: BcryptService }, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
