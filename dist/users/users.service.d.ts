import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Document, Model, Types } from "mongoose";
import { HashingService } from "src/iam/hashing/hashing.service";
import { FilterUsersDto } from "./dto/filter-user.dto";
export declare class UsersService {
    private readonly userModel;
    private readonly hashingService;
    constructor(userModel: Model<User>, hashingService: HashingService);
    create(payload: CreateUserDto): Promise<Document<unknown, {}, User> & Omit<User & {
        _id: Types.ObjectId;
    }, never>>;
    findAll(params?: FilterUsersDto): Promise<{
        records: (Document<unknown, {}, User> & Omit<User & {
            _id: Types.ObjectId;
        }, never>)[];
        totalDocuments: number;
    }>;
    findOne(id: string): Promise<User>;
    update(id: string, payload: UpdateUserDto): Promise<Document<unknown, {}, User> & Omit<User & {
        _id: Types.ObjectId;
    }, never>>;
    delete(id: string): Promise<Document<unknown, {}, User> & Omit<User & {
        _id: Types.ObjectId;
    }, never>>;
}
