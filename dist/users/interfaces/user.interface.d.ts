import { User } from "../entities/user.entity";
export interface NewUserInterfaceWithIP extends User {
    ip?: string;
}
