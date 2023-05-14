export declare class CreateAuthDto {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly ip: string;
    readonly saveDevice?: boolean;
    readonly authStatus?: boolean;
    readonly code?: string;
    validAuthToken?: string;
    validAuthExpire?: Date;
    user: string;
}
