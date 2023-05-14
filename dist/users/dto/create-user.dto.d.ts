export declare class CreateUserDto {
    readonly email: string;
    password: string;
    readonly firstName: string;
    readonly lastName: string;
    role: string;
    readonly isActive: boolean;
    readonly isLocked: boolean;
    readonly isDeleted: boolean;
}
