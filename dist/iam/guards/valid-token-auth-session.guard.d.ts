import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthenticationCommonService } from "../authentication.common.service";
export declare class ValidTokenAuthSessionGuard implements CanActivate {
    private authCommonService;
    constructor(authCommonService: AuthenticationCommonService);
    canActivate(context: ExecutionContext): Promise<any>;
}
