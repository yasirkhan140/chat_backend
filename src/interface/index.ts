import { Request } from "express";
import { Model, Optional } from "sequelize";
interface UserAttributes {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  isVerified?: Boolean;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
interface OtpAttributes {
  id: number;
  otp: number | string;
  userId: number;
  expire?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
interface OtpCreationAttributes extends Optional<OtpAttributes, "id"> {}
export interface UserTpyedModel
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}
export interface OtpTpyedModel
  extends Model<OtpAttributes, OtpCreationAttributes>,
    OtpAttributes {}
export interface IRequest extends Request {
  user: UserTpyedModel;
}
