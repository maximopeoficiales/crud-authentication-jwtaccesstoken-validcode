import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import config from "../config";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(@Inject(config.KEY) private readonly configService: ConfigType<typeof config>) {}

  createMongooseOptions(): MongooseModuleOptions {
    const { connection, hostname, dbname, user, password, port, params } = this.configService.mongo;
    return {
      uri: process.env.NODE_ENV === "dev" ? `${connection}://${hostname}:${port}/${dbname}?${params}` : `${connection}://${user}:${password}@${hostname}/${dbname}?${params}`,
    };
  }
}
