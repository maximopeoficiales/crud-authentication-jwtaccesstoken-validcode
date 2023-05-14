import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { Strategy } from "passport-local";
import { User } from "src/users/entities/user.entity";
import { SignInDto } from "../authentication/dto/sigin-auth.dto";
import { AuthenticationCommonService } from "../authentication/authentication.common.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  constructor(private authcommonService: AuthenticationCommonService) {
    super({ usernameField: "email", passwordField: "password" });
  }

  async validate(email: string, password: string): Promise<User> {
    if (!email.length || !password) {
      throw new BadRequestException("Por favor ingrese un email y/o contraseña válida");
    }
    const payload: SignInDto = { email, password };

    const user = await this.authcommonService.findUserAuthenticated(payload);

    if (!user) {
      throw new BadRequestException("Por favor ingrese un email y/o contraseña válida");
    }

    return user;
  }
}
