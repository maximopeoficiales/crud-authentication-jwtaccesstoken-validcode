import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthenticationService } from "../../authentication.service";
export declare class ValidAuthGuard implements CanActivate {
    private authService;
    constructor(authService: AuthenticationService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
