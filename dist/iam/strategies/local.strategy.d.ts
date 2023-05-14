import { Strategy } from "passport-local";
import { User } from "src/users/entities/user.entity";
import { AuthenticationCommonService } from "../authentication/authentication.common.service";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authcommonService;
    constructor(authcommonService: AuthenticationCommonService);
    validate(email: string, password: string): Promise<User>;
}
export {};
