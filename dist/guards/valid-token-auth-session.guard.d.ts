import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
export declare class ValidTokenAuthSessionGuard implements CanActivate {
    private authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): Promise<any>;
}
