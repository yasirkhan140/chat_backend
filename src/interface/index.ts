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

interface ConversationAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
interface ConversationParticipantsnAttributes {
  id?: number;
  conversationId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
interface ConversationMessageAttributes {
  id?: number;
  conversationId: number;
  messageId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
interface MessageAttributes {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
interface OtpCreationAttributes extends Optional<OtpAttributes, "id"> {}
interface MessageCreationAttributes extends Optional<MessageAttributes, "id"> {}
interface ConversationMessageCreationAttributes
  extends Optional<ConversationMessageAttributes, "id"> {}
interface ConversationCreationAttributes
  extends Optional<ConversationParticipantsnAttributes, "id"> {}
interface ConversationParticipantsCreationAttributes
  extends Optional<ConversationAttributes, "id"> {}
export interface UserTpyedModel
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}
export interface OtpTpyedModel
  extends Model<OtpAttributes, OtpCreationAttributes>,
    OtpAttributes {}

export interface ConversationTpyedModel
  extends Model<ConversationAttributes, ConversationCreationAttributes>,
    ConversationAttributes {}
export interface ConversationParticipantsTpyedModel
  extends Model<
      ConversationParticipantsnAttributes,
      ConversationParticipantsCreationAttributes
    >,
    ConversationParticipantsnAttributes {}
export interface MessageTpyedModel
  extends Model<MessageAttributes, MessageCreationAttributes>,
    MessageAttributes {}

export interface ConversationMessageTpyedModel
  extends Model<
      ConversationMessageAttributes,
      ConversationMessageCreationAttributes
    >,
    ConversationMessageAttributes {}
export interface IRequest extends Request {
  user: UserTpyedModel;
}
