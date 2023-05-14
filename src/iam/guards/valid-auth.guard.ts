import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PayloadToken } from "src/iam/models/token.model";
import { AuthenticationCommonService } from "../authentication/authentication.common.service";

@Injectable()
export class ValidAuthGuard implements CanActivate {
  constructor(@Inject(AuthenticationCommonService) private readonly authCommonService: AuthenticationCommonService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = req.user as PayloadToken;
    const authIsValid = await this.authCommonService.validAuthentication(user.id, user.ip);
    if (!authIsValid) {
      throw new UnauthorizedException("Acceso no permitido");
    }

    return authIsValid;
  }
}
