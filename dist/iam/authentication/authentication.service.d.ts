import { Model } from "mongoose";
import { User } from "src/users/entities/user.entity";
import { Auth } from "../entities/auth.entity";
import { MailService } from "src/common/providers/mail/mail.service";
import { UserSignInPayload } from "../models/user.model";
import { AuthenticationCommonService } from "./authentication.common.service";
import { PayloadValidAuthCode } from "../models/auth.code.model";
export declare class AuthenticationService {
    private readonly userModel;
    private readonly authModel;
    private readonly mailService;
    private readonly authCommonService;
    constructor(userModel: Model<User>, authModel: Model<Auth>, mailService: MailService, authCommonService: AuthenticationCommonService);
    signIn(payload: UserSignInPayload): Promise<{
        message: string;
        pending: boolean;
        accessToken: string;
        refreshToken: string;
        user: UserSignInPayload;
    } | {
        message: string;
        pending: boolean;
        accessToken?: undefined;
        refreshToken?: undefined;
        user?: undefined;
    }>;
    validateStatusAuthenticationCode(payload: PayloadValidAuthCode): Promise<{
        message: string;
        pending: boolean;
        accessToken: string;
        refreshToken: string;
        user: string;
    }>;
}
