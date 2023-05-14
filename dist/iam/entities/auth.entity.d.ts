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
import { Document, Types } from "mongoose";
import { User } from "src/users/entities/user.entity";
export declare class Auth extends Document {
    accessToken: string;
    refreshToken: string;
    ip: string;
    saveDevice: boolean;
    authStatus: boolean;
    validAuthToken: string;
    validAuthExpire: Date;
    code: string;
    user: User | Types.ObjectId;
}
export declare const AuthSchema: import("mongoose").Schema<Auth, import("mongoose").Model<Auth, any, any, any, Document<unknown, any, Auth> & Omit<Auth & {
    _id: Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Auth, Document<unknown, {}, import("mongoose").FlatRecord<Auth>> & Omit<import("mongoose").FlatRecord<Auth> & {
    _id: Types.ObjectId;
}, never>>;
