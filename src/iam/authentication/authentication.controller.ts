import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Req } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { Request } from "express";
import { User } from "src/users/entities/user.entity";
import { ApiTags } from "@nestjs/swagger";
import { PayloadValidAuthCode } from "../models/auth.code.model";
import { MaxAttemptsGuard } from "../guards/max-attempts.guard";

@ApiTags("Auth")
@Controller("auth")
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signIn(@Req() req: Request) {
    const user = req.user as User & { ip: string };
    user.ip = req.body.ip;

    return await this.authService.signIn(user);
  }

  @UseGuards(MaxAttemptsGuard)
  @Post("validation/code")
  async validationStatusAuthCode(@Body() payload: PayloadValidAuthCode) {
    return await this.authService.validateStatusAuthenticationCode(payload);
  }
}
