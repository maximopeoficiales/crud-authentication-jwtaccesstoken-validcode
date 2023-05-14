import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
declare const JwtRefreshGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtRefreshGuard extends JwtRefreshGuard_base {
    private readonly reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
}
export {};
