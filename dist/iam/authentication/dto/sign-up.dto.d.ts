export declare class CreateAuthDto {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly ip: string;
    readonly saveDevice?: boolean;
    readonly authStatus?: boolean;
    user: string;
}
