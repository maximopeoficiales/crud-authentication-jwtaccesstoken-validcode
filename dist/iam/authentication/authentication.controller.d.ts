import { AuthenticationService } from "./authentication.service";
import { Request } from "express";
import { PayloadValidAuthCode } from "../models/auth.code.model";
export declare class AuthenticationController {
    private readonly authService;
    constructor(authService: AuthenticationService);
    signIn(req: Request): Promise<{
        message: string;
        pending: boolean;
        accessToken: string;
        refreshToken: string;
        user: import("../models/user.model").UserSignInPayload;
    } | {
        message: string;
        pending: boolean;
        accessToken?: undefined;
        refreshToken?: undefined;
        user?: undefined;
    }>;
    validationStatusAuthCode(payload: PayloadValidAuthCode): Promise<{
        message: string;
        pending: boolean;
        accessToken: string;
        refreshToken: string;
        user: string;
    }>;
}
