import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthenticationCommonService } from "../authentication.common.service";
export declare class ValidAuthGuard implements CanActivate {
    private readonly authCommonService;
    constructor(authCommonService: AuthenticationCommonService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
