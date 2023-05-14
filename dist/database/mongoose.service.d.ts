import { ConfigType } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import config from "../config";
export declare class MongooseConfigService implements MongooseOptionsFactory {
    private readonly configService;
    constructor(configService: ConfigType<typeof config>);
    createMongooseOptions(): MongooseModuleOptions;
}
