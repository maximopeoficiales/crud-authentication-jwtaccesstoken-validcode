import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class MaxAttemptsGuard implements CanActivate {
    private readonly maxAttempts;
    private readonly blockIncreaseInMinutes;
    private resetTime;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
