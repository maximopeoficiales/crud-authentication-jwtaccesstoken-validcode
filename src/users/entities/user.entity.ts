import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ unique: true, index: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: "Owner" })
  firstName: string;

  @Prop({ default: null })
  lastName: string;

  @Prop()
  role: string;

  @Prop()
  resetPasswordToken: string;

  @Prop()
  resetPasswordExpire: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: false })
  isLocked: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

/** Excluimos los campos que no deseamos mostrar */
UserSchema.methods.toJSON = function () {
  const { __v, password, resetPasswordToken, resetPasswordExpire, ...record } = this.toObject();
  return record;
};

UserSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error(`El ${Object.keys(error.keyValue)} ya existe.`));
  } else {
    next();
  }
});
