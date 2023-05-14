import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/users/entities/user.entity";

@Schema({ timestamps: true })
export class Auth extends Document {
  @Prop({ index: true })
  accessToken: string;

  @Prop({ index: true })
  refreshToken: string;

  @Prop({ index: true })
  ip: string;

  @Prop({ index: true, default: false })
  saveDevice: boolean;

  @Prop({ index: true, default: false })
  authStatus: boolean;

  @Prop()
  validAuthToken: string;

  @Prop()
  validAuthExpire: Date;

  @Prop()
  code: string;

  @Prop({ type: Types.ObjectId, ref: User.name, index: true })
  user: User | Types.ObjectId;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
