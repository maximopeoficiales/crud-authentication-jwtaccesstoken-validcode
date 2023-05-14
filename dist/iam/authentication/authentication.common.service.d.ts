/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/entities/user.entity";
import { HashingService } from "../hashing/hashing.service";
import config from "src/config";
import { ConfigType } from "@nestjs/config";
import { SignInDto } from "./dto/sigin-auth.dto";
import { PayloadToken } from "../models/token.model";
import { Auth } from "../entities/auth.entity";
import { CreateAuthDto } from "./dto/create-auth.dto";
export declare class AuthenticationCommonService {
    private readonly userModel;
    private readonly authModel;
    private readonly configService;
    private readonly hashingService;
    private readonly jwtService;
    constructor(userModel: Model<User>, authModel: Model<Auth>, configService: ConfigType<typeof config>, hashingService: HashingService, jwtService: JwtService);
    createAutheticationSession(data: CreateAuthDto): Promise<import("mongoose").Document<unknown, {}, Auth> & Omit<Auth & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateAuthenticationSession(id: string, accessToken: string, refreshToken: string, code: any, ip?: string): Promise<import("mongoose").Document<unknown, {}, Auth> & Omit<Auth & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findUserAuthByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    generateJwtAccessToken(payload: PayloadToken): Promise<string>;
    generateJwtRefreshToken(payload: PayloadToken): Promise<string>;
    validAuthentication(user: string, ip?: string): Promise<boolean>;
    validAuthToken(user: string, token: string): Promise<boolean>;
    findUserAuthenticated(payload: SignInDto): Promise<import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
